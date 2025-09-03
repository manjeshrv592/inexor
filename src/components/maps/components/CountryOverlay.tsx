import { GeoJSON } from "react-leaflet";
import { Layer, LeafletMouseEvent } from "leaflet";
import { CountriesGeoJSON, CountryFeature } from "../types";
import { COUNTRY_STYLE, COUNTRY_HOVER_STYLE } from "../constants";

interface CountryOverlayProps {
  countriesData: CountriesGeoJSON;
}

export const CountryOverlay = ({ countriesData }: CountryOverlayProps) => {
  const onEachCountry = (feature: CountryFeature, layer: Layer) => {
    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        const targetLayer = e.target;
        targetLayer.setStyle(COUNTRY_HOVER_STYLE);
      },
      mouseout: (e: LeafletMouseEvent) => {
        const targetLayer = e.target;
        targetLayer.setStyle(COUNTRY_STYLE);
      },
    });
  };

  return (
    <GeoJSON
      data={countriesData}
      style={COUNTRY_STYLE}
      onEachFeature={onEachCountry}
    />
  );
};
