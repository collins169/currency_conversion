import { client } from '.';

export const getCurrencies = () => {
	return client.get('/currency');
}