import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/global.css";
import Router from "./components/Router";
import { PriceProvider } from "./providers/PriceProvider";
import { UserProvider } from "./providers/UserProviders";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <PriceProvider>

          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </PriceProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
