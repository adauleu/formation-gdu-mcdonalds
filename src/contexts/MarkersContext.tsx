import { createContext, useContext, useState } from "react";

interface NominatimAddress {
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

interface NominatimResult {
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

interface MarkersContextType {
  markers: NominatimResult[];
  selectedMarker: NominatimResult | null;
  setMarkers: (markers: NominatimResult[]) => void;
  setSelectedMarker: (marker: NominatimResult | null) => void;
  addMarker: (marker: NominatimResult) => void;
  clearMarkers: () => void;
}

const MarkersContext = createContext<MarkersContextType | undefined>(undefined);

interface MarkersProviderProps {
  children: ReactNode;
}

export function MarkersProvider({ children }: MarkersProviderProps) {
  const [markers, setMarkers] = useState<NominatimResult[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<NominatimResult | null>(
    null
  );

  const addMarker = (marker: NominatimResult) => {
    setMarkers((prev) => [...prev, marker]);
  };

  const clearMarkers = () => {
    setMarkers([]);
    setSelectedMarker(null);
  };

  const value: MarkersContextType = {
    markers,
    selectedMarker,
    setMarkers,
    setSelectedMarker,
    addMarker,
    clearMarkers,
  };

  return (
    <MarkersContext.Provider value={value}>{children}</MarkersContext.Provider>
  );
}

export function useMarkers() {
  const context = useContext(MarkersContext);
  if (context === undefined) {
    throw new Error("useMarkers must be used within a MarkersProvider");
  }
  return context;
}

export type { NominatimResult, NominatimAddress };
