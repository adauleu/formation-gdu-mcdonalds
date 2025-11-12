import { MapContainer, TileLayer } from "react-leaflet";
import { Markers } from "./Markers";

const PARIS_COORDINATES: [number, number] = [48.8566, 2.3522];
const isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export function Map() {
  return (
    <MapContainer
      center={PARIS_COORDINATES}
      zoom={15}
      className="w-screen h-screen z-0"
      zoomControl={!isTouchScreen}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Markers />
    </MapContainer>
  );
}
