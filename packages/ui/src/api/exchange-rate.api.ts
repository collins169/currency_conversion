import { client } from "."

export const getExchangeRates = () => {
	return client.get('/exchange-rate')
}

export const compareRate = (from: string, to: string) => {
	return client.get(`/exchange-rate/${from}/${to}`)
}