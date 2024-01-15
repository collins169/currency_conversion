import {
	Tag,
	TagLabel,
	TagLeftIcon
} from "@chakra-ui/react";

import { FaCircle } from "react-icons/fa";

interface StatusProps {
	status: string
}

export const Status = ({status} : StatusProps) => {
	return (
		<Tag size={"md"} borderRadius="full" variant="subtle" colorScheme="whatsapp">
			<TagLeftIcon boxSize="6px" as={FaCircle} />
			<TagLabel>{status}</TagLabel>
		</Tag>
	);
};
