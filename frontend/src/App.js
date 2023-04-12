import { BrowserRouter } from "react-router-dom";
import theme from './theme';
import { ThemeProvider } from "@mui/styles";
import MainRoute from "./MainRoute";



function App() {
  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainRoute/>
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
