import { IconType } from "react-icons";
import { FaWallet, FaCreditCard} from "react-icons/fa";

interface LinkItemProps {
	name: string;
	icon: IconType;
	path: string;
}
export const LinkItems: Array<LinkItemProps> = [
	{ name: "Wallets", icon: FaWallet, path: "/wallets" },
	{ name: "Conversions", icon: FaCreditCard, path: "/conversions" },
];
