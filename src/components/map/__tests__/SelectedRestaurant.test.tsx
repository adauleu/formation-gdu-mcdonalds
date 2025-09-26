import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, afterEach, type Mock } from "vitest";
import { SelectedRestaurant } from "../SelectedRestaurant";

// On mocke le store pour pouvoir contrôler selectedMarker
vi.mock("../../../stores/markersStore", () => ({
  useMarkersStore: vi.fn(),
}));

import { useMarkersStore } from "../../../stores/markersStore";

describe("SelectedRestaurant", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le message quand aucun restaurant n'est sélectionné", () => {
    (useMarkersStore as unknown as Mock).mockReturnValue({
      selectedMarker: null,
    });

    render(<SelectedRestaurant />);

    expect(
      screen.getByText("Aucun restaurant sélectionné")
    ).toBeInTheDocument();
  });

  it("affiche le restaurant sélectionné quand selectedMarker est défini", () => {
    (useMarkersStore as unknown as Mock).mockReturnValue({
      selectedMarker: { display_name: "Le Bistrot Test" },
    });

    render(<SelectedRestaurant />);

    expect(screen.getByText("Restaurant sélectionné")).toBeInTheDocument();
    expect(screen.getByText("Le Bistrot Test")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Continuer/i })
    ).toBeInTheDocument();
  });
});
