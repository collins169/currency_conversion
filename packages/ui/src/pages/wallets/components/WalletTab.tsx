import {
	Stack,
	Text
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import Flag from "react-world-flags";

interface WalletTabProps {
	countryCode: string;
	currency: string;
	amount: string;
	date: string;
}

export const WalletTab = ({countryCode, currency, amount, date}: WalletTabProps) => {
	return (
		<Stack
			justify="space-between"
			align="self-start"
			gap={2}
			w={{ base: 50, md: 120 }}
			// px={1}
			py={1}
		>
			<Stack
				direction="row"
				w="full"
				justifyContent="flex-start"
				width={{ base: "15px", md: "27px" }}
				height={{ base: "12px", md: "16px" }}
			>
				<Flag
					code={countryCode}
					width="27px"
					height="16px"
					style={{
						borderRadius: "3px",
					}}
				/>
				<Text as="b" fontSize="sm" display={{ base: "none", md: "flex" }}>
					{currency}
				</Text>
			</Stack>
			<Stack
				direction="row"
				justifyContent="space-between"
				gap={2}
				w="full"
				align="center"
			>
				<Text fontSize={{ base: "sm", md: "1xl" }} as="b">
					{amount}
				</Text>
				<Stack
					direction="row"
					color="gray.900"
					sx={{ fontSize: 8 }}
					gap={1}
					display={{ base: "none", md: "flex" }}
				>
					<FiRefreshCw />
					<Text sx={{ fontSize: 8 }} float="right" color="gray.900">
						{date}
					</Text>
				</Stack>
			</Stack>
		</Stack>
	);
};
