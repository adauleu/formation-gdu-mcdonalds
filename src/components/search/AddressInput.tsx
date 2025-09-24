import { SearchIcon } from "lucide-react";
import { useState } from "react";
import type { ListBoxItemProps } from "react-aria-components";
import {
  Autocomplete,
  Button,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  TextField,
} from "react-aria-components";
import { searchByName, searchCities } from "../../services/nominatim";
import { useMarkersStore } from "../../stores/markersStore";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

const borderClass = "border border-gray-400 rounded-md px-2 leading-6";

export function AddressInput() {
  const [cityInput, setCityInput] = useState<string>();

  const debouncedCityInput = useDebounce(cityInput, 500);
  const { setMarkers } = useMarkersStore();

  // Queries
  const { data } = useQuery({
    queryKey: ["cities", debouncedCityInput],
    queryFn: () => searchCities(debouncedCityInput as string),
    enabled: debouncedCityInput !== null,
    staleTime: 5000,
  });

  async function onClickSearchButton(name?: string) {
    if (name) {
      const mcDonalds = await searchByName(name);
      setMarkers(mcDonalds);
    }
  }

  return (
    <div className="backdrop-blur-sm px-4 py-2 rounded-xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-100 group bg-white/53 flex">
      <div className="flex-1">
        <Autocomplete>
          <Label>Rechercher un restaurant</Label>
          <TextField aria-label="Search">
            <Input
              placeholder="Rennes, Clermont-Ferrand, ..."
              onChange={(e) => {
                console.log(e.target.value);
                setCityInput(e.target.value);
              }}
              value={cityInput}
              className={`w-full bg-white min-w-0 text-gray-800 placeholder-gray-500 outline-none focus:outline-none focus:ring-0 ${borderClass}`}
            />
          </TextField>
          <ListBox
            items={data}
            onSelectionChange={(selection) => {
              const selectedKey = Array.from(selection)[0];
              const correspondingCity = data?.find(
                (d) => d.key === selectedKey
              );
              if (correspondingCity) {
                setCityInput(correspondingCity.display_name);
              }
            }}
            selectionBehavior="replace"
            selectionMode="single"
            className="hidden group-focus-within:block outline-hidden overflow-auto flex-1 scroll-pb-1"
          >
            {(item) => (
              <SelectItem
                key={item.key}
                value={item}
                textValue={item.display_name}
              >
                {item.display_name}
              </SelectItem>
            )}
          </ListBox>
        </Autocomplete>
      </div>
      <Button
        type="submit"
        onClick={() => onClickSearchButton(cityInput)}
        className="rounded-md border-0 bg-yellow-400 hover:bg-yellow-600 pressed:bg-yellow-400/30 ml-2 w-[26px] h-[26px] transition-colors mt-[19px]"
      >
        <SearchIcon aria-hidden className="w-4 h-4 m-auto" />
      </Button>
    </div>
  );
}

function SelectItem(props: ListBoxItemProps & { children: string }) {
  return (
    <ListBoxItem
      {...props}
      className="group cursor-default pt-2 select-none outline-hidden text-gray-900 focus:bg-sky-600 focus:text-white"
    >
      <p className={`bg-white hover:bg-gray-200 cursor-pointer ${borderClass}`}>
        {props.children}
      </p>
    </ListBoxItem>
  );
}
