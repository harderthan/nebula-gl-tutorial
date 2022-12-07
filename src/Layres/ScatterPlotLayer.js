import {picking, ScatterplotLayer} from 'deck.gl';

const ScatterPlotLayer = new ScatterplotLayer({
  id: 'bart-stations',
  data: [
    {name: 'Colma', passengers: 4214, coordinates: [-122.466233, 37.684638]},
    {name: 'Civic Center', passengers: 24798, coordinates: [-122.413756,37.779528]},
    {name: 'Dummy1', passengers: 1000, coordinates: [-122.413700,37.773000]},
    {name: 'Dummy2', passengers: 2355, coordinates: [-122.413700,37.770000]}
  ],
  pickable: true,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 1,
  radiusMaxPixels: 100,
  lineWidthMinPixels: 1,
  getPosition: d => d.coordinates,
  getRadius: d => Math.sqrt(d.passengers),
  getFillColor: d => [d.passengers%255, d.passengers%140, 0],
  getLineColor: d => [0, 0, 0]
});

export default ScatterPlotLayer;
