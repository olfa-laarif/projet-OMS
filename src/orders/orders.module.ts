import { Module } from '@nestjs/common';
import { OrdersCron } from './orders.cron';

@Module({
    providers: [OrdersCron],
})
export class OrdersModule {}
