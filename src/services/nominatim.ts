import axios from "axios";

interface NominatimAddress {
  amenity?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city_district?: string;
  city?: string;
  municipality?: string;
  county?: string;
  "ISO3166-2-lvl6"?: string;
  state?: string;
  "ISO3166-2-lvl4"?: string;
  region?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
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

export async function getMcDonalds(city: string) {
  const results = await axios.get<NominatimResult[]>(
    `https://nominatim.openstreetmap.org/search?addressdetails=1&q=mcDonald+${city}&format=jsonv2&limit=10`
  );

  return results.data;
}

export async function searchCities(city: string) {
  const results = await axios.get<NominatimResult[]>(
    `https://nominatim.openstreetmap.org/search?city=${city}&format=jsonv2&limit=5`
  );

  return results.data
    .filter((res) => res.addresstype === "city")
    .map((res) => {
      return {
        key: res.place_id,
        name: res.name,
      };
    });
}
