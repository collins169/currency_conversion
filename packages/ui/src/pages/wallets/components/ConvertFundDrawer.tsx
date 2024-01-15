import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Stack,
	Text,
	Select,
	Input,
	Icon,
	Center,
	Box,
	Button,
	Skeleton,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaShuffle } from "react-icons/fa6";
import moment from 'moment';

import { useGetCurrenciesQuery } from "../../../queries/currencies/useGetCurrenciesQuery";
import { CurrencyModel, WalletModel } from "../../../constants/model";
import { useCompareRatesQuery } from "../../../queries/exchange-rates/useCompareRateQuery";
import { Currency } from "../../../constants/currencies";

interface ConvertFundDrawerProps {
	onClose: () => void;
	isOpen: boolean;
	wallets: WalletModel[];
}
export const ConvertFundDrawer = ({
	onClose,
	isOpen,
	wallets,
}: ConvertFundDrawerProps) => {
	const { data: currencies, isLoading } = useGetCurrenciesQuery();

	const formik = useFormik({
		initialValues: {
			from: "",
			fromAmount: 0,
			to: "",
			toAmount: 0,
		},
		validationSchema: Yup.object({
			from: Yup.string().required("Source wallet is required"),
			fromAmount: Yup.number().positive().required("Amount is required"),
			to: Yup.string().required("Destination wallet is required"),
			toAmount: Yup.number().positive().default(0),
		}),
		onSubmit: async ({ from, to }) => {},
	});

	const { data: rate, isLoading: isRateLoading } = useCompareRatesQuery({
		from: formik.values.from,
		to: formik.values.to,
	});

	const getWalletBalance = (currencyCode: Currency): string => {
		const wallet = wallets?.find(
			(wallet) => wallet.currencyCode === currencyCode
		);

		const balance = wallet?.balance.available;

		return `${wallet?.currency?.symbol} ${balance}`;
	};

	return (
		<Drawer onClose={onClose} isOpen={isOpen} size="sm">
			<DrawerOverlay />
			<DrawerContent borderRadius="lg">
				<DrawerCloseButton />
				<DrawerHeader>Convert Funds</DrawerHeader>
				<DrawerBody>
					<Skeleton height="350px" isLoaded={!isLoading}>
						<Stack
							direction="row"
							align="center"
							justifyContent="space-between"
							gap={2}
						>
							<Stack>
								<Text>Source Wallet</Text>
								<Select
									placeholder="Select Wallet"
									w={164}
									name="from"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.from}
								>
									{wallets
										?.filter(
											({ currencyCode }) => currencyCode !== formik.values.to
										)
										?.map(({ currencyCode }: WalletModel) => (
											<option
												key={`source-${currencyCode}`}
												value={currencyCode}
											>
												{currencyCode}
											</option>
										))}
								</Select>
								<Input type="number" w={164} />
							</Stack>
							<Center
								bg="orange.100"
								borderRadius="full"
								w={8}
								h={8}
								mt={5}
								color="orange.600"
							>
								<Icon as={FaShuffle} />
							</Center>
							<Stack>
								<Text>Destination Wallet</Text>
								<Select
									placeholder="Select Wallet"
									w={164}
									name="to"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.to}
								>
									{wallets
										?.filter(
											({ currencyCode }) => currencyCode !== formik.values.from
										)
										?.map(({ currencyCode }: WalletModel) => (
											<option
												key={`destination-${currencyCode}`}
												value={currencyCode}
											>
												{currencyCode}
											</option>
										))}
								</Select>
								<Input type="number" w={164} />
							</Stack>
						</Stack>
						{!!formik.values.from  && <Text fontSize="x-small" color="gray" mt={3}>
							Available balance: {getWalletBalance(formik.values.from as Currency)}
						</Text>}
						{!!formik.values.from && !!formik.values.to && (
							<Skeleton height={100} isLoaded={!isRateLoading}>
								<Box bg="orange.50" borderRadius="lg">
									<Stack
										direction="row"
										mt={10}
										w="full"
										justifyContent="space-between"
										gap={2}
										p={4}
									>
										<Stack>
											<Text fontSize="x-small">Exchange rate:</Text>
											<Text fontSize="sm">
												{" "}
												{formik.values.fromAmount} {formik.values.from} ={" "}
												{formik.values.fromAmount * (rate?.buy ?? 1)}{" "}
												{formik.values.to}
											</Text>
											<Text fontSize="sm">
												{formik.values.toAmount} {formik.values.to} ={" "}
												{formik.values.toAmount * (rate?.sell ?? 1)}{" "}
												{formik.values.from}
											</Text>
										</Stack>

										<Stack>
											<Text fontSize="x-small">Transaction fee:</Text>
											<Text fontSize="sm">USD 5.17</Text>
										</Stack>

										<Stack>
											<Text fontSize="x-small">Estimated arrival:</Text>
											<Text fontSize="sm">
												{moment().add(10).format("D/MM/YYYY, h:mm")}
											</Text>
										</Stack>
									</Stack>
								</Box>
							</Skeleton>
						)}
						<Button w="full" colorScheme="orange" mt={10}>
							Convert
						</Button>
					</Skeleton>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
