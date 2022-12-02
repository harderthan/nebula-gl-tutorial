import {LineLayer} from '@deck.gl/layers';

const data = [
    {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
  ];

const MyLineLayer = new LineLayer({ 
    id: 'line-layer', data});

export default MyLineLayer;
