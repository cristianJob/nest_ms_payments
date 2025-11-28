import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";

export class PaymentSessionDto {

    @IsString()
    public orderId: string;

    @IsString()
    @IsNotEmpty()
    public currency: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })  // Indica que cada elemento del array debe ser validado
    @Type(() => PaymentSessionItemDto) // Indica que cada elemento del array debe ser transformado
    public items: PaymentSessionItemDto[];
}

export class PaymentSessionItemDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    public price: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    public quantity: number;
}

