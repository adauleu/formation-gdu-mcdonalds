import { MapContainer, TileLayer } from 'react-leaflet'

export function Map() {
    return (
        <MapContainer center={[48.8566, 2.3522]} zoom={15} className="w-screen h-screen" zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
    )
}