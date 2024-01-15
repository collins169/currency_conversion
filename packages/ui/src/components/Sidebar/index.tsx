
import { ReactElement } from 'react';

import {
	Box,
	Drawer,
	DrawerContent,
	useDisclosure
} from "@chakra-ui/react";
import { MobileNav } from "./MobileNav";
import { SidebarContent } from "./SidebarContent";


interface SidebarProps {
	children: ReactElement;
}


const SidebarWithHeader = ({ children }: SidebarProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={"#F5F5F5"}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box
				ml={{ base: 0, md: 60 }}
				// mr={{ base: 2, md: 0 }}
				p="4"
				mt={{ base: 4, md: 1 }}
			>
				{/* Content */}
				{children}
			</Box>
		</Box>
	);
};

export default SidebarWithHeader;
