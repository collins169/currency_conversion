import { Currency } from "./currencies"

export type AuditType = {
	createdAt: string;
	updatedAt: string;
}

export type CurrencyModel = AuditType & {
	code: Currency;
	name: string;
	symbol: string;
	countryCode: string;
	decimalPlaces: string;
}

export type Rate = {
  base: string;
  rates: Record<Currency, number>;
};

export type CompareRate = {
  buy: number;
  sell: number;
};

export type ExchangeRateModel = AuditType & {
	id: string;
	fromCurrencyCode: Currency;
	toCurrencyCode: Currency;
	fromCurrency: CurrencyModel;
	toCurrency: CurrencyModel;
	rate: number;
}

export type WalletModel = AuditType & {
	id: string;
	ownerId: string;
	currencyCode: Currency;
	currency: CurrencyModel;
	balance: BalanceModel;
}

export type BalanceModel = AuditType & {
	id: string;
	walletId: string;
	wallet: WalletModel;
	available: number;
	book: number;
}

export enum TransactionType {
  DEBIT,
  CREDIT
}

export enum TransactionStatus {
  PENDING,
  COMPLETED,
  FAILED
}

export type PaginatedResponse<TData> = {
	total: number;
  totalPage: number;
  limit: number;
  page: number;
	results: TData[];
}

export type TransactionModel = AuditType & {
	id: string;
	referenceNo: string;
	walletId: string;
	wallet: WalletModel;
	currencyCode: Currency;
	currency: CurrencyModel;
	amount: number;
	fee: number;
	description: string;
	transactionType: string,
	status: string;
}