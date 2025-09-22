import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
import { getMcDonalds, searchCities } from "../../services/nominatim";
import { useMarkers } from "../../contexts/MarkersContext";

const borderClass = "border border-gray-400 rounded-md px-2";

export function AddressInput() {
  const { contains } = useFilter({ sensitivity: "base" });
  const [city, setCity] = useState<string | null>(null);
  const { setMarkers } = useMarkers();

  const [results, setResults] = useState([]);

  async function onClickSearchButton() {
    if (city) {
      const mcDonalds = await getMcDonalds(city);
      setMarkers(mcDonalds);
    }
  }

  // useEffect(() => {
  //   async function fetchCities() {
  //     if (city) {
  //       const res = await searchCities(city);
  //       console.log(res);
  //       setResults(res);
  //     }
  //   }
  //   fetchCities();
  // }, [city]);

  return (
    <div className="backdrop-blur-sm px-4 py-2 rounded-xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-80 group bg-white/53 flex flex-col">
      <span className="pb-1">Rechercher un restaurant</span>
      <Autocomplete filter={contains}>
        <SearchField aria-label="Search" className="flex">
          <Input
            placeholder="Rennes, Clermont-Ferrand, ..."
            onChange={(e) => setCity(e.target.value)}
            className={`flex-1 bg-white min-w-0 text-gray-800 placeholder-gray-500 outline-none focus:outline-none focus:ring-0 ${borderClass}`}
          />
          <Button
            onClick={onClickSearchButton}
            className="rounded-md border-0 p-1 bg-yellow-400 hover:bg-yellow-600 pressed:bg-yellow-400/30 ml-2 w-6 transition-colors"
          >
            <SearchIcon aria-hidden className="w-4 h-4" />
          </Button>
        </SearchField>
        <ListBox
          items={[
            { key: "Paris", name: "Paris" },
            { key: "Marseille", name: "Marseille" },
            { key: "Lyon", name: "Lyon" },
            { key: "Toulouse", name: "Toulouse" },
            { key: "Nice", name: "Nice" },
            { key: "Nantes", name: "Nantes" },
            { key: "Montpellier", name: "Montpellier" },
            { key: "Strasbourg", name: "Strasbourg" },
            { key: "Bordeaux", name: "Bordeaux" },
            { key: "Lille", name: "Lille" },
          ]}
          className="hidden group-focus-within:block outline-hidden overflow-auto flex-1 scroll-pb-1"
        >
          {(item) => <SelectItem key={item.key}>{item.name}</SelectItem>}
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
      className="group flex items-center cursor-default pt-2 select-none outline-hidden text-gray-900 focus:bg-sky-600 focus:text-white"
    >
      {({}) => (
        <span
          className={`bg-white flex-1 flex items-center truncate font-normal group-selected:font-medium ${borderClass}`}
        >
          {props.children}
        </span>
      )}
    </ListBoxItem>
  );
}
