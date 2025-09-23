import "./App.css";
import { AddressInput } from "./components/search/AddressInput";
import { Map } from "./components/map/Map";
import { MarkersProvider } from "./contexts/MarkersContext";
import { SelectedRestaurant } from "./components/SelectedRestaurant";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MarkersProvider>
        <div className="relative w-screen h-screen text-sm text-black">
          <Map />
          <div className="absolute top-4 right-4">
            <div className="w-full max-w-[1024px]">
              <AddressInput />
            </div>
          </div>
          <SelectedRestaurant />
        </div>
      </MarkersProvider>
    </QueryClientProvider>
  );
}

export default App;
