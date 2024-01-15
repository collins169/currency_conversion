import { TransactionModel, PaginatedResponse } from '../../constants/model';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { getDataFromResponse } from '../../utils/getDataFromResponse';
import { THIRTY_MINUTES } from '../../constants/timeUnits';
import { getWalletTransactions } from '../../api/transaction.api';

export const useGetWalletTransactionsQuery = (walletId: string, page?: number) => {
	 return useQuery<PaginatedResponse<TransactionModel>, AxiosError>(
			["transactions", walletId, page],
			() => getWalletTransactions(walletId, page, 20).then(getDataFromResponse),
			{
				staleTime: THIRTY_MINUTES,
				keepPreviousData: true,
			}
		);
}