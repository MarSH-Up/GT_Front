import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import theme from "./design/theme";
import Routes from "./routes/Routes";

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
