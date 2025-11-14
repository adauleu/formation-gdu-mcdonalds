import "./App.css";
import { SearchForm } from "./components/search/SearchForm";
import { Map } from "./components/map/Map";
import { SelectedRestaurant } from "./components/map/SelectedRestaurant";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative w-screen h-screen text-sm text-black">
        <Map />
        <div className="absolute top-4 right-4 left-4 sm:left-auto">
          <div className="w-full max-w-full sm:max-w-[1024px]">
            <SearchForm />
          </div>
        </div>
        <SelectedRestaurant />
      </div>
    </QueryClientProvider>
  );
}

export default App;
