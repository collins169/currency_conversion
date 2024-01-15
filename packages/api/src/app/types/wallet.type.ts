export type FundWalletType = {
  senderWalletId: string;
  recipientWalletId: string;
  amount: number;
  fee?: number;
  currency?: string;
  narration?: string;
};
