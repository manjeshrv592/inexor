import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Control } from "leaflet";
import styles from "../styles/Maps.module.css";

interface HomeButtonProps {
  initialCenter: [number, number];
  initialZoom: number;
}

export const HomeButton = ({ initialCenter, initialZoom }: HomeButtonProps) => {
  const map = useMap();

  useEffect(() => {
    const homeControl = new Control({ position: "topleft" });

    homeControl.onAdd = () => {
      const container = document.createElement("div");
      container.className =
        "leaflet-bar leaflet-control leaflet-control-custom";

      const button = document.createElement("button");
      button.className = styles.homeButton;
      button.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9,22 9,12 15,12 15,22"></polyline>
        </svg>
      `;
      button.title = "Reset to home view";

      button.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        map.setView(initialCenter, initialZoom, {
          animate: true,
          duration: 0.5,
        });
      });

      container.appendChild(button);
      return container;
    };

    map.addControl(homeControl);

    return () => {
      map.removeControl(homeControl);
    };
  }, [map, initialCenter, initialZoom]);

  return null;
};
