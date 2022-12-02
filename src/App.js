/// app.js
import React from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';

import ScatterPlotLayer from './Layres/ScatterPlotLayer';
import MyLineLayer from './Layres/MyLineLayer';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// DeckGL react component
function App() {
  const layers = [
    MyLineLayer,
    ScatterPlotLayer
  ];

  return <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers} />;
}

export default App;
