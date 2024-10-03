import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { searchResult } from "@/pages/search";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const icon = L.icon({
  iconUrl: "/icons/house-marker-sm.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const LeafletMap = ({
  data,
  onSelect,
}: {
  data: searchResult[];
  onSelect: (id: number) => void;
}) => {
  return (
    <div className="flex-grow flex">
      <MapContainer
        center={
          [data[1]?.lat, data[1]?.long] || [
            51.512400350160746, -0.09178871997356897,
          ]
        }
        zoom={11}
        minZoom={3}
        scrollWheelZoom={true}
        className="max-w-full min-h-[50vh] max-h-[80vh] z-0 flex-grow sticky top-28"
        area-label="location Map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* map through data and create markers */}
        {data &&
          data?.map((item: searchResult, index: number) => {
            return (
              <Marker
                position={[item?.lat, item?.long] || [51.5421655, -0.0022275]}
                icon={icon}
                key={index + item?.title + index}
                eventHandlers={{
                  click: () => {
                    onSelect(index);
                  },
                }}
              >
                <Popup
                  area-label={"location marker of - " + item?.title}
                  className="pb-8"
                >
                  {item?.title || "hotel"}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
