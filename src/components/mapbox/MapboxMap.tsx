"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { PORTS, type Port } from "@/lib/ports";
import { cn } from "@/lib/utils";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const MAP_STYLE = "mapbox://styles/onepunchmob/cmjizdqe8005p01sdgkrrh27g";
const MAP_CENTER: [number, number] = [23.5, 38.0];
const MAP_ZOOM = 5.2;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const PIRAEUS_COORDS: [number, number] = [23.6441, 37.9429];

// Map port regions to scrollytelling region groups
const REGION_GROUP_MAP: Record<string, string> = {
  Cyclades: "Cyclades",
  Crete: "Crete",
  Dodecanese: "Dodecanese",
  Ionian: "Ionian",
  Epirus: "Ionian",
  Attica: "Mainland",
  Macedonia: "Mainland",
  Thessaly: "Mainland",
  Sporades: "Mainland",
  "North Aegean": "Mainland",
  "Central Greece": "Mainland",
  Peloponnese: "Mainland",
  Saronic: "Mainland",
};

const DISCOVER_GROUP_TO_PORT_REGIONS: Record<string, string[]> = {
  Cyclades: ["Cyclades"],
  Crete: ["Crete"],
  Dodecanese: ["Dodecanese"],
  Ionian: ["Ionian", "Epirus"],
  Mainland: [
    "Attica",
    "Macedonia",
    "Thessaly",
    "Sporades",
    "North Aegean",
    "Central Greece",
    "Peloponnese",
    "Saronic",
  ],
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
  progress: number,
  loop = true
): [number, number] => {
  if (coordinates.length === 0) return [0, 0];
  if (coordinates.length === 1) return coordinates[0];

  const normalizedProgress = loop
    ? ((progress % 1) + 1) % 1
    : clamp01(progress);
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

const MAJOR_PORT_EMOJI_FALLBACK = [
  "\u{1F30A}",      // wave
  "\u{2600}\uFE0F", // sun
  "\u{26F5}",       // sailboat
  "\u{1F9ED}",      // compass
  "\u{1F60E}",      // sunglasses face
];

const HIDDEN_GEM_PORT_EMOJI_FALLBACK = [
  "\u{1F3D6}\uFE0F", // beach with umbrella
  "\u{1F334}",       // palm tree
  "\u{1F30A}",       // wave
  "\u{1F34B}",       // lemon
  "\u{1F347}",       // grapes
  "\u{1F60E}",       // sunglasses face
];

const PORT_EMOJI_OVERRIDES: Record<string, string[]> = {
  Milos: [
    "\u{2764}\uFE0F",
    "\u{1F496}",
    "\u{1F970}",
  ],
  Santorini: [
    "\u{1F305}",
    "\u{1F377}",
    "\u{2764}\uFE0F",
  ],
  Mykonos: [
    "\u{1F389}",
    "\u{1F60E}",
    "\u{1F334}",
  ],
  Corfu: [
    "\u{1F3F0}",
    "\u{1F334}",
    "\u{1F30A}",
  ],
  Rhodes: [
    "\u{1F3F0}",
    "\u{2600}\uFE0F",
    "\u{1F3D6}\uFE0F",
  ],
  Hydra: [
    "\u{1F434}",
    "\u{1F6A4}",
    "\u{1F30A}",
  ],
  Zakynthos: [
    "\u{1F422}",
    "\u{1F30A}",
    "\u{1F3D6}\uFE0F",
  ],
  Patmos: [
    "\u{26EA}",
    "\u{1F9ED}",
    "\u{2600}\uFE0F",
  ],
  Nisyros: [
    "\u{1F30B}",
    "\u{26F0}\uFE0F",
    "\u{2600}\uFE0F",
  ],
  Kalamata: [
    "\u{1F377}",
    "\u{1F347}",
    "\u{1F34B}",
  ],
  Aegina: [
    "\u{1F3DB}\uFE0F",
    "\u{2600}\uFE0F",
    "\u{1F347}",
  ],
  Nafplio: [
    "\u{2764}\uFE0F",
    "\u{1F3F0}",
    "\u{1F305}",
  ],
  Monemvasia: [
    "\u{1F3F0}",
    "\u{1F305}",
    "\u{1F377}",
  ],
};

const FACT_EMOJI_RULES: Array<{ pattern: RegExp; emojis: string[] }> = [
  {
    pattern: /(volcanic|caldera|lunar)/i,
    emojis: ["\u{1F30B}", "\u{1F305}", "\u{26F0}\uFE0F"],
  },
  {
    pattern: /(beach|beaches|bay|bays|coves|harbor|waterfront|promenade|gulf|seaside|turquoise)/i,
    emojis: ["\u{1F3D6}\uFE0F", "\u{1F30A}", "\u{26F5}"],
  },
  {
    pattern: /(medieval|fortress|castle|venetian|mansions|old town|byzantine)/i,
    emojis: ["\u{1F3F0}", "\u{1F3DB}\uFE0F", "\u{1F3A8}"],
  },
  {
    pattern: /(ancient|olympia|delphi|knossos|asklepieion|temple|history)/i,
    emojis: ["\u{1F3DB}\uFE0F", "\u{1F9ED}", "\u{1F3AF}"],
  },
  {
    pattern: /(monaster|sacred)/i,
    emojis: ["\u{26EA}", "\u{1F9ED}", "\u{2600}\uFE0F"],
  },
  {
    pattern: /(cuisine|wine|olives|olive|pistachios|mastic)/i,
    emojis: ["\u{1F377}", "\u{1F347}", "\u{1F34B}"],
  },
  {
    pattern: /(longevity|laid-back|tranquil|quiet|serene)/i,
    emojis: ["\u{1F60E}", "\u{1F334}", "\u{2600}\uFE0F"],
  },
  {
    pattern: /(mount|cliffs|rugged|peaks|hilltop|mountain)/i,
    emojis: ["\u{26F0}\uFE0F", "\u{1F305}", "\u{1F9ED}"],
  },
  {
    pattern: /(maritime|sailing|gateway|adriatic|port)/i,
    emojis: ["\u{2693}\uFE0F", "\u{26F5}", "\u{1F9ED}"],
  },
];

const getPortEmojiPool = (port: Port): string[] => {
  const override = PORT_EMOJI_OVERRIDES[port.name];
  if (override && override.length > 0) {
    return override;
  }

  const contextual = FACT_EMOJI_RULES.flatMap((rule) =>
    rule.pattern.test(port.fact) ? rule.emojis : []
  );
  const fallback =
    port.category === "Major"
      ? MAJOR_PORT_EMOJI_FALLBACK
      : HIDDEN_GEM_PORT_EMOJI_FALLBACK;

  const deduped = [...new Set([...contextual, ...fallback])];
  return deduped.length > 0 ? deduped : HIDDEN_GEM_PORT_EMOJI_FALLBACK;
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

type MapboxMapProps = {
  className?: string;
  ports?: Port[];
  animated?: boolean;
  activeRegion?: string | null;
  showShip?: boolean;
};

export function MapboxMap({
  className,
  ports = PORTS,
  animated = false,
  activeRegion,
  showShip = animated,
}: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const routesGeojsonRef = useRef<RouteFeatureCollection>(EMPTY_ROUTE_GEOJSON);
  const portsTransitionFrameRef = useRef<number | null>(null);
  const latestPortsRef = useRef<Port[]>(ports);
  const revealStartRef = useRef<number | null>(null);
  const revealCompleteRef = useRef(false);
  const animatedRef = useRef(animated);
  const showShipRef = useRef(showShip);
  const routesRevisionRef = useRef(0);
  const prevRegionRef = useRef<string | null | undefined>(activeRegion);
  const hasReceivedRegionRef = useRef(false);

  useEffect(() => {
    latestPortsRef.current = ports;
    routesRevisionRef.current += 1;
  }, [ports]);

  useEffect(() => {
    showShipRef.current = showShip;
  }, [showShip]);

  // Region filtering effect — only runs when activeRegion actually changes (not on mount)
  useEffect(() => {
    // Skip the very first render
    if (!hasReceivedRegionRef.current) {
      hasReceivedRegionRef.current = true;
      prevRegionRef.current = activeRegion;
      return;
    }

    // Skip if value hasn't actually changed
    if (activeRegion === prevRegionRef.current) return;
    prevRegionRef.current = activeRegion;

    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // Filter visible ports to the active discover region (and reset when inactive)
    const portLayerFilter =
      activeRegion && DISCOVER_GROUP_TO_PORT_REGIONS[activeRegion]
        ? ([
            "in",
            ["get", "region"],
            ["literal", DISCOVER_GROUP_TO_PORT_REGIONS[activeRegion]],
          ] as unknown as mapboxgl.FilterSpecification)
        : null;

    (["ports-glow", "ports"] as const).forEach((layerId) => {
      if (!map.getLayer(layerId)) return;
      map.setFilter(layerId, portLayerFilter);
    });

    // Dim/undim ports based on region
    const portsSource = map.getSource("ports");
    if (!portsSource) return;
    const currentPorts = latestPortsRef.current;
    currentPorts.forEach((port) => {
      const group = REGION_GROUP_MAP[port.region] || "Mainland";
      const dimmed = activeRegion ? group !== activeRegion : false;
      map.setFeatureState(
        { source: "ports", id: port.name },
        { dimmed }
      );
    });
  }, [activeRegion]);

  // Update map source when ports prop changes
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const routesGeojson = buildRoutesGeojson(ports);
    routesGeojsonRef.current = routesGeojson;

    if (!map.getSource("ports")) return;

    if (portsTransitionFrameRef.current !== null) {
      window.cancelAnimationFrame(portsTransitionFrameRef.current);
      portsTransitionFrameRef.current = null;
    }

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

    // Smoothly fade updated route/port items so data swaps feel intentional.
    const routeFeatureIds = routesGeojson.features
      .map((feature) => feature.id)
      .filter((id): id is string | number => id !== undefined && id !== null);
    const portIds = ports.map((port) => port.name);

    routeFeatureIds.forEach((id) => {
      map.setFeatureState({ source: "routes", id }, { revealProgress: 0 });
    });
    portIds.forEach((id) => {
      map.setFeatureState({ source: "ports", id }, { revealProgress: 0 });
    });

    const transitionStart = performance.now();
    const TRANSITION_DURATION_MS = 320;
    const animateItemsIn = (timestamp: number) => {
      const t = clamp01((timestamp - transitionStart) / TRANSITION_DURATION_MS);
      const progress = easeOutCubic(t);

      routeFeatureIds.forEach((id) => {
        map.setFeatureState({ source: "routes", id }, { revealProgress: progress });
      });
      portIds.forEach((id) => {
        map.setFeatureState({ source: "ports", id }, { revealProgress: progress });
      });

      if (t < 1) {
        portsTransitionFrameRef.current = window.requestAnimationFrame(animateItemsIn);
      } else {
        portsTransitionFrameRef.current = null;
      }
    };

    portsTransitionFrameRef.current = window.requestAnimationFrame(animateItemsIn);
  }, [ports]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    let animationFrame: number | null = null;
    let dashFrameIndex = 0;
    let lastDashUpdate = 0;

    const isAnimated = animatedRef.current;

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

      // Mouse glow source
      map.addSource("mouse-glow", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      // Mouse glow layers (underneath everything)
      map.addLayer({
        id: "mouse-glow-outer",
        type: "circle",
        source: "mouse-glow",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 80, 8, 200],
          "circle-color": "rgba(81, 210, 198, 0.06)",
          "circle-blur": 1,
          "circle-opacity": 1,
        },
      });
      map.addLayer({
        id: "mouse-glow-inner",
        type: "circle",
        source: "mouse-glow",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 35, 8, 90],
          "circle-color": "rgba(81, 210, 198, 0.1)",
          "circle-blur": 0.7,
          "circle-opacity": 1,
        },
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
          "line-opacity": ["*", 0.8, ["coalesce", ["feature-state", "revealProgress"], 1]],
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
          "line-opacity": ["*", 0.5, ["coalesce", ["feature-state", "revealProgress"], 1]],
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
          "line-opacity": ["*", 0.95, ["coalesce", ["feature-state", "revealProgress"], 1]],
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
            "rgba(81, 210, 198, 0.35)",
            "rgba(255, 183, 77, 0.35)",
          ],
          "circle-opacity": [
            "*",
            ["case", ["boolean", ["feature-state", "hover"], false], 0.9, 0.6],
            ["coalesce", ["feature-state", "revealProgress"], 1],
            ["case", ["boolean", ["feature-state", "dimmed"], false], 0, 1],
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
              "#51d2c6",
              "#ffb74d",
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
          "circle-opacity": [
            "*",
            ["coalesce", ["feature-state", "revealProgress"], 1],
            ["case", ["boolean", ["feature-state", "dimmed"], false], 0, 1],
          ],
        },
      });

      // Pre-compute reveal schedule for animated mode
      type RevealEntry = { id: string | number; source: "routes" | "ports"; delay: number; duration: number };
      const revealSchedule: RevealEntry[] = [];

      if (isAnimated) {
        // Set initial revealProgress to 0 for all features
        routesGeojsonRef.current.features.forEach((f) => {
          if (f.id != null) {
            map.setFeatureState({ source: "routes", id: f.id }, { revealProgress: 0 });
          }
        });
        currentPorts.forEach((p) => {
          map.setFeatureState({ source: "ports", id: p.name }, { revealProgress: 0 });
        });

        // Calculate distances from Piraeus for routes
        routesGeojsonRef.current.features.forEach((f) => {
          const coords = f.geometry.coordinates as [number, number][];
          const mid = coords[Math.floor(coords.length / 2)];
          const dist = Math.hypot(mid[0] - PIRAEUS_COORDS[0], mid[1] - PIRAEUS_COORDS[1]);
          revealSchedule.push({
            id: f.id!,
            source: "routes",
            delay: (dist / 12) * 2800,
            duration: 600,
          });
        });

        // Calculate distances from Piraeus for ports
        currentPorts.forEach((p) => {
          const dist = Math.hypot(p.coordinates[0] - PIRAEUS_COORDS[0], p.coordinates[1] - PIRAEUS_COORDS[1]);
          revealSchedule.push({
            id: p.name,
            source: "ports",
            delay: (dist / 12) * 2800 + 100,
            duration: 600,
          });
        });

        revealSchedule.sort((a, b) => a.delay - b.delay);

      }

      const animateSeaLanes = (timestamp: number) => {
        const currentMap = mapRef.current;
        if (!currentMap) return;

        // --- Reveal progress (animated mode) ---
        if (isAnimated && !revealCompleteRef.current) {
          if (revealStartRef.current === null) revealStartRef.current = timestamp;
          const elapsed = timestamp - revealStartRef.current;

          let allDone = true;
          for (const entry of revealSchedule) {
            const t = clamp01((elapsed - entry.delay) / entry.duration);
            const progress = entry.source === "ports"
              ? Math.pow(easeOutCubic(t), 0.3)
              : easeOutCubic(t);
            if (t < 1) allDone = false;
            currentMap.setFeatureState(
              { source: entry.source, id: entry.id },
              { revealProgress: progress }
            );
          }

          if (allDone && elapsed > 3500) {
            revealCompleteRef.current = true;
          }
        }

        // --- Vessel movement ---
        const shouldSkipVessels = isAnimated && !revealCompleteRef.current &&
          revealStartRef.current !== null && (timestamp - revealStartRef.current) < 2500;

        if (!shouldSkipVessels) {
          const vesselsSource = currentMap.getSource("route-vessels") as
            | mapboxgl.GeoJSONSource
            | undefined;
          if (vesselsSource) {
            vesselsSource.setData(
              buildVesselGeojson(routesGeojsonRef.current, timestamp / 1000)
            );
          }
        }

        // --- Dash animation (every 90ms) ---
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

      // --- Mouse glow handler ---
      map.on("mousemove", (e) => {
        const glowSource = map.getSource("mouse-glow") as mapboxgl.GeoJSONSource | undefined;
        if (glowSource) {
          glowSource.setData({
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              properties: {},
              geometry: { type: "Point", coordinates: [e.lngLat.lng, e.lngLat.lat] },
            }],
          });
        }
      });
      map.on("mouseout", () => {
        const glowSource = map.getSource("mouse-glow") as mapboxgl.GeoJSONSource | undefined;
        if (glowSource) {
          glowSource.setData({ type: "FeatureCollection", features: [] });
        }
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        focusAfterOpen: false,
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

      // --- Auto-touring ship marker ---
      // Follow existing rendered sea-lane traces with a randomized route walk.
      const measureLineLength = (coordinates: [number, number][]) => {
        let length = 0;
        for (let index = 0; index < coordinates.length - 1; index += 1) {
          length += Math.hypot(
            coordinates[index + 1][0] - coordinates[index][0],
            coordinates[index + 1][1] - coordinates[index][1]
          );
        }
        return length;
      };

      type DirectedShipLeg = {
        from: Port;
        to: Port;
        coordinates: [number, number][];
        length: number;
      };

      type ShipNetwork = {
        portsByName: Map<string, Port>;
        directedLegs: DirectedShipLeg[];
        legsByFrom: Map<string, DirectedShipLeg[]>;
        componentByPort: Map<string, number>;
        components: string[][];
      };

      const buildShipNetwork = (): ShipNetwork => {
        const portsByName = new Map(latestPortsRef.current.map((port) => [port.name, port] as const));
        const directedLegs: DirectedShipLeg[] = [];
        routesGeojsonRef.current.features.forEach((routeFeature) => {
          const fromPort = portsByName.get(routeFeature.properties.from);
          const toPort = portsByName.get(routeFeature.properties.to);
          if (!fromPort || !toPort) return;

          const coordinates = routeFeature.geometry.coordinates as [number, number][];
          if (coordinates.length < 2) return;

          const legLength = measureLineLength(coordinates);
          if (legLength <= 0) return;

          directedLegs.push({
            from: fromPort,
            to: toPort,
            coordinates,
            length: legLength,
          });
          directedLegs.push({
            from: toPort,
            to: fromPort,
            coordinates: [...coordinates].reverse() as [number, number][],
            length: legLength,
          });
        });

        const legsByFrom = new Map<string, DirectedShipLeg[]>();
        directedLegs.forEach((leg) => {
          const existing = legsByFrom.get(leg.from.name) ?? [];
          existing.push(leg);
          legsByFrom.set(leg.from.name, existing);
        });

        const adjacencyByPort = new Map<string, Set<string>>();
        directedLegs.forEach((leg) => {
          const fromAdjacency = adjacencyByPort.get(leg.from.name) ?? new Set<string>();
          fromAdjacency.add(leg.to.name);
          adjacencyByPort.set(leg.from.name, fromAdjacency);

          const toAdjacency = adjacencyByPort.get(leg.to.name) ?? new Set<string>();
          toAdjacency.add(leg.from.name);
          adjacencyByPort.set(leg.to.name, toAdjacency);
        });

        const componentByPort = new Map<string, number>();
        const components: string[][] = [];
        const pending = new Set(adjacencyByPort.keys());

        while (pending.size > 0) {
          const seedPortName = pending.values().next().value;
          if (!seedPortName) break;

          const stack = [seedPortName];
          const componentPorts: string[] = [];
          pending.delete(seedPortName);

          while (stack.length > 0) {
            const portName = stack.pop();
            if (!portName) continue;
            componentPorts.push(portName);

            const neighbors = adjacencyByPort.get(portName) ?? new Set<string>();
            neighbors.forEach((neighborName) => {
              if (!pending.has(neighborName)) return;
              pending.delete(neighborName);
              stack.push(neighborName);
            });
          }

          const componentId = components.length;
          components.push(componentPorts);
          componentPorts.forEach((portName) => {
            componentByPort.set(portName, componentId);
          });
        }

        return { portsByName, directedLegs, legsByFrom, componentByPort, components };
      };

      let shipNetwork = buildShipNetwork();
      const hasRenderableSize =
        map.getContainer().clientWidth > 0 && map.getContainer().clientHeight > 0;

      if (showShipRef.current && hasRenderableSize && shipNetwork.directedLegs.length > 0) {
        const chooseRandom = <T,>(items: T[]) =>
          items[Math.floor(Math.random() * items.length)] ?? null;

        const pickRandomNavigablePort = (
          network: ShipNetwork,
          componentId?: number | null
        ): Port | null => {
          const componentPorts =
            componentId === null || componentId === undefined
              ? [...network.portsByName.keys()]
              : network.components[componentId] ?? [];
          const navigablePorts = componentPorts.filter(
            (portName) => (network.legsByFrom.get(portName)?.length ?? 0) > 0
          );
          const selectedPortName = chooseRandom(navigablePorts) ?? chooseRandom(componentPorts);
          if (!selectedPortName) return null;
          return network.portsByName.get(selectedPortName) ?? null;
        };

        const chooseSpawnPort = (
          network: ShipNetwork,
          preferredPortName: string | null = null
        ): Port => {
          if (preferredPortName) {
            const preferredPort = network.portsByName.get(preferredPortName);
            if (preferredPort && (network.legsByFrom.get(preferredPort.name)?.length ?? 0) > 0) {
              return preferredPort;
            }
          }

          const navigableComponentIds = network.components
            .map((_, index) => index)
            .filter((componentId) =>
              (network.components[componentId] ?? []).some(
                (portName) => (network.legsByFrom.get(portName)?.length ?? 0) > 0
              )
            );
          const randomComponentId = chooseRandom(navigableComponentIds);

          return (
            pickRandomNavigablePort(network, randomComponentId) ??
            pickRandomNavigablePort(network) ??
            network.directedLegs[0].from
          );
        };

        const initialPort = chooseSpawnPort(shipNetwork);

        // Ship marker element
        const shipEl = document.createElement("div");
        shipEl.textContent = "\u26F4\uFE0F";
        shipEl.style.fontSize = "32px";
        shipEl.style.lineHeight = "1";
        shipEl.style.width = "32px";
        shipEl.style.height = "32px";
        shipEl.style.display = "flex";
        shipEl.style.alignItems = "center";
        shipEl.style.justifyContent = "center";
        shipEl.style.cursor = "default";
        shipEl.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.3))";
        shipEl.style.zIndex = "10";

        const shipMarker = new mapboxgl.Marker({
          element: shipEl,
          anchor: "center",
          offset: [0, -10],
        })
          .setLngLat(initialPort.coordinates)
          .addTo(map);

        // Auto popup for ship
        const shipPopup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          focusAfterOpen: false,
          offset: 32,
          anchor: "bottom",
          className: "map-popup",
        });

        const DWELL_TIME = 3; // seconds at each port
        const startDelay = isAnimated ? 5000 : 1000;
        let tourStartTime: number | null = null;
        const TARGET_SAIL_DURATION = 5;
        const MAX_LEGS_PER_COMPONENT = 10;
        const MIN_COMPONENT_LEGS_BEFORE_SWITCH = 4;
        const RECENT_PORT_WINDOW = 8;
        const RECENT_PORT_LOOP_SIZE = 4;
        const SHIP_EMOJI = "\u26F4\uFE0F";
        let activeRouteRevision = routesRevisionRef.current;

        const pickNextLeg = (
          network: ShipNetwork,
          fromName: string,
          avoidToName: string | null,
          visitedPorts: Set<string>,
          recentPorts: string[]
        ) => {
          const candidates = network.legsByFrom.get(fromName) ?? [];
          if (candidates.length === 0) {
            return chooseRandom(network.directedLegs);
          }

          let pool = candidates;
          if (avoidToName && candidates.length > 1) {
            const nonBacktracking = candidates.filter((leg) => leg.to.name !== avoidToName);
            if (nonBacktracking.length > 0) {
              pool = nonBacktracking;
            }
          }

          const unexplored = pool.filter((leg) => !visitedPorts.has(leg.to.name));
          if (unexplored.length > 0) {
            return chooseRandom(unexplored);
          }

          const recentPortSet = new Set(recentPorts.slice(-RECENT_PORT_LOOP_SIZE));
          const nonRecent = pool.filter((leg) => !recentPortSet.has(leg.to.name));
          if (nonRecent.length > 0) {
            return chooseRandom(nonRecent);
          }

          return chooseRandom(pool);
        };

        const getLegDuration = (length: number, network: ShipNetwork) => {
          const averageLegLength =
            network.directedLegs.reduce((sum, leg) => sum + leg.length, 0) /
            network.directedLegs.length;
          const referenceSpeed = averageLegLength / TARGET_SAIL_DURATION;
          if (!Number.isFinite(referenceSpeed) || referenceSpeed <= 0) {
            return TARGET_SAIL_DURATION;
          }
          const duration = length / referenceSpeed;
          return Math.max(2.5, Math.min(9.5, duration));
        };

        let currentPortName = initialPort.name;
        let currentComponentId = shipNetwork.componentByPort.get(currentPortName) ?? null;
        let legsInCurrentComponent = 0;
        let visitedPortsInComponent = new Set<string>([currentPortName]);
        let recentPortHistory = [currentPortName];
        let previousPortName: string | null = null;
        let currentLeg:
          | { leg: DirectedShipLeg; startedAt: number; duration: number }
          | null = null;
        let dwellUntil: number | null = null;

        const rememberVisitedPort = (portName: string) => {
          recentPortHistory.push(portName);
          if (recentPortHistory.length > RECENT_PORT_WINDOW) {
            recentPortHistory = recentPortHistory.slice(-RECENT_PORT_WINDOW);
          }
        };

        const hasRepeatingRecentLoop = () => {
          if (recentPortHistory.length < RECENT_PORT_LOOP_SIZE * 2) return false;
          const previousPattern = recentPortHistory.slice(
            -RECENT_PORT_LOOP_SIZE * 2,
            -RECENT_PORT_LOOP_SIZE
          );
          const recentPattern = recentPortHistory.slice(-RECENT_PORT_LOOP_SIZE);

          return recentPattern.every(
            (portName, index) => portName === previousPattern[index]
          );
        };

        const hasLowVarietyRecentLoop = () => {
          const recentWindow = recentPortHistory.slice(-6);
          return recentWindow.length >= 6 && new Set(recentWindow).size <= 2;
        };

        const resetShipToNetwork = (preferredPortName: string | null): boolean => {
          shipNetwork = buildShipNetwork();
          if (shipNetwork.directedLegs.length === 0) {
            return false;
          }

          const fallbackPort = chooseSpawnPort(shipNetwork, preferredPortName);

          currentPortName = fallbackPort.name;
          currentComponentId = shipNetwork.componentByPort.get(fallbackPort.name) ?? null;
          legsInCurrentComponent = 0;
          visitedPortsInComponent = new Set<string>([fallbackPort.name]);
          recentPortHistory = [fallbackPort.name];
          previousPortName = null;
          currentLeg = null;
          dwellUntil = null;
          shipEl.textContent = SHIP_EMOJI;
          shipPopup.remove();
          shipMarker.setLngLat(fallbackPort.coordinates);
          return true;
        };

        const shouldRotateToAnotherComponent = (network: ShipNetwork) => {
          if (network.components.length <= 1) return false;

          const loopDetected = hasRepeatingRecentLoop() || hasLowVarietyRecentLoop();
          if (loopDetected && legsInCurrentComponent >= 3) {
            return true;
          }

          if (currentComponentId === null) return false;
          if (legsInCurrentComponent < MIN_COMPONENT_LEGS_BEFORE_SWITCH) return false;

          const currentComponentPorts = network.components[currentComponentId] ?? [];
          const exploredWholeComponent =
            currentComponentPorts.length > 0 &&
            currentComponentPorts.every((portName) => visitedPortsInComponent.has(portName));

          return exploredWholeComponent || legsInCurrentComponent >= MAX_LEGS_PER_COMPONENT;
        };

        const rotateToAnotherComponent = (network: ShipNetwork): boolean => {
          if (network.components.length <= 1) return false;

          const componentIds = network.components
            .map((_, index) => index)
            .filter((componentId) => componentId !== currentComponentId);

          const targetComponentId = chooseRandom(componentIds);
          if (targetComponentId === null) return false;

          const targetPorts = network.components[targetComponentId] ?? [];
          const navigableTargetPorts = targetPorts.filter(
            (portName) => (network.legsByFrom.get(portName)?.length ?? 0) > 0
          );
          const targetPortName = chooseRandom(navigableTargetPorts) ?? chooseRandom(targetPorts);
          if (!targetPortName) return false;

          const targetPort = network.portsByName.get(targetPortName);
          if (!targetPort) return false;

          currentPortName = targetPort.name;
          currentComponentId = targetComponentId;
          legsInCurrentComponent = 0;
          visitedPortsInComponent = new Set<string>([targetPort.name]);
          recentPortHistory = [targetPort.name];
          previousPortName = null;
          currentLeg = null;
          dwellUntil = null;
          shipEl.textContent = SHIP_EMOJI;
          shipPopup.remove();
          shipMarker.setLngLat(targetPort.coordinates);
          return true;
        };

        const updateShip = (timestamp: number) => {
          if (!mapRef.current) return;

          if (activeRouteRevision !== routesRevisionRef.current) {
            activeRouteRevision = routesRevisionRef.current;
            if (!resetShipToNetwork(currentPortName)) return;
          }

          if (tourStartTime === null) tourStartTime = timestamp;
          const elapsed = (timestamp - tourStartTime) / 1000;

          if (elapsed < (startDelay / 1000)) return;

          if (dwellUntil !== null) {
            const dockedPort = shipNetwork.portsByName.get(currentPortName);
            if (dockedPort) {
              shipMarker.setLngLat(dockedPort.coordinates);
            }
            if (timestamp < dwellUntil) return;

            dwellUntil = null;
            shipEl.textContent = SHIP_EMOJI;
            shipPopup.remove();
          }

          if (!currentLeg) {
            shipNetwork = buildShipNetwork();
            if (shipNetwork.directedLegs.length === 0) return;

            if (!shipNetwork.portsByName.has(currentPortName)) {
              if (!resetShipToNetwork(currentPortName)) return;
            }

            if (shouldRotateToAnotherComponent(shipNetwork)) {
              rotateToAnotherComponent(shipNetwork);
            }

            const nextLeg = pickNextLeg(
              shipNetwork,
              currentPortName,
              previousPortName,
              visitedPortsInComponent,
              recentPortHistory
            );
            if (!nextLeg) return;
            previousPortName = currentPortName;
            currentLeg = {
              leg: nextLeg,
              startedAt: timestamp,
              duration: getLegDuration(nextLeg.length, shipNetwork),
            };
          }

          const progress = clamp01((timestamp - currentLeg.startedAt) / 1000 / currentLeg.duration);
          const pos = interpolateAlongLine(currentLeg.leg.coordinates, progress, false);
          shipMarker.setLngLat(pos as [number, number]);

          if (progress >= 1) {
            const arrivalPort = currentLeg.leg.to;
            currentPortName = arrivalPort.name;
            const arrivalComponentId = shipNetwork.componentByPort.get(arrivalPort.name) ?? null;
            if (arrivalComponentId !== currentComponentId) {
              currentComponentId = arrivalComponentId;
              legsInCurrentComponent = 0;
              visitedPortsInComponent = new Set<string>();
              recentPortHistory = [];
            }
            visitedPortsInComponent.add(arrivalPort.name);
            rememberVisitedPort(arrivalPort.name);
            legsInCurrentComponent += 1;
            currentLeg = null;
            dwellUntil = timestamp + DWELL_TIME * 1000;

            const emojiPool = getPortEmojiPool(arrivalPort);
            const emoji =
              emojiPool[Math.floor(Math.random() * emojiPool.length)] ??
              "\u{1F3D6}\uFE0F";
            shipEl.textContent = emoji;

            const color = arrivalPort.category === "Major" ? "#51d2c6" : "#ffb74d";
            shipPopup
              .setLngLat(arrivalPort.coordinates)
              .setHTML(
                `<div class="map-popup-content">
                  <div style="margin-bottom: 6px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${color};">${arrivalPort.category}</div>
                  <p class="map-popup-title">${arrivalPort.name}</p>
                  <p class="map-popup-fact">${arrivalPort.fact}</p>
                  <a class="map-popup-link" href="${arrivalPort.link}" style="background: ${color}; color: ${arrivalPort.category === 'Major' ? '#ffffff' : '#33305e'}">View experiences</a>
                </div>`
              )
              .addTo(map);
          }
        };

        // Run ship animation in its own rAF loop
        let shipFrame: number | null = null;
        const animateShip = (timestamp: number) => {
          updateShip(timestamp);
          shipFrame = window.requestAnimationFrame(animateShip);
        };
        shipFrame = window.requestAnimationFrame(animateShip);

        // Cleanup on map remove
        map.on("remove", () => {
          if (shipFrame !== null) window.cancelAnimationFrame(shipFrame);
          shipMarker.remove();
          shipPopup.remove();
        });
      }
    });

    map.scrollZoom.disable();
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    return () => {
      if (portsTransitionFrameRef.current !== null) {
        window.cancelAnimationFrame(portsTransitionFrameRef.current);
        portsTransitionFrameRef.current = null;
      }
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
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
