import fs from "node:fs";
import path from "node:path";
import { topology } from "topojson-server";
import { presimplify, simplify, quantile } from "topojson-simplify";

// Paths
const publicDir = path.join(process.cwd(), "public");
const geojsonPath = path.join(publicDir, "world-countries.geojson");
const topojsonPath = path.join(publicDir, "world-countries.topojson");

function fileExists(p: string) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function run() {
  if (!fileExists(geojsonPath)) {
    console.error("GeoJSON source not found:", geojsonPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(geojsonPath, "utf-8");
  const geojson = JSON.parse(raw);

  // Build initial topology
  let topo = topology({ countries: geojson });

  // Pre-simplify and simplify
  topo = presimplify(topo);
  const minWeight = quantile(topo, 0.5); // median weight as threshold
  topo = simplify(topo, minWeight);

  // Write to public
  fs.writeFileSync(topojsonPath, JSON.stringify(topo));
  const stats = fs.statSync(topojsonPath);
}

run().catch((err) => {
  console.error("Conversion failed:", err);
  process.exit(1);
});
