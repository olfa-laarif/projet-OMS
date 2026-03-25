import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MerchantsService {
    constructor(private prisma: PrismaService) {}

    async getOrders(merchantId: string) {
        const merchant = await this.prisma.merchant.findUnique({
            where: { id: merchantId },
        });

        if (!merchant) {
            throw new NotFoundException(`Merchant not found`);
        }

        return this.prisma.order.findMany({
            where: { merchantId },
            select: {
                id: true,
                amount: true,
                status: true,
                createdAt: true,
            },
        });
    }
}
