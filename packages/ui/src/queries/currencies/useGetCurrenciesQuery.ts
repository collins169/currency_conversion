import { CurrencyModel } from '../../constants/model';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { getCurrencies } from '../../api/currency.api';
import { getDataFromResponse } from '../../utils/getDataFromResponse';
import { THIRTY_MINUTES } from '../../constants/timeUnits';

export const useGetCurrenciesQuery = () => {
	 return useQuery<CurrencyModel[], AxiosError>(
		'currencies',
		() => getCurrencies().then(getDataFromResponse), {
			staleTime: THIRTY_MINUTES
		}
	 )
}