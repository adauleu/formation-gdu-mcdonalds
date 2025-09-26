import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchForm } from "../SearchForm";
import { vi, type Mock } from "vitest";
import { User } from "@react-aria/test-utils";

// Mocks
vi.mock("../../../services/nominatim", () => ({
  searchByName: vi.fn(),
  searchCities: vi.fn(),
}));

vi.mock("../../../stores/markersStore", () => ({
  useMarkersStore: () => ({
    setMarkers: vi.fn(),
  }),
}));

vi.mock("@uidotdev/usehooks", () => ({
  useDebounce: (value: string) => value, // retourne direct la valeur
}));

import { searchByName, searchCities } from "../../../services/nominatim";
import { useMarkersStore } from "../../../stores/markersStore";
import { renderWithClient } from "../../../setupTests";

const testUtilUser = new User({
  interactionType: "mouse",
});

describe("SearchForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche une erreur si le champ est vide", async () => {
    const user = userEvent.setup();
    renderWithClient(<SearchForm />);

    const submitBtn = screen.getByRole("button");
    await user.click(submitBtn);

    expect(
      await screen.findByText(/Veuillez saisir une ville/i)
    ).toBeInTheDocument();
    expect(searchByName).not.toHaveBeenCalled();
  });

  it("affiche une erreur si on tape du texte mais sans sélection", async () => {
    const user = userEvent.setup();
    renderWithClient(<SearchForm />);

    const input = screen.getByPlaceholderText(/Rennes, Clermont-Ferrand/i);
    await user.type(input, "Paris");

    const submitBtn = screen.getByTestId("submit-button");
    await user.click(submitBtn);

    expect(
      await screen.findByText(/Veuillez sélectionner une suggestion/i)
    ).toBeInTheDocument();
    expect(searchByName).not.toHaveBeenCalled();
  });

  it("soumet correctement après sélection d'une ville", async () => {
    const user = userEvent.setup();
    const mockCities = [
      { id: 1, key: 1, display_name: "Paris, Ile de France", name: "Paris" },
    ];
    (searchCities as Mock).mockResolvedValue(mockCities);

    renderWithClient(<SearchForm />);
    const comboboxTester = testUtilUser.createTester("ComboBox", {
      root: screen.getByTestId("city-combobox"),
      interactionType: "mouse",
    });

    const input = screen.getByPlaceholderText(/Rennes, Clermont-Ferrand/i);
    await user.type(input, "Paris");

    await comboboxTester.open();
    expect(comboboxTester.listbox).toBeInTheDocument();
    const options = comboboxTester.options();
    await comboboxTester.selectOption({ option: options[0] });

    const submitBtn = screen.getByRole("button");
    await user.click(submitBtn);

    expect(searchByName).toHaveBeenCalledWith("Paris, Ile de France");

    // Après succès, le champ doit être reset
    expect(input).toHaveValue("");
  });
});
