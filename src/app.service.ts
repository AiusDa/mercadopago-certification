import { Injectable } from '@nestjs/common';
import {
  configure,
  preferences,
  MercadoPagoResponse,
  MercadoPagoPaymentRequest,
  PaymentItem,
  Payer
} from 'mercadopago';

@Injectable()
export class AppService {
  constructor() {
    configure({
      integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
      access_token:
        'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181'
    });
  }

  createReference(items: PaymentItem[], payer: Payer): MercadoPagoResponse {
    console.log({ env: process.env });
    const preference: MercadoPagoPaymentRequest = {
      items,
      payer,
      back_urls: {
        success: process.env.MERCADOPAGO_BACK_URLS,
        pending: process.env.MERCADOPAGO_BACK_URLS,
        failure: process.env.MERCADOPAGO_BACK_URLS
      },
      notification_url: process.env.MERCADOPAGO_NOTIFICATION_URL,
      payment_methods: {
        excluded_payment_methods: [
          {
            id: 'amex'
          }
        ],
        excluded_payment_types: [
          {
            id: 'atm'
          }
        ],
        installments: 6
      },
      auto_return: 'approved',
      external_reference: 'ahidalgo@idealizer.mx'
    };

    return preferences.create(preference);
  }

  public saveMercadopagoWebhookData(
    data: MercadopagoWebhookPayload
  ): Promise<void> {
    console.log('Mercadopago Webhook');
    console.log(JSON.stringify(data));
    return Promise.resolve();
  }
}
