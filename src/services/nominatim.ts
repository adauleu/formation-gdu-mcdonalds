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

const NOMINATIM_URL = "https://nominatim.openstreetmap.org";
const NOMINATIM_PARAMS = "&format=jsonv2&limit=10";

export async function searchByName(cityName: string) {
  const results = await axios.get<NominatimResult[]>(
    `${NOMINATIM_URL}/search?addressdetails=1&q=mcDonald+${cityName}${NOMINATIM_PARAMS}`
  );

  return results.data;
}

export async function searchCities(city: string) {
  const results = await axios.get<NominatimResult[]>(
    `${NOMINATIM_URL}/search?city=${city}&featureType=city${NOMINATIM_PARAMS}`
  );

  return results.data
    .filter((res) => res.addresstype === "city" || res.addresstype === "town")
    .map((res) => {
      return {
        id: res.place_id,
        key: res.place_id,
        display_name: res.display_name,
        name: res.name,
      };
    });
}
