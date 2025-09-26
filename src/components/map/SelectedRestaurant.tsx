import { useMarkersStore } from "../../stores/markersStore";

export function SelectedRestaurant() {
  const { selectedMarker } = useMarkersStore();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[600px]">
      <div className="bg-white rounded-t-2xl shadow-[0_-4px_4px_0_rgba(0,0,0,0.25)] p-6">
        {selectedMarker ? (
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Restaurant sélectionné</h3>
            <div className="text-sm text-gray-600">
              <p>{selectedMarker.display_name}</p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  /* TODO: Ajouter action de navigation */
                }}
                className="bg-yellow-400 hover:bg-yellow-600 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Continuer
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-bold">Aucun restaurant sélectionné</p>
          </div>
        )}
      </div>
    </div>
  );
}
