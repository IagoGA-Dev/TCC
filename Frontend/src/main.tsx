import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { createMemoryRouter, RouterProvider } from "react-router";

import Home from "./pages/Home.tsx";
import Features from "./pages/Features.tsx";
import Contact from "./pages/Contact.tsx";
import Info from "./pages/Info.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import App from "./pages/App.tsx";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";

// Pretendo usar MemoryBrowserRouter no final do projeto.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/info",
    element: <Info />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/app",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
