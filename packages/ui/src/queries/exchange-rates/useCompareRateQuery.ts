import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { getDataFromResponse } from '../../utils/getDataFromResponse';
import { ONE_MINUTE } from '../../constants/timeUnits';
import { compareRate } from '../../api/exchange-rate.api';
import { CompareRate } from '../../constants/model';

export const useCompareRatesQuery = ({from, to}: {from: string, to: string}) => {
	 return useQuery<CompareRate, AxiosError>(
		`exchange-rate-${from}-${to}`,
		() => compareRate(from, to).then(getDataFromResponse), {
			staleTime: ONE_MINUTE,
			enabled: !!(from && to)
		}
	 )
}