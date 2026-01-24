"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { cn } from "@/lib/utils";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const MAP_STYLE = "mapbox://styles/onepunchmob/cmjizdqe8005p01sdgkrrh27g";
const MAP_CENTER: [number, number] = [23.5, 38.0];
const MAP_ZOOM = 5.2;

export type Port = {
  name: string;
  fact: string;
  coordinates: [number, number];
  link: string;
  category: "Major" | "Hidden Gem";
};

export const PORTS: Port[] = [
  {
    name: "Piraeus",
    fact: "Greece’s largest port and the main gateway to Athens.",
    coordinates: [23.6441, 37.9429],
    link: "#services",
    category: "Major",
  },
  {
    name: "Thessaloniki",
    fact: "A vibrant northern hub known for its seafront promenade.",
    coordinates: [22.9447, 40.634],
    link: "#services",
    category: "Major",
  },
  {
    name: "Heraklion",
    fact: "Crete’s capital, minutes from the Palace of Knossos.",
    coordinates: [25.1326, 35.3394],
    link: "#services",
    category: "Major",
  },
  {
    name: "Chania (Souda Bay)",
    fact: "A deep-water harbor serving one of Crete’s most charming cities.",
    coordinates: [24.0746, 35.489],
    link: "#services",
    category: "Major",
  },
  {
    name: "Santorini (Thira)",
    fact: "Iconic caldera views and cliffside villages above the Aegean.",
    coordinates: [25.4325, 36.415],
    link: "#services",
    category: "Major",
  },
  {
    name: "Mykonos",
    fact: "Stylish Cycladic island famed for its whitewashed lanes.",
    coordinates: [25.3264, 37.4465],
    link: "#services",
    category: "Major",
  },
  {
    name: "Rhodes",
    fact: "Medieval Old Town and sun-drenched beaches in the Dodecanese.",
    coordinates: [28.2279, 36.4435],
    link: "#services",
    category: "Major",
  },
  {
    name: "Corfu",
    fact: "Ionian gem with Venetian architecture and emerald bays.",
    coordinates: [19.82, 39.6239],
    link: "#services",
    category: "Major",
  },
  {
    name: "Patras",
    fact: "Major western port linking the Peloponnese to Italy.",
    coordinates: [21.7348, 38.2455],
    link: "#services",
    category: "Major",
  },
  {
    name: "Volos",
    fact: "Gateway to Mount Pelion and the legendary Argonauts.",
    coordinates: [22.9482, 39.3598],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Kavala",
    fact: "Amphitheatrical port city crowned by a Byzantine fortress.",
    coordinates: [24.4126, 40.9355],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Katakolon",
    fact: "Port of call for ancient Olympia, birthplace of the Olympics.",
    coordinates: [21.3172, 37.6578],
    link: "#services",
    category: "Major",
  },
  {
    name: "Nafplio",
    fact: "Romantic coastal town and the first capital of modern Greece.",
    coordinates: [22.8016, 37.5673],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Monemvasia",
    fact: "A medieval fortress town carved into a massive sea rock.",
    coordinates: [23.0560, 36.6876],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Milos",
    fact: "Volcanic island known for its lunar landscapes and Sarakiniko beach.",
    coordinates: [24.4178, 36.7266],
    link: "#services",
    category: "Hidden Gem",
  },
];

type MapboxMapProps = {
  className?: string;
  ports?: Port[];
};

export function MapboxMap({ className, ports = PORTS }: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // Update map source when ports prop changes
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    if (!map.getSource("ports")) return;

    const portsGeojson = {
      type: "FeatureCollection",
      features: ports.map((port) => ({
        type: "Feature",
        id: port.name,
        properties: {
          name: port.name,
          fact: port.fact,
          link: port.link,
          category: port.category,
        },
        geometry: {
          type: "Point",
          coordinates: port.coordinates,
        },
      })),
    } as const;

    (map.getSource("ports") as mapboxgl.GeoJSONSource).setData(portsGeojson as any);
  }, [ports]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      projection: "mercator",
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      attributionControl: false,
    });

    mapRef.current = map;

    map.once("load", () => {
      map.setProjection("mercator");

      const portsGeojson = {
        type: "FeatureCollection",
        features: ports.map((port) => ({
          type: "Feature",
          id: port.name,
          properties: {
            name: port.name,
            fact: port.fact,
            link: port.link,
            category: port.category,
          },
          geometry: {
            type: "Point",
            coordinates: port.coordinates,
          },
        })),
      } as const;

      map.addSource("ports", {
        type: "geojson",
        data: portsGeojson,
      });

      map.addLayer({
        id: "ports-glow",
        type: "circle",
        source: "ports",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            ["case", ["boolean", ["feature-state", "hover"], false], 10, 6],
            8,
            ["case", ["boolean", ["feature-state", "hover"], false], 22, 14],
          ],
          "circle-color": [
            "match",
            ["get", "category"],
            "Major",
            "rgba(81, 210, 198, 0.35)", // Teal glow for Major
            "rgba(255, 183, 77, 0.35)", // Orange glow for Hidden Gems
          ],
          "circle-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.9,
            0.6,
          ],
        },
      });

      map.addLayer({
        id: "ports",
        type: "circle",
        source: "ports",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            ["case", ["boolean", ["feature-state", "hover"], false], 6, 4],
            8,
            ["case", ["boolean", ["feature-state", "hover"], false], 11, 8],
          ],
          "circle-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "#ffffff",
            [
              "match",
              ["get", "category"],
              "Major",
              "#51d2c6", // Teal for Major
              "#ffb74d", // Orange for Hidden Gems
            ],
          ],
          "circle-stroke-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            2.5,
            1.5,
          ],
          "circle-stroke-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            [
              "match",
              ["get", "category"],
              "Major",
              "#51d2c6",
              "#ffb74d",
            ],
            "rgba(255, 255, 255, 0.9)",
          ],
        },
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 18,
        anchor: "bottom",
        className: "map-popup",
      });

      let hoveredId: string | number | null = null;
      let popupHover = false;
      let hideTimeout: ReturnType<typeof setTimeout> | null = null;

      const attachPopupHandlers = () => {
        const popupEl = popup.getElement();
        popupEl.addEventListener("mouseenter", () => {
          popupHover = true;
          if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
          }
        });
        popupEl.addEventListener("mouseleave", () => {
          popupHover = false;
          popup.remove();
        });
      };

      const showPopup = (feature: mapboxgl.MapboxGeoJSONFeature) => {
        const { name, fact, link, category } = feature.properties as {
          name: string;
          fact: string;
          link: string;
          category: string;
        };

        const color = category === "Major" ? "#51d2c6" : "#ffb74d";

        popup
          .setLngLat(feature.geometry.coordinates as [number, number])
          .setHTML(
            `<div class="map-popup-content">
              <div style="margin-bottom: 6px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${color};">${category}</div>
              <p class="map-popup-title">${name}</p>
              <p class="map-popup-fact">${fact}</p>
              <a class="map-popup-link" href="${link}" style="background: ${color}; color: ${category === 'Major' ? '#ffffff' : '#33305e'}">View experiences</a>
            </div>`
          )
          .addTo(map);

        attachPopupHandlers();
      };

      map.on("mouseenter", "ports", (event) => {
        map.getCanvas().style.cursor = "pointer";
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        const feature = event.features?.[0];
        if (!feature) return;
        if (hoveredId !== null) {
          map.setFeatureState(
            { source: "ports", id: hoveredId },
            { hover: false }
          );
        }
        hoveredId = feature.id ?? null;
        if (hoveredId !== null) {
          map.setFeatureState(
            { source: "ports", id: hoveredId },
            { hover: true }
          );
        }
        showPopup(feature);
      });

      map.on("mouseleave", "ports", () => {
        map.getCanvas().style.cursor = "";
        if (hoveredId !== null) {
          map.setFeatureState(
            { source: "ports", id: hoveredId },
            { hover: false }
          );
          hoveredId = null;
        }
        hideTimeout = setTimeout(() => {
          if (!popupHover) popup.remove();
        }, 120);
      });
    });

    map.scrollZoom.disable();
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []); // Only run once on mount

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Map of Greece"
      className={cn("h-full w-full", className)}
    />
  );
}