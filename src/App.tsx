import "./App.css";
import { SearchForm } from "./components/search/SearchForm";
import { Map } from "./components/map/Map";
import { SelectedRestaurant } from "./components/SelectedRestaurant";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative w-screen h-screen text-sm text-black">
        <Map />
        <div className="absolute top-4 right-4">
          <div className="w-full max-w-[1024px]">
            <SearchForm />
          </div>
        </div>
        <SelectedRestaurant />
      </div>
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
