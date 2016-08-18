// Type definitions for leaflet-heat

// The MIT License (MIT)
// Copyright (c) https://github.com/simopaasisalo/mapify

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/// <reference path="../leaflet/index.d.ts" />

declare namespace L {

  export interface heatLayerOptions {
    /**
     *   The minimum opacity the heat will start at
     */
    minOpacity?: number,
    /**
     *   Zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
     */
    maxZoom?: number,
    /**
     *   Maximum point intensity, 1.0 by default
     */
    max?: number,
    /**
     * Radius of each "point" of the heatmap, 25 by default
     */
    radius?: number,
    /**
     * Amount of blur, 15 by default
     */
    blur?: number,
    /**
     * Color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
     */
    gradient?: any,

    relative?: boolean,
  }

  export interface HeatLayer {
    /**
     *  Sets new heatmap options and redraws it
     */
    setOptions: (options: heatLayerOptions) => void,
    /**
     * Adds a new point to the heatmap and redraws it
     */
    addLatLng: (latlng: L.LatLng | number[]) => void,
    /**
     * Resets heatmap data and redraws it
     */
    setLatLngs: (latlng: L.LatLng[] | number[][]) => void,
    /**
     * Redraws the heatmap
     */
    redraw: () => void,

  }

  export function heatLayer(latlngs: L.LatLng[] | number[][], options: heatLayerOptions): HeatLayer;
}
