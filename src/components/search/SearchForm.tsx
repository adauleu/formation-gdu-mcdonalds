// SearchForm.tsx
import { SearchIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Button, Form } from "react-aria-components";
import { searchByName } from "../../services/nominatim";
import { useMarkersStore } from "../../stores/markersStore";
import { CityInput } from "./CityInput";

const SUBMIT_BUTTON_CLASS = "w-4 h-4 m-auto";

export function SearchForm() {
  const { setMarkers } = useMarkersStore();

  const [inputValue, setInputValue] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    // Cas 1: champ vide
    if (!inputValue) {
      setError("Veuillez saisir une ville");
      return;
    }

    // Cas 2: texte tapé mais pas de sélection
    if (!selectedCity) {
      setError("Veuillez sélectionner une suggestion");
      return;
    }

    // Cas 3: OK
    setIsLoading(true);
    const mcDonalds = await searchByName(selectedCity);
    setMarkers(mcDonalds);

    // reset
    setSelectedCity(undefined);
    setInputValue("");
    setIsLoading(false);
    setError(null);
  }

  return (
    <div className="flex backdrop-blur-sm px-4 py-2 rounded-xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] w-100">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-1 gap-2"
        validationErrors={
          error
            ? {
                city: error,
              }
            : undefined
        }
      >
        <CityInput
          value={inputValue}
          onInputChange={setInputValue}
          onSelectionChange={(city) => {
            setError(null);
            setSelectedCity(city);
          }}
        />

        <Button
          data-testid="submit-button"
          type="submit"
          className="flex-none mt-[24px] rounded-md border-0 bg-yellow-400 hover:bg-yellow-600 pressed:bg-yellow-400/30 w-[26px] h-[26px] transition-colors disabled:cursor-not-allowed disabled:hover:bg-yellow-400 disabled:opacity-50"
        >
          {isLoading ? (
            <LoaderCircle className={`animate-spin ${SUBMIT_BUTTON_CLASS}`} />
          ) : (
            <SearchIcon aria-hidden className={SUBMIT_BUTTON_CLASS} />
          )}
        </Button>
      </Form>
    </div>
  );
}
