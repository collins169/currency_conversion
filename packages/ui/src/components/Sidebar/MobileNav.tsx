import {
	Flex,
	FlexProps,
	IconButton,
	Box,
	Image,
	Center
} from "@chakra-ui/react";
import {
	FiMenu
} from "react-icons/fi";
import { Header } from "../Header";
// import logo from "./logo.svg";

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg="#F5F5F5"
			borderBottomWidth="1px"
			borderBottomColor="#E4DFDD"
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Center display={{ base: "flex", md: "none" }} w="full">
				<Image src="./wewire-logo.svg" />
			</Center>

			<Header />
		</Flex>
	);
};
