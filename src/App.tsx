import { Outlet } from "react-router-dom";
import { AppContainer, FlexContainer } from "styles/layouts";
import { Title } from "styles/components";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { SquareCheckBig } from "lucide-react";

const App = () => {
  return (
    <AppContainer data-testid="app-container">
      <Title>
        <FlexContainer justify="space-between" align="center">
          <Link to="/todos">My Todos</Link>
          <SquareCheckBig strokeWidth={3} />
        </FlexContainer>
      </Title>
      <Outlet />
      <Toaster position="top-center" />
    </AppContainer>
  );
};

export default App;
