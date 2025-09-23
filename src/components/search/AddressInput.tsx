import { SearchIcon } from "lucide-react";
import { useState } from "react";
import type { ListBoxItemProps } from "react-aria-components";
import {
  Autocomplete,
  Button,
  Input,
  ListBox,
  ListBoxItem,
  SearchField,
  useFilter,
} from "react-aria-components";
import { searchByName, searchCities } from "../../services/nominatim";
import { useMarkersStore } from "../../stores/markersStore";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

const borderClass = "border border-gray-400 rounded-md px-2";

export function AddressInput() {
  const { contains } = useFilter({ sensitivity: "base" });
  const [cityInput, setCityInput] = useState<string | null>(null);

  const debouncedCityInput = useDebounce(cityInput, 500);
  const { setMarkers } = useMarkersStore();

  // Queries
  const { data } = useQuery({
    queryKey: ["cities", debouncedCityInput],
    queryFn: () => searchCities(debouncedCityInput as string),
    enabled: debouncedCityInput !== null,
    staleTime: 5000,
  });

  async function onClickSearchButton(name: string | null) {
    if (name) {
      const mcDonalds = await searchByName(name);
      setMarkers(mcDonalds);
    }
  }

  return (
    <div className="backdrop-blur-sm px-4 py-2 rounded-xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-80 group bg-white/53 flex flex-col">
      <span className="pb-1">Rechercher un restaurant</span>
      <Autocomplete filter={contains}>
        <SearchField aria-label="Search" className="flex">
          <Input
            placeholder="Rennes, Clermont-Ferrand, ..."
            onChange={(e) => setCityInput(e.target.value)}
            className={`flex-1 bg-white min-w-0 text-gray-800 placeholder-gray-500 outline-none focus:outline-none focus:ring-0 ${borderClass}`}
          />
          <Button
            onClick={() => onClickSearchButton(cityInput)}
            className="rounded-md border-0 p-1 bg-yellow-400 hover:bg-yellow-600 pressed:bg-yellow-400/30 ml-2 w-6 transition-colors"
          >
            <SearchIcon aria-hidden className="w-4 h-4" />
          </Button>
        </SearchField>
        <ListBox
          items={data}
          onSelectionChange={(c) => {
            const correspondingCity = data?.find(
              (d) => d.key === c.values().next().value
            );
            if (correspondingCity) {
              onClickSearchButton(correspondingCity.display_name);
            }
            console.log(correspondingCity);
          }}
          selectionMode="single"
          className="hidden group-focus-within:block outline-hidden overflow-auto flex-1 scroll-pb-1"
        >
          {(item) => (
            <SelectItem key={item.key} value={item}>
              {item.display_name}
            </SelectItem>
          )}
        </ListBox>
      </Autocomplete>
    </div>
  );
}

function SelectItem(props: ListBoxItemProps & { children: string }) {
  return (
    <ListBoxItem
      {...props}
      textValue={props.children}
      className="group cursor-default pt-2 select-none outline-hidden text-gray-900 focus:bg-sky-600 focus:text-white"
    >
      <p className={`bg-white hover:bg-gray-200 cursor-pointer ${borderClass}`}>
        {props.children}
      </p>
    </ListBoxItem>
  );
}
