import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { Map as StaticMap, MapProvider } from "react-map-gl";
import maplibregl from "maplibre-gl";

const layer1 = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [122.1597, 12.4737],
      },
      properties: {
        title: "Location 1",
        color: "#ff7700",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [122, 14],
      },
      properties: {
        title: "Location 2",
        color: "#0044ff",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [121, 15],
      },
      properties: {
        title: "Location 3",
        color: "#00ff77",
      },
    },
    {
      type: "Feature",
      properties: { color: "#ffff77" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [119.70703125, 13.774066408054827],
            [121.9921875, 13.774066408054827],
            [121.9921875, 15.60187487673981],
            [119.70703125, 15.60187487673981],
            [119.70703125, 13.774066408054827],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { color: "#ff77ff" },
      geometry: {
        type: "LineString",
        coordinates: [
          [121.86309814453124, 15.276236655384137],
          [121.14898681640626, 15.16227572090282],
          [121.36596679687499, 14.692538153744145],
          [121.88507080078125, 14.453298590545614],
          [121.9207763671875, 14.721760679027714],
          [121.38519287109375, 14.979279919478266],
          [121.640625, 15.077427674847987],
          [121.87957763671874, 15.077427674847987],
        ],
      },
    },
  ],
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result.slice(1).map((i) => parseInt(i, 16));
};

const Map = ({ props }) => {
  const [viewstate, setViewstate] = useState({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [121.86309814453124, 15.276236655384137],
        [121.14898681640626, 15.16227572090282],
        [121.36596679687499, 14.692538153744145],
        [121.88507080078125, 14.453298590545614],
        [121.9207763671875, 14.721760679027714],
        [121.38519287109375, 14.979279919478266],
        [121.640625, 15.077427674847987],
        [121.87957763671874, 15.077427674847987],
      ],
    },
  });

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <DeckGL
        layers={[
          new GeoJsonLayer({
            id: "layer1",
            data: layer1,
            filled: true,
            lineWidthMinPixels: 1,
            pointRadiusMinPixels: 4,
            getRadius: 10,
            getFillColor: (d) => hexToRgb(d.properties.color),
            getLineColor: (d) => hexToRgb(d.properties.color),
            pickable: true,
          }),
        ]}
        initialViewState={viewstate}
        onViewStateChange={({ viewState }) => setViewstate(viewState)}
        controller={true}
        pickingRadius={5}
        ContextProvider={MapProvider}
      >
        <StaticMap
          mapLib={maplibregl}
          disableTokenWarning={true}
          mapStyle={
            "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
          }
        />
      </DeckGL>
    </div>
  );
};

export default Map;
