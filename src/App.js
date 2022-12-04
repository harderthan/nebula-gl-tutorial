/// app.js
import React, { useState, useCallback } from 'react';
import DeckGL from '@deck.gl/react';
import { Deck, OrthographicView, FirstPersonView, MapView } from '@deck.gl/core';

import ScatterPlotLayer from './Layres/ScatterPlotLayer';
import MyLineLayer from './Layres/MyLineLayer';

// DeckGL react component
function App() {
  const views = [
    new OrthographicView({ 
      id: 'ortho', 
      controller: true
    }),
    new FirstPersonView({
      id: 'first-person',
      controller: true
    }),
    new MapView({
      id: 'mini-map',
      x: '80%',
      y: '80%',
      height: '15%',
      width: '15%',
      clear: true,
      controller: true
    })]

  const layers = [
    MyLineLayer,
    ScatterPlotLayer
  ];

  const [viewState, setViewStates] = useState({
    longitude: -122.4,
    latitude: 37.8,
    pitch: 0,
    bearing: 0,
    zoom: 10
  });

  const onViewStateChange = useCallback(({viewId, viewState}) => {
    if (viewId === 'main') {
      setViewStates(currentViewStates => ({
        main: viewState,
        minimap: {
          ...currentViewStates.minimap,
          longitude: viewState.longitude,
          latitude: viewState.latitude
        }
      }));
    } else {
      setViewStates(currentViewStates => ({
        main: {
          ...currentViewStates.main,
          longitude: viewState.longitude,
          latitude: viewState.latitude
        },
        minimap: viewState
      }));
    }
  }, []);

  return <DeckGL
    // views={new OrthographicView()}
    views={[
      new MapView({id: 'main', controller: true}),
      new MapView({id: 'minimap', x: 10, y: 10, width: '20%', height: '20%', controller: true})
    ]}
    initialViewState={viewState}
    onViewStateChange={onViewStateChange}
    // onViewStateChange={e => setViewState(e.viewState)}
    controller={true}
    layers={layers} >
  </DeckGL>;
}

export default App;
