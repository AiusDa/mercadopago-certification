declare module 'mercadopago' {
  export function configure(options: ConfigureOptions): any;
  export const preferences: Preferences;

  export interface ConfigureOptions {
    client_id?: string;
    client_secret?: string;
    integrator_id?: string;
    access_token: string;
    sandbox?: boolean;
    show_promise_error?: boolean;
  }

  export interface PaymentItem {
    id: string;
    title: string;
    description?: string;
    quantity: number;
    currency_id: Currencies;
    unit_price: number;
    picture_url?: string;
  }
  export interface Payer {
    name: string;
    surname: string;
    email: string;
    phone: {
      area_code: string;
      number: number;
    };
    address: {
      zip_code: string;
      street_name: string;
      street_number: number;
    };
  }

  enum Currencies {
    ARS = 'ARS',
    MXN = 'MXN'
  }

  export interface MercadoPagoResponse {
    response: {
      init_point: string;
      sandbox_init_point: string;
    };
  }

  export interface MercadoPagoPaymentRequest {
    items: PaymentItem[];
    payer: Payer;
    back_urls?: {
      success?: string;
      pending?: string;
      failure?: string;
    };
    notification_url: string;
    auto_return?: string;
    external_reference?: string;
    expires?: boolean;
    payment_methods: {
      exclude_payment_methods: { id: string }[];
      exclude_payment_types: { id: string }[];
      installments: number;
    };
  }

  export interface Preferences {
    schema: {
      additionalProperties: false;
      properties: PaymentRequest;
    };
    partnersHeaders: true;
    create: (data: MercadoPagoPaymentRequest) => MercadoPagoResponse;
    save: () => any;
    update: () => any;
    get: () => any;
    findById: () => any;
  }
}
