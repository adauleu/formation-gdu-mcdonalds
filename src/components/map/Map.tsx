import { MapContainer, TileLayer } from "react-leaflet";
import { Markers } from "./Markers";

export function Map() {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={15}
      className="w-screen h-screen z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Markers />
    </MapContainer>
  );
}
