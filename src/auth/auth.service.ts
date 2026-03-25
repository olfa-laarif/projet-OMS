import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MerchantRegisteredEvent } from './events/merchant-registered.event';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private eventEmitter: EventEmitter2,
    ) {}

    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const merchant = await this.prisma.merchant.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: hashedPassword,
            },
        });

        this.eventEmitter.emit(
            'merchant.registered',
            new MerchantRegisteredEvent(merchant.id, merchant.email, merchant.name),
        );

        const { password, ...result } = merchant;
        return result;
    }
}