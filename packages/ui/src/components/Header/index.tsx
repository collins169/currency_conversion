import {
	Avatar,
	Box,
	Flex,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	VStack,
	useColorModeValue,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from "@chakra-ui/react";
import { FiBell, FiChevronDown } from "react-icons/fi";

export const Header = () => {
	return (
		<HStack
			spacing={{ base: "0", md: "6" }}
			justifyContent="space-between"
			gap={3}
		>
			{/* <Breadcrumb
				display={{ base: "flex", md: "none" }}
				spacing="8px"
				separator={">"}
				float="left"
			>
				<BreadcrumbItem>
					<BreadcrumbLink href="#">Wallets</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem isCurrentPage>
					<BreadcrumbLink href="#">Contact</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb> */}
			<HStack spacing={{ base: "0", md: "6" }}>
				<IconButton
					size="lg"
					variant="ghost"
					aria-label="open menu"
					icon={<FiBell />}
				/>
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: "none" }}
						>
							<HStack>
								<Avatar
									size={"sm"}
									src={
										"https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
									}
								/>
								<VStack
									display={{ base: "none", md: "flex" }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
								>
									<Text fontSize="sm">Justina Clark</Text>
									<Text fontSize="xs" color="gray.600">
										Admin
									</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue("white", "gray.900")}
							borderColor={useColorModeValue("gray.200", "gray.700")}
						>
							<MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuItem>Billing</MenuItem>
							<MenuDivider />
							<MenuItem>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</HStack>
	);
};
