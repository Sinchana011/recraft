"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useComputedColorScheme } from "@mantine/core";
import { Icon } from "leaflet";
import type { ItemData } from "../lib/placeholder-data";

interface DiscoveryMapProps {
  items: ItemData[];
}

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
});

export function DiscoveryMap({ items }: DiscoveryMapProps) {
  const computedColorScheme = useComputedColorScheme("light");
  const isDark = computedColorScheme === "dark";

  const lightMapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkMapUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const mapCenter: [number, number] = [20.5937, 78.9629];

  return (
    <MapContainer
      center={mapCenter}
      zoom={5}
      style={{ height: "60vh", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
        url={isDark ? darkMapUrl : lightMapUrl}
      />
      {items.map((item) => (
        <Marker key={item.id} position={item.coords} icon={customIcon}>
          <Popup>
            <b>{item.title}</b>
            <br />
            {item.city}
            <br />
            <br />
            {/* THIS IS THE NEW PART - A LINK TO THE DETAIL PAGE */}
            <a
              href={`/item/${item.id}`}
              style={{
                textDecoration: "none",
                padding: "5px 10px",
                background: "#D9534F",
                color: "white",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              View Details
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
