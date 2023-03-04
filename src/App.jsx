import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./contexts/AdoptedPetContext.js";
import Loader from "./components/Loader.jsx";

const SearchParams = lazy(() => import("./pages/SearchParams.jsx"));
const Details = lazy(() => import("./pages/Details.jsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPetHook = useState(null);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPetHook}>
            <Suspense fallback={<Loader />}>
              <header>
                <Link to={"/"}>Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/" element={<SearchParams />} />
                <Route path="/details/:id" element={<Details />} />
              </Routes>
            </Suspense>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
