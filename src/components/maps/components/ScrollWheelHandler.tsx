import { useMapEvents } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

export const ScrollWheelHandler = () => {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      e.target.scrollWheelZoom.enable();
    },
    mouseout: (e: LeafletMouseEvent) => {
      e.target.scrollWheelZoom.disable();
    },
  });

  return null;
};
