import {
	Box,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Stack,
	Button,
	useDisclosure,
	Skeleton,
} from "@chakra-ui/react";

import { FaArrowRightArrowLeft } from "react-icons/fa6";

import { WalletTab } from "./components/WalletTab";
import { WalletTabDetail } from "./components/WalletTabDetail";
import { ConvertFundDrawer } from "./components/ConvertFundDrawer";
import { useGetWalletsQuery } from "../../queries/wallets/useGetWalletsQuery";

import moment from "moment";

export default function Wallets() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { data, isLoading } = useGetWalletsQuery();
	return (
		<>
			<Box justifyContent="left" w="full">
				<Stack direction="row" justifyContent="space-between" gap={2}>
					<Heading as="h3">Wallets</Heading>
					<Button
						leftIcon={<FaArrowRightArrowLeft />}
						colorScheme="orange"
						onClick={onOpen}
					>
						Convert
					</Button>
					<ConvertFundDrawer
						isOpen={isOpen}
						onClose={onClose}
						wallets={data ?? []}
					/>
				</Stack>
				<Text color="gray">View your balances and transaction history</Text>
			</Box>
			<Skeleton height="600px" isLoaded={!isLoading}>
				<Box marginY={10}>
					<Tabs
						variant="enclosed"
						colorScheme="white"
						size={{ base: "md", md: "md" }}
					>
						<TabList>
							{data?.map((wallet) => (
								<Tab
									key={wallet.id}
									_selected={{ color: "black", bg: "white" }}
									bg="gray.200"
									mr={1}
								>
									<WalletTab
										amount="500K"
										countryCode={wallet.currency?.countryCode}
										currency={wallet.currencyCode}
										date={moment().format("MMM D")}
									/>
								</Tab>
							))}
						</TabList>
						<TabPanels>
							{data?.map((wallet) => (
								<TabPanel
									bg="white"
									borderRadius="lg"
									key={`tabPanel-${wallet.id}`}
								>
									<WalletTabDetail walletId={wallet.id} />
								</TabPanel>
							))}
						</TabPanels>
					</Tabs>
				</Box>
			</Skeleton>
		</>
	);
}
