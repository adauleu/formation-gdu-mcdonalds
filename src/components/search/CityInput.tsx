// CityInput.tsx
import type { ListBoxItemProps } from "react-aria-components";
import {
  ComboBox,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import { searchCities } from "../../services/nominatim";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

const borderClass = "border border-gray-400 rounded-md px-2 leading-6";

export function CityInput({
  value,
  onInputChange,
  onSelectionChange,
}: {
  value: string;
  onInputChange: (v: string) => void;
  onSelectionChange: (city: string | undefined) => void;
}) {
  const debouncedCityInput = useDebounce(value, 500);
  const isSearchEnabled =
    !!debouncedCityInput && debouncedCityInput.length >= 3;

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["cities", debouncedCityInput],
    queryFn: () =>
      debouncedCityInput
        ? searchCities(debouncedCityInput)
        : Promise.resolve([]),
    enabled: isSearchEnabled,
    staleTime: 5000,
  });

  return (
    <ComboBox
      data-testid="city-combobox"
      allowsCustomValue
      inputValue={value}
      onInputChange={(val) => {
        onInputChange(val);
        onSelectionChange(undefined); // reset sélection quand on tape
      }}
      onSelectionChange={(key) => {
        const selectedCity = data?.find((d) => d.key === key);
        if (selectedCity) {
          onInputChange(selectedCity.display_name);
          onSelectionChange(selectedCity.display_name);
        }
      }}
      name="city"
      allowsEmptyCollection
      className="group flex flex-col gap-1 flex-1"
    >
      <Label>Rechercher un restaurant</Label>
      <div>
        <Input
          placeholder="Rennes, Clermont-Ferrand, ..."
          className={({ isInvalid }) =>
            `w-full bg-white min-w-0 text-gray-800 placeholder-gray-500 outline-none focus:outline-none focus:ring-0 ${borderClass} ${
              isInvalid ? "border-red-500" : "border-gray-400"
            }`
          }
        />
        <FieldError className="text-red-600 text-xs mt-1" />
      </div>

      <Popover
        offset={1}
        className="rounded-md max-h-60 w-(--trigger-width) overflow-auto entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out"
      >
        <ListBox
          className="bg-white"
          items={data}
          renderEmptyState={() => {
            return !isSearchEnabled ? null : (
              <div className="text-gray-900 text-sm p-2">
                {isLoading ? "Recherche en cours" : "Aucun résultat"}
              </div>
            );
          }}
        >
          {(item) => (
            <CitySuggestion key={item.key} textValue={item.display_name}>
              {item.display_name}
            </CitySuggestion>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}

function CitySuggestion(props: ListBoxItemProps & { children: string }) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused }) =>
        `cursor-pointer px-2 py-1 text-sm text-gray-900 
        ${isFocused ? "bg-gray-200" : "bg-white"}`
      }
    >
      {props.children}
    </ListBoxItem>
  );
}
