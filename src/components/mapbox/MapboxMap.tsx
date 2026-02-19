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
  region: string;
};

type PortGeoProperties = {
  name: string;
  fact: string;
  link: string;
  category: Port["category"];
  region: string;
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
      region: port.region,
    },
    geometry: {
      type: "Point",
      coordinates: port.coordinates,
    },
  })),
});

type RouteGeoProperties = {
  from: string;
  to: string;
  laneType: "arterial" | "scenic";
  laneIndex: number;
};

type VesselGeoProperties = {
  laneType: RouteGeoProperties["laneType"];
};

type RouteFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.LineString,
  RouteGeoProperties
>;

type VesselFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.Point,
  VesselGeoProperties
>;

const EMPTY_ROUTE_GEOJSON: RouteFeatureCollection = {
  type: "FeatureCollection",
  features: [],
};

type SeaLaneDefinition = {
  from: string;
  to: string;
  via?: ReadonlyArray<[number, number]>;
};

const COMMON_TOUR_ROUTES: ReadonlyArray<SeaLaneDefinition> = [
  { from: "Piraeus", to: "Aegina", via: [[23.56, 37.84]] },
  { from: "Piraeus", to: "Syros", via: [[24.05, 37.82], [24.53, 37.64]] },
  { from: "Syros", to: "Mykonos", via: [[25.1, 37.5]] },
  { from: "Mykonos", to: "Paros", via: [[25.24, 37.23]] },
  { from: "Paros", to: "Naxos", via: [[25.26, 37.11]] },
  { from: "Naxos", to: "Ios", via: [[25.35, 36.91]] },
  { from: "Ios", to: "Santorini", via: [[25.4, 36.57]] },
  { from: "Piraeus", to: "Serifos", via: [[23.95, 37.45]] },
  { from: "Serifos", to: "Sifnos", via: [[24.59, 37.07]] },
  { from: "Sifnos", to: "Milos", via: [[24.57, 36.82]] },
  { from: "Milos", to: "Folegandros", via: [[24.72, 36.67]] },
  { from: "Santorini", to: "Heraklion", via: [[25.3, 35.88]] },
  {
    from: "Souda Bay (Chania)",
    to: "Heraklion",
    via: [[24.5, 35.44], [24.82, 35.41]],
  },
  {
    from: "Heraklion",
    to: "Agios Nikolaos",
    via: [[25.3, 35.41], [25.56, 35.37], [25.74, 35.27]],
  },
  { from: "Patmos", to: "Leros", via: [[26.72, 37.22]] },
  { from: "Leros", to: "Kos", via: [[27.01, 37.0]] },
  {
    from: "Kos",
    to: "Rhodes",
    via: [[27.48, 36.82], [27.78, 36.7], [28.02, 36.58]],
  },
  {
    from: "Rhodes",
    to: "Karpathos",
    via: [[27.98, 36.14], [27.72, 35.85], [27.45, 35.63]],
  },
  { from: "Karpathos", to: "Kasos", via: [[27.07, 35.46]] },
  { from: "Kasos", to: "Heraklion", via: [[26.22, 35.35]] },
  {
    from: "Rhodes",
    to: "Kastelorizo",
    via: [[28.62, 36.4], [29.03, 36.31]],
  },
  {
    from: "Corfu",
    to: "Paxos",
    via: [[19.79, 39.46], [19.89, 39.27], [20.07, 39.17]],
  },
  { from: "Corfu", to: "Igoumenitsa", via: [[20.07, 39.58]] },
  { from: "Paxos", to: "Lefkada", via: [[20.42, 38.99]] },
  { from: "Lefkada", to: "Ithaca", via: [[20.75, 38.58]] },
  { from: "Ithaca", to: "Kefalonia", via: [[20.6, 38.28]] },
  { from: "Kefalonia", to: "Zakynthos", via: [[20.66, 37.98]] },
  { from: "Katakolon", to: "Zakynthos", via: [[21.06, 37.72]] },
  {
    from: "Volos",
    to: "Skiathos",
    via: [[23.08, 39.18], [23.25, 39.05], [23.42, 39.11]],
  },
  { from: "Skiathos", to: "Skopelos", via: [[23.62, 39.14]] },
  {
    from: "Thessaloniki",
    to: "Kavala",
    via: [[23.12, 40.27], [23.74, 40.0], [24.22, 40.17], [24.44, 40.55]],
  },
  { from: "Kavala", to: "Thassos", via: [[24.56, 40.87]] },
  { from: "Chios", to: "Lesvos", via: [[26.37, 38.74]] },
  {
    from: "Lesvos",
    to: "Lemnos",
    via: [[26.2, 39.36], [25.73, 39.62], [25.36, 39.78]],
  },
  { from: "Lemnos", to: "Samothrace", via: [[25.32, 40.12]] },
  { from: "Hydra", to: "Spetses", via: [[23.28, 37.3]] },
  { from: "Spetses", to: "Nafplio", via: [[23.0, 37.45]] },
  {
    from: "Nafplio",
    to: "Monemvasia",
    via: [[23.1, 37.18], [23.24, 36.86]],
  },
  {
    from: "Kalamata",
    to: "Pylos",
    via: [[21.97, 36.83], [21.8, 36.84]],
  },
  { from: "Astypalaia", to: "Nisyros", via: [[26.65, 36.58]] },
  { from: "Nisyros", to: "Kos", via: [[27.21, 36.72]] },
];

const ROUTE_DASH_SEQUENCE: ReadonlyArray<[number, number, number]> = [
  [0, 4, 3],
  [0.5, 4, 2.5],
  [1, 4, 2],
  [1.5, 4, 1.5],
  [2, 4, 1],
  [2.5, 4, 0.5],
  [3, 4, 0],
];

const smoothRouteCoordinates = (
  coordinates: [number, number][],
  iterations = 2
): [number, number][] => {
  if (coordinates.length < 3 || iterations < 1) return [...coordinates];

  let smoothedCoordinates = [...coordinates];

  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const nextCoordinates: [number, number][] = [smoothedCoordinates[0]];
    for (
      let coordinateIndex = 0;
      coordinateIndex < smoothedCoordinates.length - 1;
      coordinateIndex += 1
    ) {
      const [startLng, startLat] = smoothedCoordinates[coordinateIndex];
      const [endLng, endLat] = smoothedCoordinates[coordinateIndex + 1];

      nextCoordinates.push([
        startLng * 0.75 + endLng * 0.25,
        startLat * 0.75 + endLat * 0.25,
      ]);
      nextCoordinates.push([
        startLng * 0.25 + endLng * 0.75,
        startLat * 0.25 + endLat * 0.75,
      ]);
    }
    nextCoordinates.push(smoothedCoordinates[smoothedCoordinates.length - 1]);
    smoothedCoordinates = nextCoordinates;
  }

  return smoothedCoordinates;
};

const interpolateAlongLine = (
  coordinates: [number, number][],
  progress: number
): [number, number] => {
  if (coordinates.length === 0) return [0, 0];
  if (coordinates.length === 1) return coordinates[0];

  const normalizedProgress = ((progress % 1) + 1) % 1;
  const segmentLengths: number[] = [];
  let totalLength = 0;

  for (let index = 0; index < coordinates.length - 1; index += 1) {
    const [startLng, startLat] = coordinates[index];
    const [endLng, endLat] = coordinates[index + 1];
    const segmentLength = Math.hypot(endLng - startLng, endLat - startLat);
    segmentLengths.push(segmentLength);
    totalLength += segmentLength;
  }

  if (totalLength === 0) return coordinates[0];

  let remainingLength = normalizedProgress * totalLength;

  for (let index = 0; index < segmentLengths.length; index += 1) {
    const segmentLength = segmentLengths[index];
    if (remainingLength <= segmentLength || index === segmentLengths.length - 1) {
      const segmentRatio = segmentLength === 0 ? 0 : remainingLength / segmentLength;
      const [startLng, startLat] = coordinates[index];
      const [endLng, endLat] = coordinates[index + 1];
      return [
        startLng + (endLng - startLng) * segmentRatio,
        startLat + (endLat - startLat) * segmentRatio,
      ];
    }
    remainingLength -= segmentLength;
  }

  return coordinates[coordinates.length - 1];
};

const buildRoutesGeojson = (ports: Port[]): RouteFeatureCollection => {
  const portsByName = new Map(ports.map((port) => [port.name, port] as const));
  const features: RouteFeatureCollection["features"] = [];

  COMMON_TOUR_ROUTES.forEach((route, laneIndex) => {
    const { from, to, via = [] } = route;
    const fromPort = portsByName.get(from);
    const toPort = portsByName.get(to);
    if (!fromPort || !toPort) return;

    const routeAnchors: [number, number][] = [
      fromPort.coordinates,
      ...via,
      toPort.coordinates,
    ];

    features.push({
      type: "Feature",
      id: `${from}-${to}`,
      properties: {
        from,
        to,
        laneType:
          fromPort.category === "Major" && toPort.category === "Major"
            ? "arterial"
            : "scenic",
        laneIndex,
      },
      geometry: {
        type: "LineString",
        coordinates: smoothRouteCoordinates(routeAnchors),
      },
    });
  });

  return {
    type: "FeatureCollection",
    features,
  };
};

const buildVesselGeojson = (
  routesGeojson: RouteFeatureCollection,
  timestampSeconds: number
): VesselFeatureCollection => {
  const features: VesselFeatureCollection["features"] = [];

  routesGeojson.features.forEach((route, index) => {
    const laneSpeed = route.properties.laneType === "arterial" ? 0.09 : 0.06;
    const coordinates = route.geometry.coordinates as [number, number][];
    const forwardProgress = (timestampSeconds * laneSpeed + index * 0.19) % 1;

    features.push({
      type: "Feature",
      id: `${String(route.id)}-forward`,
      properties: {
        laneType: route.properties.laneType,
      },
      geometry: {
        type: "Point",
        coordinates: interpolateAlongLine(coordinates, forwardProgress),
      },
    });

    if (route.properties.laneType === "arterial") {
      const reverseProgress =
        (1 - ((timestampSeconds * laneSpeed * 0.82 + index * 0.31) % 1)) % 1;
      features.push({
        type: "Feature",
        id: `${String(route.id)}-reverse`,
        properties: {
          laneType: route.properties.laneType,
        },
        geometry: {
          type: "Point",
          coordinates: interpolateAlongLine(coordinates, reverseProgress),
        },
      });
    }
  });

  return {
    type: "FeatureCollection",
    features,
  };
};

export const PORTS: Port[] = [
  {
    name: "Piraeus",
    fact: "Greece’s largest port and the main gateway to Athens.",
    coordinates: [23.6441, 37.9429],
    link: "#services",
    category: "Major",
    region: "Attica",
  },
  {
    name: "Mykonos",
    fact: "Cosmopolitan Cycladic port with iconic windmills and alleys.",
    coordinates: [25.3264, 37.4465],
    link: "#services",
    category: "Major",
    region: "Cyclades",
  },
  {
    name: "Paros",
    fact: "Cycladic harbor famed for Parikia and white-sand beaches.",
    coordinates: [25.1506, 37.0842],
    link: "#services",
    category: "Hidden Gem",
    region: "Cyclades",
  },
  {
    name: "Milos",
    fact: "Volcanic island known for its lunar landscapes and Sarakiniko beach.",
    coordinates: [24.4467, 36.7267],
    link: "#services",
    category: "Hidden Gem",
    region: "Cyclades",
  },
  {
    name: "Folegandros",
    fact: "Quiet Cycladic isle with a cliffside Chora and serene coves.",
    coordinates: [24.9542, 36.6271],
    link: "#services",
    category: "Hidden Gem",
    region: "Cyclades",
  },
  {
    name: "Corfu",
    fact: "Ionian gem with Venetian fortresses and emerald bays.",
    coordinates: [19.9192, 39.6243],
    link: "#services",
    category: "Major",
    region: "Ionian",
  },
  {
    name: "Heraklion",
    fact: "Crete’s capital, minutes from the Palace of Knossos.",
    coordinates: [25.1326, 35.3394],
    link: "#services",
    category: "Major",
    region: "Crete",
  },
  {
    name: "Souda Bay (Chania)",
    fact: "Deep-water bay serving the Venetian city of Chania.",
    coordinates: [24.0746, 35.4886],
    link: "#services",
    category: "Major",
    region: "Crete",
  },
  {
    name: "Agios Nikolaos",
    fact: "Elegant Cretan harbor town set on Mirabello Bay.",
    coordinates: [25.7160, 35.1910],
    link: "#services",
    category: "Major",
    region: "Crete",
  },
  {
    name: "Santorini",
    fact: "Dramatic caldera views and cliffside villages above the Aegean.",
    coordinates: [25.4325, 36.4150],
    link: "#services",
    category: "Major",
    region: "Cyclades",
  },
  {
    name: "Katakolon",
    fact: "Gateway to ancient Olympia, birthplace of the Olympics.",
    coordinates: [21.3172, 37.6578],
    link: "#services",
    category: "Major",
    region: "Peloponnese",
  },
  {
    name: "Thessaloniki",
    fact: "Vibrant northern hub along the Thermaic Gulf promenade.",
    coordinates: [22.9447, 40.6401],
    link: "#services",
    category: "Major",
    region: "Macedonia",
  },
  {
    name: "Volos",
    fact: "Seaside city and gateway to Mount Pelion.",
    coordinates: [22.9482, 39.3598],
    link: "#services",
    category: "Major",
    region: "Thessaly",
  },
  {
    name: "Kavala",
    fact: "Amphitheatrical port city crowned by a Byzantine fortress.",
    coordinates: [24.4126, 40.9355],
    link: "#services",
    category: "Hidden Gem",
    region: "Macedonia",
  },
  {
    name: "Rhodes",
    fact: "Medieval Old Town and sun-drenched Dodecanese beaches.",
    coordinates: [28.2279, 36.4435],
    link: "#services",
    category: "Major",
    region: "Dodecanese",
  },
  {
    name: "Naxos",
    fact: "Largest Cyclades island with a Venetian castle and beaches.",
    coordinates: [25.3763, 37.1040],
    link: "#services",
    category: "Major",
    region: "Cyclades",
  },
  {
    name: "Syros",
    fact: "Neoclassical Ermoupoli and refined Cycladic culture.",
    coordinates: [24.9432, 37.4446],
    link: "#services",
    category: "Hidden Gem",
    region: "Cyclades",
  },
  {
    name: "Kefalonia",
    fact: "Ionian island known for Myrtos Beach and limestone caves.",
    coordinates: [20.4893, 38.1754],
    link: "#services",
    category: "Major",
    region: "Ionian",
  },
  {
    name: "Zakynthos",
    fact: "Ionian island famed for Shipwreck Beach and sea caves.",
    coordinates: [20.8977, 37.7811],
    link: "#services",
    category: "Major",
    region: "Ionian",
  },
  {
    name: "Lefkada",
    fact: "Ionian island gateway known for turquoise beaches and sailing routes.",
    coordinates: [20.7100, 38.8300],
    link: "#services",
    category: "Hidden Gem",
    region: "Ionian",
  },
  {
    name: "Ithaca",
    fact: "Legendary home of Odysseus with a tranquil harbor.",
    coordinates: [20.7200, 38.3664],
    link: "#services",
    category: "Hidden Gem",
    region: "Ionian",
  },
  {
    name: "Kithira",
    fact: "Remote island between the Peloponnese and Crete.",
    coordinates: [23.0012, 36.2742],
    link: "#services",
    category: "Hidden Gem",
    region: "Peloponnese",
  },
  {
    name: "Paxos",
    fact: "Small Ionian island with turquoise coves and olive groves.",
    coordinates: [20.1854, 39.2029],
    link: "#services",
    category: "Hidden Gem",
    region: "Ionian",
  },
  {
    name: "Patmos",
    fact: "Dodecanese island of monasteries and sacred history.",
    coordinates: [26.5473, 37.3086],
    link: "#services",
    category: "Major",
    region: "Dodecanese",
  },
  {
    name: "Kos",
    fact: "Lively Dodecanese port with ancient Asklepieion roots.",
    coordinates: [27.2877, 36.8932],
    link: "#services",
    category: "Major",
    region: "Dodecanese",
  },
  {
    name: "Kalymnos",
    fact: "Dodecanese island recognized for sponge-diving heritage.",
    coordinates: [26.9811, 36.9513],
    link: "#services",
    category: "Hidden Gem",
    region: "Dodecanese",
  },
  {
    name: "Leros",
    fact: "Calm Dodecanese harbor with neoclassical and naval history.",
    coordinates: [26.8531, 37.1408],
    link: "#services",
    category: "Hidden Gem",
    region: "Dodecanese",
  },
  {
    name: "Astypalaia",
    fact: "Butterfly-shaped island with a whitewashed hilltop Chora.",
    coordinates: [26.3520, 36.5480],
    link: "#services",
    category: "Hidden Gem",
    region: "Dodecanese",
  },
  {
    name: "Nisyros",
    fact: "Volcanic island with a walkable caldera.",
    coordinates: [27.1633, 36.6167],
    link: "#services",
    category: "Hidden Gem",
    region: "Dodecanese",
  },
  {
    name: "Karpathos",
    fact: "Southern Aegean island blending mountain villages and beaches.",
    coordinates: [27.2280, 35.5090],
    link: "#services",
    category: "Hidden Gem",
    region: "Dodecanese",
  },
  {
    name: "Kasos",
    fact: "Small Dodecanese island with an authentic maritime character.",
    coordinates: [26.9197, 35.4225],
    link: "#services",
    category: "Hidden Gem",
    region: "Dodecanese",
  },
  {
    name: "Kastelorizo",
    fact: "Far-eastern Greek island known for its colorful waterfront.",
    coordinates: [29.5904, 36.1483],
    link: "#services",
    category: "Hidden Gem",
    region: "Dodecanese",
  },
  {
    name: "Skiathos",
    fact: "Lush Sporades island with golden beaches.",
    coordinates: [23.4897, 39.1612],
    link: "#services",
    category: "Hidden Gem",
    region: "Sporades",
  },
  {
    name: "Skopelos",
    fact: "Pine-clad Sporades island with classic harbors.",
    coordinates: [23.7287, 39.1210],
    link: "#services",
    category: "Hidden Gem",
    region: "Sporades",
  },
  {
    name: "Sifnos",
    fact: "Cycladic island known for pottery and cuisine.",
    coordinates: [24.6974, 36.9730],
    link: "#services",
    category: "Hidden Gem",
    region: "Cyclades",
  },
  {
    name: "Serifos",
    fact: "Rugged Cyclades island with a hilltop Chora.",
    coordinates: [24.5212, 37.1484],
    link: "#services",
    category: "Hidden Gem",
    region: "Cyclades",
  },
  {
    name: "Spetses",
    fact: "Elegant Saronic island with neoclassical mansions.",
    coordinates: [23.1573, 37.2614],
    link: "#services",
    category: "Hidden Gem",
    region: "Saronic",
  },
  {
    name: "Hydra",
    fact: "Car-free Saronic island of stone mansions and coves.",
    coordinates: [23.4667, 37.3499],
    link: "#services",
    category: "Hidden Gem",
    region: "Saronic",
  },
  {
    name: "Aegina",
    fact: "Saronic island known for pistachios and the Temple of Aphaia.",
    coordinates: [23.4270, 37.7466],
    link: "#services",
    category: "Hidden Gem",
    region: "Saronic",
  },
  {
    name: "Ios",
    fact: "Cycladic island with golden beaches and whitewashed lanes.",
    coordinates: [25.2827, 36.7231],
    link: "#services",
    category: "Hidden Gem",
    region: "Cyclades",
  },
  {
    name: "Amorgos",
    fact: "Dramatic cliffs and the cliffside Hozoviotissa Monastery.",
    coordinates: [25.8616, 36.8332],
    link: "#services",
    category: "Hidden Gem",
    region: "Cyclades",
  },
  {
    name: "Lemnos",
    fact: "North Aegean island with volcanic landscapes and beaches.",
    coordinates: [25.0627, 39.8780],
    link: "#services",
    category: "Hidden Gem",
    region: "North Aegean",
  },
  {
    name: "Thassos",
    fact: "Green north Aegean island with marble quarries.",
    coordinates: [24.7097, 40.7783],
    link: "#services",
    category: "Hidden Gem",
    region: "North Aegean",
  },
  {
    name: "Chios",
    fact: "North Aegean island famed for mastic villages.",
    coordinates: [26.1383, 38.3712],
    link: "#services",
    category: "Hidden Gem",
    region: "North Aegean",
  },
  {
    name: "Ikaria",
    fact: "North Aegean island famed for longevity and laid-back rhythm.",
    coordinates: [26.2945, 37.6130],
    link: "#services",
    category: "Hidden Gem",
    region: "North Aegean",
  },
  {
    name: "Lesvos",
    fact: "North Aegean island centered on the historic port of Mytilene.",
    coordinates: [26.5552, 39.1060],
    link: "#services",
    category: "Hidden Gem",
    region: "North Aegean",
  },
  {
    name: "Samothrace",
    fact: "Dramatic north Aegean island with rugged peaks and waterfalls.",
    coordinates: [25.4690, 40.4720],
    link: "#services",
    category: "Hidden Gem",
    region: "North Aegean",
  },
  {
    name: "Itea",
    fact: "Gateway port to Delphi on the Gulf of Corinth.",
    coordinates: [22.4220, 38.4340],
    link: "#services",
    category: "Hidden Gem",
    region: "Central Greece",
  },
  {
    name: "Kalamata",
    fact: "Peloponnese port known for olives and a seaside promenade.",
    coordinates: [22.1142, 37.0379],
    link: "#services",
    category: "Hidden Gem",
    region: "Peloponnese",
  },
  {
    name: "Nafplio",
    fact: "Romantic coastal town and the first capital of modern Greece.",
    coordinates: [22.8016, 37.5673],
    link: "#services",
    category: "Hidden Gem",
    region: "Peloponnese",
  },
  {
    name: "Pylos",
    fact: "Historic bay near Navarino and the Old Fortress.",
    coordinates: [21.6962, 36.9124],
    link: "#services",
    category: "Hidden Gem",
    region: "Peloponnese",
  },
  {
    name: "Gytheio",
    fact: "Laconian port with a neoclassical waterfront.",
    coordinates: [22.5650, 36.7550],
    link: "#services",
    category: "Hidden Gem",
    region: "Peloponnese",
  },
  {
    name: "Monemvasia",
    fact: "Medieval fortress town carved into a massive sea rock.",
    coordinates: [23.0560, 36.6876],
    link: "#services",
    category: "Hidden Gem",
    region: "Peloponnese",
  },
  {
    name: "Igoumenitsa",
    fact: "Ionian gateway to Epirus and the Adriatic.",
    coordinates: [20.2650, 39.5030],
    link: "#services",
    category: "Hidden Gem",
    region: "Epirus",
  },
];

type MapboxMapProps = {
  className?: string;
  ports?: Port[];
};

export function MapboxMap({ className, ports = PORTS }: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const routesGeojsonRef = useRef<RouteFeatureCollection>(EMPTY_ROUTE_GEOJSON);
  const latestPortsRef = useRef<Port[]>(ports);

  useEffect(() => {
    latestPortsRef.current = ports;
  }, [ports]);

  // Update map source when ports prop changes
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const routesGeojson = buildRoutesGeojson(ports);
    routesGeojsonRef.current = routesGeojson;

    if (!map.getSource("ports")) return;

    const portsGeojson = buildPortsGeojson(ports);
    (map.getSource("ports") as mapboxgl.GeoJSONSource).setData(portsGeojson);

    const routesSource = map.getSource("routes") as mapboxgl.GeoJSONSource | undefined;
    if (routesSource) {
      routesSource.setData(routesGeojson);
    }

    const vesselsSource = map.getSource("route-vessels") as
      | mapboxgl.GeoJSONSource
      | undefined;
    if (vesselsSource) {
      vesselsSource.setData(
        buildVesselGeojson(routesGeojson, performance.now() / 1000)
      );
    }
  }, [ports]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    let animationFrame: number | null = null;
    let dashFrameIndex = 0;
    let lastDashUpdate = 0;

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

      const currentPorts = latestPortsRef.current;
      const portsGeojson = buildPortsGeojson(currentPorts);
      routesGeojsonRef.current = buildRoutesGeojson(currentPorts);

      map.addSource("ports", {
        type: "geojson",
        data: portsGeojson,
      });

      map.addSource("routes", {
        type: "geojson",
        data: routesGeojsonRef.current,
        lineMetrics: true,
      });

      map.addSource("route-vessels", {
        type: "geojson",
        data: buildVesselGeojson(routesGeojsonRef.current, 0),
      });

      map.addLayer({
        id: "routes-glow",
        type: "line",
        source: "routes",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": [
            "match",
            ["get", "laneType"],
            "arterial",
            "rgba(81, 210, 198, 0.36)",
            "rgba(255, 183, 77, 0.28)",
          ],
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            2.8,
            8,
            8.6,
          ],
          "line-opacity": 0.8,
          "line-blur": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            0.9,
            8,
            2.2,
          ],
        },
      });

      map.addLayer({
        id: "routes-base",
        type: "line",
        source: "routes",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "rgba(8, 31, 46, 0.45)",
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            1.1,
            8,
            2.8,
          ],
          "line-opacity": 0.5,
        },
      });

      map.addLayer({
        id: "routes-flow",
        type: "line",
        source: "routes",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            1.6,
            8,
            3.4,
          ],
          "line-gradient": [
            "interpolate",
            ["linear"],
            ["line-progress"],
            0,
            "rgba(255, 255, 255, 0)",
            0.2,
            "rgba(255, 255, 255, 0.35)",
            0.45,
            "rgba(81, 210, 198, 0.9)",
            0.75,
            "rgba(255, 183, 77, 0.85)",
            1,
            "rgba(255, 255, 255, 0)",
          ],
          "line-dasharray": ROUTE_DASH_SEQUENCE[0],
          "line-opacity": 0.95,
        },
      });

      map.addLayer({
        id: "route-vessels-glow",
        type: "circle",
        source: "route-vessels",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            4.5,
            8,
            7.5,
          ],
          "circle-color": [
            "match",
            ["get", "laneType"],
            "arterial",
            "rgba(81, 210, 198, 0.72)",
            "rgba(255, 183, 77, 0.68)",
          ],
          "circle-opacity": 0.58,
          "circle-blur": 0.8,
        },
      });

      map.addLayer({
        id: "route-vessels",
        type: "circle",
        source: "route-vessels",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            2.1,
            8,
            3.9,
          ],
          "circle-color": "rgba(248, 254, 255, 0.95)",
          "circle-stroke-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            0.7,
            8,
            1.3,
          ],
          "circle-stroke-color": [
            "match",
            ["get", "laneType"],
            "arterial",
            "#51d2c6",
            "#ffb74d",
          ],
          "circle-opacity": 0.98,
        },
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

      const animateSeaLanes = (timestamp: number) => {
        const currentMap = mapRef.current;
        if (!currentMap) return;

        const vesselsSource = currentMap.getSource("route-vessels") as
          | mapboxgl.GeoJSONSource
          | undefined;
        if (vesselsSource) {
          vesselsSource.setData(
            buildVesselGeojson(routesGeojsonRef.current, timestamp / 1000)
          );
        }

        if (
          timestamp - lastDashUpdate >= 90 &&
          currentMap.getLayer("routes-flow")
        ) {
          dashFrameIndex = (dashFrameIndex + 1) % ROUTE_DASH_SEQUENCE.length;
          currentMap.setPaintProperty(
            "routes-flow",
            "line-dasharray",
            ROUTE_DASH_SEQUENCE[dashFrameIndex]
          );
          lastDashUpdate = timestamp;
        }

        animationFrame = window.requestAnimationFrame(animateSeaLanes);
      };

      animationFrame = window.requestAnimationFrame(animateSeaLanes);

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
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      map.remove();
      mapRef.current = null;
    };
  }, [ports]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Map of Greece"
      className={cn("h-full w-full", className)}
    />
  );
}
