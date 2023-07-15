import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { BrowserRouter as Router } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { store } from "store";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};
