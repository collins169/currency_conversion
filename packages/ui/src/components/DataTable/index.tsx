import {
	Box,
	Divider,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Center,
} from "@chakra-ui/react";
import { Pagination } from "./Pagination";

import moment from "moment";
import { ReactNode, useState } from "react";
import { Status } from "./Status";

export interface DataTableBodyProps {
	value?: string | number | Date | boolean | any;
	type?: "reference" | "date" | "status" | "text" | "empty";
	dateFormat?: string;
	length?: number;
}

export const TableRowValue = ({
	type,
	value,
	dateFormat,
	length
}: DataTableBodyProps) => {
	switch (type) {
		case "date":
			return <Td>{moment(value).format(dateFormat)}</Td>;
		case "reference":
			return <Td>{`${String(value).substring(0, 6)}..`}</Td>;
		case "status":
			return (
				<Td>
					<Status status={value} />
				</Td>
			);
		case "empty":
			return (
				<Td colSpan={length}>
					<Center m={5}>No Data Found</Center>
				</Td>
			);
		default:
			return <Td>{value}</Td>;
	}
};

interface DataTableProps {
	page: number;
	onNextPage: () => void;
	onPrevPage: () => void;
	columns: string[];
	totalPage: number;
	children: ReactNode;
}

export const DataTable = ({
	columns,
	totalPage,
	page,
	onNextPage,
	onPrevPage,
	children,
}: DataTableProps) => {

	return (
		<Box mt={3}>
			<Divider />
			<TableContainer mt={2}>
				<Table variant="simple">
					<Thead>
						<Tr>{columns?.map((column) => <Th key={column}>{column}</Th>)}</Tr>
					</Thead>
					{children}
				</Table>
				<Pagination
					totalPage={totalPage}
					page={page}
					prevDisabled={page === 1}
					nextDisabled={page === totalPage}
					onNextPage={onNextPage}
					onPrevPage={onPrevPage}
				/>
			</TableContainer>
		</Box>
	);
};
