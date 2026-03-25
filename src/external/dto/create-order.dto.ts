import { IsEmail, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsEmail()
    merchantEmail: string;
}
