export const BUSINESS_CONFIG = {
  NAME: "Pink Lux",
  SUPPORT_EMAIL: "pinklux305@gmail.com",
  PAYMENT: {
    CASH_APP_HANDLE: "$crown973",
    ZELLE_HANDLE: "786-566-5508",
    DEPOSIT_AMOUNT: 250,
  }
};

export type PaymentSettings = typeof BUSINESS_CONFIG.PAYMENT;
