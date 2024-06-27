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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/shop",
    element: <Shop/>,
  },
]);

const App = () => {
  
  return (
    <AppRoot>
      <RouterProvider router={router} />
    </AppRoot>
  );
}

export default App;
