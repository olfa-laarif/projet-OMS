import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ExternalService {
    constructor(private prisma: PrismaService) {}

    async createOrder(dto: CreateOrderDto) {
        const merchant = await this.prisma.merchant.findUnique({
            where: { email: dto.merchantEmail },
        });

        if (!merchant) {
            throw new NotFoundException(`Merchant with email ${dto.merchantEmail} not found`);
        }

        const order = await this.prisma.order.create({
            data: {
                amount: dto.amount,
                merchantId: merchant.id,
            },
        });

        await this.sendEmail(merchant.email, merchant.name, order.id, order.amount);

        return order;
    }

    private async sendEmail(to: string, name: string, orderId: string, amount: number) {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || 'smtp.ethereal.email',
            port: Number(process.env.MAIL_PORT) || 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: '"Orders System" <no-reply@orders.com>',
            to,
            subject: 'Nouvelle commande reçue',
            text: `Bonjour ${name}, vous avez reçu une nouvelle commande #${orderId} de ${amount}€.`,
        });
    }
}
