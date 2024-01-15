import { AxiosResponse } from 'axios';

export const getDataFromResponse = <T>(res: AxiosResponse<T>) => res.data;
