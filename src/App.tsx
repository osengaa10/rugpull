import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import Keys from "./components/Keys";
import Token from "./components/Token";
import "@fontsource/inter";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Router>
    <ChakraProvider theme={theme}>
      <Layout>
        <Switch>
          <Route exact path="/">
          <ConnectButton handleOpenModal={onOpen} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
            <Keys />
          </Route>
          <Route path="/token">
            <Token />
          </Route>
        </Switch>
      </Layout>
        
    </ChakraProvider>
    </Router>
  );
}

export default App;
