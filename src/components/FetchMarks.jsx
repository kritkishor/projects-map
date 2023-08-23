import { useEffect, useState } from "react";
import { MarkerF } from "@react-google-maps/api";
import Papa from "papaparse";

import "../style.css";
var coordinates = [];

function FetchMarks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrxMVx-5wgzKZxsZOlsl9H1lUfVpoq6eHrtllFWrZ0v1FyKJYbXHiIv7LklNGt-WBabjbMRYybrRRO/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          setData(results.data);
        },
      }
    );
  }, []);

  data?.map(({ label, latitude, longitude }) =>
    coordinates.push({
      id: label,
      position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    })
  );

  return coordinates?.map(({ id, position }) => (
    <MarkerF
      key={id}
      position={position}
      label={{
        className: "label-class",
        text: id,
        anchor: new window.google.maps.Point(18, 12),
        labelInBackground: true,
      }}
      
    />
    
  ));
}

export default FetchMarks;
