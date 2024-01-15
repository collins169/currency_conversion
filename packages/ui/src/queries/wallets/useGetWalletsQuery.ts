import { WalletModel } from '../../constants/model';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { getDataFromResponse } from '../../utils/getDataFromResponse';
import { THIRTY_MINUTES } from '../../constants/timeUnits';
import { getWallets } from '../../api/wallet.api';

export const useGetWalletsQuery = () => {
	 return useQuery<WalletModel[], AxiosError>(
		'wallets',
		() => getWallets().then(getDataFromResponse), {
			staleTime: THIRTY_MINUTES
		}
	 )
}