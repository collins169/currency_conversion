import { useLocation } from "react-router-dom";
import {
	Box,
	Flex,
	FlexProps,
	Icon
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
	icon: IconType;
	path: string;
	children: string;
}
export const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
	const {pathname} = useLocation()
	return (
		<Box
			as="a"
			href={path}
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				// role="group"
				cursor="pointer"
				_hover={{
					bg: "orange.50",
					color: "#53433C",
				}}
				sx={{
					bg: path === pathname ? "orange.50" : "",
					color: "#53433C",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Box>
	);
};
