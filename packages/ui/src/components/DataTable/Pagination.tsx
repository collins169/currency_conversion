import { Stack, Text, Button } from "@chakra-ui/react";

interface PaginationProps {
	page: number;
	totalPage: number;
	prevDisabled: boolean;
	onPrevPage: () => void;
	nextDisabled: boolean;
	onNextPage: () => void;
}
export const Pagination = ({
	page,
	totalPage,
	prevDisabled,
	onPrevPage,
	nextDisabled,
	onNextPage,
}: PaginationProps) => {
	return (
		<Stack
			direction={{ base: "column", md: "row" }}
			justifyContent="space-between"
			gap={2}
			my={3}
		>
			<Text>
				Page {page} of {totalPage}
			</Text>
			<Stack direction={{ base: "column", md: "row" }}>
				<Button
					variant="outline"
					disabled={prevDisabled || totalPage <= 0}
					onClick={onPrevPage}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					disabled={nextDisabled || totalPage <= 0}
					onClick={onNextPage}
				>
					Next
				</Button>
			</Stack>
		</Stack>
	);
};
