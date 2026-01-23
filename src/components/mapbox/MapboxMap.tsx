"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { cn } from "@/lib/utils";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const MAP_STYLE = "mapbox://styles/onepunchmob/cmjizdqe8005p01sdgkrrh27g";
const MAP_CENTER: [number, number] = [22.5, 38.0];
const MAP_ZOOM = 5.1;

const PORTS = [
  {
    name: "Piraeus",
    fact: "Greece’s largest port and the main gateway to Athens.",
    coordinates: [23.6441, 37.9429],
    link: "#services",
  },
  {
    name: "Thessaloniki",
    fact: "A vibrant northern hub known for its seafront promenade.",
    coordinates: [22.9447, 40.634],
    link: "#services",
  },
  {
    name: "Heraklion",
    fact: "Crete’s capital, minutes from the Palace of Knossos.",
    coordinates: [25.1326, 35.3394],
    link: "#services",
  },
  {
    name: "Chania (Souda Bay)",
    fact: "A deep-water harbor serving one of Crete’s most charming cities.",
    coordinates: [24.0746, 35.489],
    link: "#services",
  },
  {
    name: "Santorini (Thira)",
    fact: "Iconic caldera views and cliffside villages above the Aegean.",
    coordinates: [25.4325, 36.415],
    link: "#services",
  },
  {
    name: "Mykonos",
    fact: "Stylish Cycladic island famed for its whitewashed lanes.",
    coordinates: [25.3264, 37.4465],
    link: "#services",
  },
  {
    name: "Rhodes",
    fact: "Medieval Old Town and sun-drenched beaches in the Dodecanese.",
    coordinates: [28.2279, 36.4435],
    link: "#services",
  },
  {
    name: "Corfu",
    fact: "Ionian gem with Venetian architecture and emerald bays.",
    coordinates: [19.82, 39.6239],
    link: "#services",
  },
  {
    name: "Patras",
    fact: "Major western port linking the Peloponnese to Italy.",
    coordinates: [21.7348, 38.2455],
    link: "#services",
  },
  {
    name: "Volos",
    fact: "Gateway to Mount Pelion and the legendary Argonauts.",
    coordinates: [22.9482, 39.3598],
    link: "#services",
  },
  {
    name: "Kavala",
    fact: "Amphitheatrical port city crowned by a Byzantine fortress.",
    coordinates: [24.4126, 40.9355],
    link: "#services",
  },
  {
    name: "Katakolon",
    fact: "Port of call for ancient Olympia, birthplace of the Olympics.",
    coordinates: [21.3172, 37.6578],
    link: "#services",
  },
];

type MapboxMapProps = {
  className?: string;
};

export function MapboxMap({ className }: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

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
        features: PORTS.map((port) => ({
          type: "Feature",
          id: port.name,
          properties: {
            name: port.name,
            fact: port.fact,
            link: port.link,
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
          "circle-color": "rgba(81, 210, 198, 0.35)",
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
            "#51d2c6",
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
            "#51d2c6",
            "rgba(255, 255, 255, 0.9)",
          ],
        },
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 18,
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
        const { name, fact, link } = feature.properties as {
          name: string;
          fact: string;
          link: string;
        };

        popup
          .setLngLat(feature.geometry.coordinates as [number, number])
          .setHTML(
            `<div class="map-popup-content">
              <p class="map-popup-title">${name}</p>
              <p class="map-popup-fact">${fact}</p>
              <a class="map-popup-link" href="${link}">View experiences</a>
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

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    map.scrollZoom.disable();
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Map of Greece"
      className={cn("h-full w-full", className)}
    />
  );
}
