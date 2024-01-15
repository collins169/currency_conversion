import { DownloadIcon, SearchIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	Skeleton,
	Stack,
	Tr,
	Tbody,
	Center,
} from "@chakra-ui/react";
import {
	DataTable,
	DataTableBodyProps,
	TableRowValue,
} from "../../../components/DataTable";
import { useGetWalletTransactionsQuery } from "../../../queries/transactions/useGetWalletTransactionsQuery";
import { useState } from "react";
import { TransactionModel } from "../../../constants/model";

interface WalletTabDetailProps {
	walletId: string;
}

export const WalletTabDetail = ({ walletId }: WalletTabDetailProps) => {
	const columns = ["Trx ID", "Trx Type", "Amount", "Status", "Date"];
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetWalletTransactionsQuery(walletId, page);

	const handleNextPageChange = () => {
		setPage((old) => old + 1);
	};

	const handlePrevPageChange = () => {
		setPage((old) => Math.max(old - 1, 0));
	};

	return (
		<Stack mt={5}>
			<Heading as="h4" size="md">
				Transaction history
			</Heading>
			<Stack
				direction={{ base: "column", md: "row" }}
				justifyContent="space-between"
				gap={2}
				mt={2}
			>
				<Box maxW="sm">
					<InputGroup size="md">
						<InputLeftElement pointerEvents="none">
							<SearchIcon color="gray.300" />
						</InputLeftElement>
						<Input type="text" placeholder="Search by transaction ID" />
					</InputGroup>
				</Box>
				<Stack direction={{ base: "column", md: "row" }}>
					<Box maxW="sm">
						<Input placeholder="Select dates" size="md" type="date" />
					</Box>
					<Box maxW="sm">
						<Button
							leftIcon={<DownloadIcon />}
							colorScheme="gray"
							variant="outline"
						>
							Download
						</Button>
					</Box>
				</Stack>
			</Stack>
			<Skeleton height={300} isLoaded={!isLoading}>
				<DataTable
					columns={columns}
					totalPage={data?.totalPage ?? 1}
					page={page}
					onNextPage={handleNextPageChange}
					onPrevPage={handlePrevPageChange}
				>
					{data?.results.length ? (
						<Tbody>
							{data?.results?.map((transaction: TransactionModel) => (
								<Tr key={transaction.id}>
									<TableRowValue
										value={transaction.referenceNo}
										type="reference"
									/>
									<TableRowValue value={transaction.transactionType} />
									<TableRowValue
										value={`${transaction.currencyCode} ${transaction.amount}`}
									/>
									<TableRowValue value={transaction.status} type="status" />
									<TableRowValue
										value={transaction.createdAt}
										type="date"
										dateFormat="D/MM/YYYY"
									/>
								</Tr>
							))}
						</Tbody>
					) : (
						<Tbody>
							<Tr>
								<TableRowValue type="empty" length={columns.length} />
							</Tr>
						</Tbody>
					)}
				</DataTable>
			</Skeleton>
		</Stack>
	);
};
