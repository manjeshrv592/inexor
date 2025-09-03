import { Marker } from "react-leaflet";
import { DivIcon } from "leaflet";
import { ServiceLocation } from "../types";
import styles from "../styles/Maps.module.css";

interface ServiceMarkersProps {
  serviceLocations: ServiceLocation[];
}

export const ServiceMarkers = ({ serviceLocations }: ServiceMarkersProps) => {
  return (
    <>
      {serviceLocations.map((location) => (
        <Marker
          key={location.code}
          position={location.coordinates}
          icon={
            new DivIcon({
              html: `<div class="${styles.serviceDotRipple}"></div>`,
              className: styles.serviceMarkerContainer,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })
          }
        />
      ))}
    </>
  );
};
