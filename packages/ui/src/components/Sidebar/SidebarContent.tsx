import {
	Box,
	BoxProps,
	Center,
	CloseButton,
	Flex,
	Image,
	Stack,
	useColorModeValue
} from "@chakra-ui/react";
import { FaCircleQuestion, FaComments } from "react-icons/fa6";
import { LinkItems } from "../navMenus";
import { NavItem } from "./NavItem";


interface SidebarProps extends BoxProps {
	onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Stack justifyContent="space-between" h="full" gap={2}>
				<Box>
					<Flex
						h="20"
						alignItems="center"
						mx="8"
						justifyContent="space-between"
					>
						<Center w="full">
							<Image src="./wewire-logo.svg" />
						</Center>
						<CloseButton
							display={{ base: "flex", md: "none" }}
							onClick={onClose}
						/>
					</Flex>
					{LinkItems.map((link) => (
						<NavItem key={link.name} icon={link.icon} path={link.path}>
							{link.name}
						</NavItem>
					))}
				</Box>
				<Box>
					<NavItem icon={FaCircleQuestion} path="#">
						Help
					</NavItem>
					<NavItem icon={FaComments} path="#">
						Support
					</NavItem>
				</Box>
			</Stack>
		</Box>
	);
};
