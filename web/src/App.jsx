import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "@telegram-apps/telegram-ui/dist/styles.css";
import "./App.css";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import {
  AppRoot
} from "@telegram-apps/telegram-ui";
import { UserProvider } from './contexts/UserContext';
import Farm from "./components/Farm/Farm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/shop",
    element: <Shop/>,
  },
  {
    path: "/farm",
    element: <Farm/>,
  },
]);

const App = () => {
  
  return (
    <UserProvider>
      <AppRoot>
        <RouterProvider router={router} />
      </AppRoot>
    </UserProvider>
  );
}

export default App;
