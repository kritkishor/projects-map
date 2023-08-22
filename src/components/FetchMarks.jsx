import { useEffect, useState } from "react";
import { MarkerF } from "@react-google-maps/api";
import "../style.css";
var coordinates = [];

function FetchMarks() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/htih9jdlm9qhk")
      .then((response) => response.json())
      .then((data) => setData(data));
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
