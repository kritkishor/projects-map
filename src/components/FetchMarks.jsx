import { useEffect, useState } from "react";

import Papa from "papaparse";
import Mark from "./Mark";

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

  data?.map(({ label, latitude, longitude, address }) =>
    coordinates.push({
      id: label,
      position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      address: address,
    })
  );

  return (
    <Mark data={coordinates} />
  )
  
}

export default FetchMarks;
