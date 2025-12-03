import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import type { Request, Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  //@Post('create-payment-session').    esto se hace desde create order se debe ejecutar para que funcione hookdeck listen 3003 stripe-to-localhost
  @MessagePattern('create.payment.session')
  async createPaymentSession(@Payload() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);

  }

  @Get('success')
  async success() {
    return {
      ok: true,
      message: 'Payment success'
    };
  }

  @Get('cancel')
  async cancel() {
    return {
      ok: true,
      message: 'Payment cancel'
    };
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    console.log('Webhook received');
    return this.paymentsService.stripeWebhook(req, res);
  }
}
