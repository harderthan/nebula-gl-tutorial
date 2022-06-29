import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
// import { MVTLayer } from "@deck.gl/geo-layers";
// import { BitmapLayer } from "@deck.gl/layers";
// import { DataFilterExtension } from "@deck.gl/extensions";
// import { FlyToInterpolator } from "deck.gl";
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
        id: 1,
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
        id: 2,
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
        id: 2,
      },
    },
    {
      type: "Feature",
      properties: {
        color: "#ffff77",
        id: 3,
      },
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
      properties: { color: "#ff77ff", id: 4 },
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
    latitude: 12.473718352618263,
    longitude: 122.15970582093894,
    zoom: 5,
    bearing: 0,
    pitch: 0,
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
            getPointRadius: 10,
            getFillColor: (d) => hexToRgb(d.properties.color),
            getLineColor: (d) => hexToRgb(d.properties.color),
            pickable: true,
          }),
          // new MVTLayer({
          //   id: "mvt",
          //   data: "https://bq2.cartocdn.com/bqtiler?y={y}&x={x}&z={z}&p=0_16_50910_55815_28387_32608_4000_1&t=tm-geospatial.bqtiler.distance_populationv4",
          //   filled: true,
          //   getFillColor: (d) => {
          //     return d.properties.population > 1000
          //       ? hexToRgb("#ffdd00")
          //       : hexToRgb("#00ff00");
          //   },
          //   pickable: true,
          // }),
          // new BitmapLayer({
          //   id: "bitmap",
          //   bounds: [
          //     120.84686279296874, 14.425370443522059, 121.35772705078125,
          //     14.78152182269929,
          //   ],
          //   image:
          //     "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-districts.png",
          // }),
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
