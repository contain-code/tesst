import "../styles/globals.css";

//INTERNAL IMPORT 
import {ChatAppProvider} from "../Context/ChatAppContext";
import { NavBar } from "../Components/NavBar";

const MyApp = ({ Component, pageProps}) => (
  <div>
    <ChatAppProvider>
      <Component {...pageProps} />
    </ChatAppProvider>
  </div>
)
export default MyApp;
