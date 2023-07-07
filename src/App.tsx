import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";
import UserDataProvider from "./providers/UserDataProvider";
import ThemeSetting from "./components/ThemeSetting";

function App() {
  return (
    <UserDataProvider>
      <ThemeSetting>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </ThemeSetting>
    </UserDataProvider>
  );
}

export default App;
