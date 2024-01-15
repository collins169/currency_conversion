import { client } from "."


export const getWallet = (id: string) => {
return client.get(`/wallet/${id}`)
}

export const getWallets = () => {
	return client.get('/wallet')
}