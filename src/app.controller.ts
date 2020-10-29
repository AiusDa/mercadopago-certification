import { Controller, Body, Post, Get } from '@nestjs/common';
import { MercadoPagoResponse, Payer, PaymentItem } from 'mercadopago';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): string {
    return 'Ok';
  }

  @Post('/payment')
  createReference(
    @Body() body: { items: PaymentItem[]; payer: Payer }
  ): MercadoPagoResponse {
    return this.appService.createReference(body.items, body.payer);
  }

  @Post('/mercadopago')
  mercadopagoWebhook(@Body() body: MercadopagoWebhookPayload): void {
    this.appService.saveMercadopagoWebhookData(body);
  }
}
