import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersCron {
    private readonly logger = new Logger(OrdersCron.name);

    constructor(private prisma: PrismaService) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    //@Cron(CronExpression.EVERY_MINUTE)
    async processPendingOrders() {
        const pending = await this.prisma.order.findMany({
            where: { status: 'pending' },
        });

        if (pending.length === 0) return;

        await this.prisma.order.updateMany({
            where: { status: 'pending' },
            data: { status: 'processed' },
        });

        this.logger.log(`${pending.length} order(s) updated: pending → processed`);
    }
}
