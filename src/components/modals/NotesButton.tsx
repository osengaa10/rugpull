import { Button } from "@chakra-ui/react";


type Props = {
  handleOpenNotesModal: any;
};

export default function NotesButton({ handleOpenNotesModal }: Props) {

  return (
    <Button
      onClick={handleOpenNotesModal}
      bg="blue.800"
      color="blue.300"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: "blue.700",
        color: "blue.400",
      }}
      _active={{
        backgroundColor: "blue.800",
        borderColor: "blue.700",
      }}
    >
      Misc.
    </Button>
  );
}
