import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Layout from "./components/common/Layout";
import Kpop from "./routes/Kpop";
import NotFound from "./screens/NotFound";
import ComponentError from "./screens/ComponentError";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
import Hot from "./routes/Hot";
import MovieDrama from "./routes/MovieDrama";
import Sport from "./routes/Sport";
import { useEffect, useState } from "react";
import Loading from "./screens/Loading";
import { auth } from "./firebase";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResetPassword from "./routes/ResetPassword";

const Container = styled.div`
  width: 80%;
  height: 100vh;

  margin: 0 auto;
`;

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
  }
  max-height: 100vh;
  min-height: 100vh;
`;

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Kpop />,
        errorElement: <ComponentError />,
      },
      {
        path: "hot",
        element: <Hot />,
        errorElement: <ComponentError />,
      },
      {
        path: "movie-drama",
        element: <MovieDrama />,
        errorElement: <ComponentError />,
      },
      {
        path: "sport",
        element: <Sport />,
        errorElement: <ComponentError />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "create-account",
    element: <CreateAccount />,
    errorElement: <NotFound />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <NotFound />,
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <GlobalStyle />
            <RouterProvider router={route} />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
