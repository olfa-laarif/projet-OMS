import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ExternalModule } from './external/external.module';
import { MerchantsModule } from './merchants/merchants.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
      EventEmitterModule.forRoot(),
      ScheduleModule.forRoot(),
      PrismaModule,
      AuthModule,
      ExternalModule,
      MerchantsModule,
      OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
