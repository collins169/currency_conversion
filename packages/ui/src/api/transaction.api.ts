import { client } from ".";

export const getTransactionByReferenceNo = (referenceNo: string) => {
	return client.get(`/transaction/${referenceNo}`);
};

export const getWalletTransactions = (
	walletId: string,
	page?: number,
	limit?: number
) => {
	return client.get(
		`/transaction/wallet/${walletId}?page=${page}&limit=${limit}`
	);
};
