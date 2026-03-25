import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { MerchantRegisteredListener } from './listeners/merchant-registered.listener';

@Module({
    imports: [PrismaModule],
    controllers: [AuthController],
    providers: [AuthService, MerchantRegisteredListener],
})
export class AuthModule {}