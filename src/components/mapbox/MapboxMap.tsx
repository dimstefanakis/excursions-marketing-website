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

type PortGeoProperties = {
  name: string;
  fact: string;
  link: string;
  category: Port["category"];
};

const buildPortsGeojson = (
  ports: Port[]
): GeoJSON.FeatureCollection<GeoJSON.Point, PortGeoProperties> => ({
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
});

export const PORTS: Port[] = [
  {
    name: "Piraeus",
    fact: "Greece’s largest port and the main gateway to Athens.",
    coordinates: [23.6441, 37.9429],
    link: "#services",
    category: "Major",
  },
  {
    name: "Mykonos",
    fact: "Cosmopolitan Cycladic port with iconic windmills and alleys.",
    coordinates: [25.3264, 37.4465],
    link: "#services",
    category: "Major",
  },
  {
    name: "Paros",
    fact: "Cycladic harbor famed for Parikia and white-sand beaches.",
    coordinates: [25.1506, 37.0842],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Milos",
    fact: "Volcanic island known for its lunar landscapes and Sarakiniko beach.",
    coordinates: [24.4467, 36.7267],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Folegandros",
    fact: "Quiet Cycladic isle with a cliffside Chora and serene coves.",
    coordinates: [24.9542, 36.6271],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Corfu",
    fact: "Ionian gem with Venetian fortresses and emerald bays.",
    coordinates: [19.9192, 39.6243],
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
    name: "Souda Bay (Chania)",
    fact: "Deep-water bay serving the Venetian city of Chania.",
    coordinates: [24.0746, 35.4886],
    link: "#services",
    category: "Major",
  },
  {
    name: "Santorini",
    fact: "Dramatic caldera views and cliffside villages above the Aegean.",
    coordinates: [25.4325, 36.4150],
    link: "#services",
    category: "Major",
  },
  {
    name: "Katakolon",
    fact: "Gateway to ancient Olympia, birthplace of the Olympics.",
    coordinates: [21.3172, 37.6578],
    link: "#services",
    category: "Major",
  },
  {
    name: "Thessaloniki",
    fact: "Vibrant northern hub along the Thermaic Gulf promenade.",
    coordinates: [22.9447, 40.6401],
    link: "#services",
    category: "Major",
  },
  {
    name: "Volos",
    fact: "Seaside city and gateway to Mount Pelion.",
    coordinates: [22.9482, 39.3598],
    link: "#services",
    category: "Major",
  },
  {
    name: "Kavala",
    fact: "Amphitheatrical port city crowned by a Byzantine fortress.",
    coordinates: [24.4126, 40.9355],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Rhodes",
    fact: "Medieval Old Town and sun-drenched Dodecanese beaches.",
    coordinates: [28.2279, 36.4435],
    link: "#services",
    category: "Major",
  },
  {
    name: "Naxos",
    fact: "Largest Cyclades island with a Venetian castle and beaches.",
    coordinates: [25.3763, 37.1040],
    link: "#services",
    category: "Major",
  },
  {
    name: "Syros",
    fact: "Neoclassical Ermoupoli and refined Cycladic culture.",
    coordinates: [24.9432, 37.4446],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Kefalonia",
    fact: "Ionian island known for Myrtos Beach and limestone caves.",
    coordinates: [20.4893, 38.1754],
    link: "#services",
    category: "Major",
  },
  {
    name: "Zakynthos",
    fact: "Ionian island famed for Shipwreck Beach and sea caves.",
    coordinates: [20.8977, 37.7811],
    link: "#services",
    category: "Major",
  },
  {
    name: "Ithace",
    fact: "Legendary home of Odysseus with a tranquil harbor.",
    coordinates: [20.7200, 38.3664],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Kithira",
    fact: "Remote island between the Peloponnese and Crete.",
    coordinates: [23.0012, 36.2742],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Paxous",
    fact: "Small Ionian island with turquoise coves and olive groves.",
    coordinates: [20.1854, 39.2029],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Patmos",
    fact: "Dodecanese island of monasteries and sacred history.",
    coordinates: [26.5473, 37.3086],
    link: "#services",
    category: "Major",
  },
  {
    name: "Kos",
    fact: "Lively Dodecanese port with ancient Asklepieion roots.",
    coordinates: [27.2877, 36.8932],
    link: "#services",
    category: "Major",
  },
  {
    name: "Nisyros",
    fact: "Volcanic island with a walkable caldera.",
    coordinates: [27.1633, 36.6167],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Skiathos",
    fact: "Lush Sporades island with golden beaches.",
    coordinates: [23.4897, 39.1612],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Skopelos",
    fact: "Pine-clad Sporades island with classic harbors.",
    coordinates: [23.7287, 39.1210],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Sifnos",
    fact: "Cycladic island known for pottery and cuisine.",
    coordinates: [24.6974, 36.9730],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Serifos",
    fact: "Rugged Cyclades island with a hilltop Chora.",
    coordinates: [24.5212, 37.1484],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Spetses",
    fact: "Elegant Saronic island with neoclassical mansions.",
    coordinates: [23.1573, 37.2614],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Hydra",
    fact: "Car-free Saronic island of stone mansions and coves.",
    coordinates: [23.4667, 37.3499],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Aegina",
    fact: "Saronic island known for pistachios and the Temple of Aphaia.",
    coordinates: [23.4270, 37.7466],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Ios",
    fact: "Cycladic island with golden beaches and whitewashed lanes.",
    coordinates: [25.2827, 36.7231],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Amorgos",
    fact: "Dramatic cliffs and the cliffside Hozoviotissa Monastery.",
    coordinates: [25.8616, 36.8332],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Lemnos",
    fact: "North Aegean island with volcanic landscapes and beaches.",
    coordinates: [25.0627, 39.8780],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Thassos",
    fact: "Green north Aegean island with marble quarries.",
    coordinates: [24.7097, 40.7783],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Chios",
    fact: "North Aegean island famed for mastic villages.",
    coordinates: [26.1383, 38.3712],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Kalamata",
    fact: "Peloponnese port known for olives and a seaside promenade.",
    coordinates: [22.1142, 37.0379],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Nafplio",
    fact: "Romantic coastal town and the first capital of modern Greece.",
    coordinates: [22.8016, 37.5673],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Pylos",
    fact: "Historic bay near Navarino and the Old Fortress.",
    coordinates: [21.6962, 36.9124],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Gytheio",
    fact: "Laconian port with a neoclassical waterfront.",
    coordinates: [22.5650, 36.7550],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Monemvasia",
    fact: "Medieval fortress town carved into a massive sea rock.",
    coordinates: [23.0560, 36.6876],
    link: "#services",
    category: "Hidden Gem",
  },
  {
    name: "Igoumenitsa",
    fact: "Ionian gateway to Epirus and the Adriatic.",
    coordinates: [20.2650, 39.5030],
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

    const portsGeojson = buildPortsGeojson(ports);
    (map.getSource("ports") as mapboxgl.GeoJSONSource).setData(portsGeojson);
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

      const portsGeojson = buildPortsGeojson(ports);

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
        if (!popupEl) return;
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
        const geometry = feature.geometry;
        if (!geometry || geometry.type !== "Point") return;

        popup
          .setLngLat(geometry.coordinates as [number, number])
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
