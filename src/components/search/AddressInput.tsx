import { CheckIcon, SearchIcon, XIcon } from 'lucide-react';
import type { AutocompleteProps, Key, ListBoxItemProps } from 'react-aria-components';
import { Autocomplete, Button, Input, ListBox, ListBoxItem, SearchField, useFilter } from 'react-aria-components';

interface AddressInputProps<T extends object>
  extends Omit<AutocompleteProps<T>, 'children'> {
  label?: string;
  placeholder?: string;
  items?: Iterable<T>;
  onAction?: (id: Key) => void;
}

export function AddressInput<T extends object>(
  props: AddressInputProps<T>
) {
  const { contains } = useFilter({ sensitivity: 'base' });
  return (
    <div className="my-autocomplete group z-1000" >
      <Autocomplete filter={contains} {...props}>
        <SearchField
          aria-label="Search"
          autoFocus
          className="group flex items-center bg-white forced-colors:bg-[Field] border-2 border-gray-300 has-focus:border-sky-600 rounded-full m-1 w-full max-w-[512px]"
        >
          <SearchIcon
            aria-hidden
            className="w-4 h-4 ml-2 text-gray-600 forced-colors:text-[ButtonText]"
          />
          <Input
            placeholder="Rennes, Clermont-Ferrand, ..."
            className="px-2 py-1 flex-1 min-w-0 border-none outline outline-0 bg-white text-base text-gray-800 placeholder-gray-500 font-[inherit] [&::-webkit-search-cancel-button]:hidden"
          />
          <Button className="text-sm text-center transition rounded-full border-0 p-1 flex items-center justify-center text-gray-600 bg-transparent hover:bg-black/[5%] pressed:bg-black/10 mr-1 w-6 group-empty:invisible">
            <XIcon aria-hidden className="w-4 h-4" />
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
          className="hidden group-focus-within:block outline-hidden p-1 overflow-auto flex-1 scroll-pb-1 bg-white"
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
      className="group flex items-center gap-2 cursor-default select-none py-2 px-4 outline-hidden rounded-sm text-gray-900 focus:bg-sky-600 focus:text-white"
    >
      {({ isSelected }) => (
        <>
          <span className="flex-1 flex items-center gap-2 truncate font-normal group-selected:font-medium">
            {props.children}
          </span>
          <span className="w-5 flex items-center text-sky-600 group-focus:text-white">
            {isSelected && <CheckIcon size="S" />}
          </span>
        </>
      )}
    </ListBoxItem>
  );
}