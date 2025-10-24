import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./GlobalStyle";
import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";
import reportWebVitals from "./reportWebVitals.ts";
import { routeTree } from "./routeTree.gen.ts";

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

console.log(`



#     #                               #########
#     #                                   #
#     #  #####  #      #      #####       #     #   #  #####  #####  #####
#######  #      #      #      #   #       #     #   #  #      #   #  #
#     #  #####  #      #      #   #       #     #####  #####  #   #  #####
#     #  #      #      #      #   #       #     #   #  #      #  #   #
#     #  #####  #####  #####  #####       #     #   #  #####  #   #  #####

___________________________________________________________________________

This website was designed and built by Steffen Tømmerås.
___________________________________________________________________________



`);

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <GlobalStyle />
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
