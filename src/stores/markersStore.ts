import { create } from "zustand";
import type { NominatimResult } from "../services/nominatim";

interface MarkersStore {
  markers: NominatimResult[];
  selectedMarker: NominatimResult | null;
  setMarkers: (markers: NominatimResult[]) => void;
  setSelectedMarker: (marker: NominatimResult | null) => void;
  clearMarkers: () => void;
}

export const useMarkersStore = create<MarkersStore>((set) => ({
  markers: [],
  selectedMarker: null,

  setMarkers: (markers) => set({ markers }),

  setSelectedMarker: (selectedMarker) => set({ selectedMarker }),

  clearMarkers: () =>
    set({
      markers: [],
      selectedMarker: null,
    }),
}));
