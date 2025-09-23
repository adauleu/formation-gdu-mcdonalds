import { create } from "zustand";

export interface NominatimAddress {
  amenity?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city_district?: string;
  city?: string;
  house_number?: string;
  municipality?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

export interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: NominatimAddress;
  boundingbox: [string, string, string, string];
}

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
