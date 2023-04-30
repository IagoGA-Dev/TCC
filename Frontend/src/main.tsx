import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createMemoryRouter, RouterProvider } from "react-router";

import Home from "./pages/Home.tsx";
import Features from "./pages/Features.tsx";
import Contact from "./pages/Contact.tsx";
import Info from "./pages/Info.tsx";

const router = createMemoryRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
