import ReactDOM  from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import {Store} from './redux/store/store';


ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
 </Provider>

)
;