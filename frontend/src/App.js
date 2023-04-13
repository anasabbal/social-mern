import { BrowserRouter } from "react-router-dom";
import theme from './theme';
import { ThemeProvider } from "@mui/styles";
import MainRoute from "./MainRoute";



function App() {
  return (
      <BrowserRouter>
          <MainRoute/>
      </BrowserRouter>
  );
}

export default App;
