import { Marker, Popup, useMap } from "react-leaflet";
import {
  useMarkers,
  type NominatimResult,
} from "../../contexts/MarkersContext";
import { useEffect, useState } from "react";
import type { LatLngBoundsExpression, LeafletMouseEvent } from "leaflet";

function getShortAddress(m: NominatimResult) {
  const parts = [
    m.address.amenity,
    m.address.house_number,
    m.address.road,
    m.address.city,
  ].filter(Boolean);

  return parts.join(" ");
}

function calculateBounds(
  results: NominatimResult[]
): LatLngBoundsExpression | null {
  if (results.length === 0) return null;

  let minLat = Infinity,
    maxLat = -Infinity;
  let minLon = Infinity,
    maxLon = -Infinity;

  results.forEach((result) => {
    const [latMin, latMax, lonMin, lonMax] = result.boundingbox.map(Number);
    minLat = Math.min(minLat, latMin);
    maxLat = Math.max(maxLat, latMax);
    minLon = Math.min(minLon, lonMin);
    maxLon = Math.max(maxLon, lonMax);
  });
  return [
    [minLat, minLon],
    [maxLat, maxLon],
  ];
}

export function Markers() {
  const { markers, setSelectedMarker } = useMarkers();
  const [showPopup, setShowPopup] = useState(false);
  function onClick(e: LeafletMouseEvent) {
    e.originalEvent.preventDefault();
    setShowPopup(true);
  }
  const map = useMap();

  useEffect(() => {
    const newBoundingBox = calculateBounds(markers);
    if (newBoundingBox) {
      map.flyToBounds(newBoundingBox, { padding: [20, 20], maxZoom: 16 });
    }
  }, [markers, map]);

  return (
    <>
      {markers.map((m) => {
        return (
          <Marker
            key={m.osm_id}
            position={[Number(m.lat), Number(m.lon)]}
            eventHandlers={{ click: onClick }}
          >
            {showPopup && (
              <Popup>
                <p className="mb-2">{getShortAddress(m)}</p>
                <button
                  onClick={() => {
                    setSelectedMarker(m);
                  }}
                  className="bg-yellow-400 hover:bg-yellow-600 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Choisir
                </button>
              </Popup>
            )}
          </Marker>
        );
      })}
    </>
  );
}
