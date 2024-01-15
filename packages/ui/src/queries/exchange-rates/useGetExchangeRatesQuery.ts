import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { getDataFromResponse } from '../../utils/getDataFromResponse';
import { ONE_MINUTE } from '../../constants/timeUnits';
import { getExchangeRates } from '../../api/exchange-rate.api';

export const useGetExchangeRatesQuery = () => {
	 return useQuery<number, AxiosError>(
		`exchange-rates`,
		() => getExchangeRates().then(getDataFromResponse), {
			staleTime: ONE_MINUTE
		}
	 )
}