import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};


export default function Layout({ children }: Props) {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bgGradient="linear(to-t, #7928CA, #FF0080)"
      
    >
      {children}
    </Flex>
  );
}
