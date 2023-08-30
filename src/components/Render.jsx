import { GoogleMap,useJsApiLoader} from "@react-google-maps/api";
import "../style.css" ;
import { useState,useEffect,useRef,useCallback } from "react";
import Papa from "papaparse";


let coordinates = [];
let labels = [];

const center = { lat: 40.7831, lng: -73.9712 };
const markers = [];
const out = [];
const outputData = [];
// Function to render Map
export default function Render() {

  FetchMarks();
  
  // Loading Google Maps
  const mapRef = useRef();
   
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  
  // Keeping the current reference of Google Map
  const onLoad = useCallback((map) => (
    mapRef.current = map
    
    ),[]);

  // Rendering here
  return (
    <div className="App">
      <button id="export-btn" className="export-button" onClick={ExportData}>Export</button>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          id="map"
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
          options={{mapId: process.env.REACT_APP_MAP_ID, disableDefaultUI:true}}
          onLoad={onLoad}
          
        >
        
        < Mark map={mapRef.current}/>
        </GoogleMap>
        
      )}
      
    </div>
  );

}




function ExportData() {
  
  
    fetch(
      "https://script.google.com/macros/s/AKfycbxxRD_QK142cKW1ajtJfELlFqZWGKC4PzE7E06yvT9BST_kw-KBZ1c75xQa1L8XktJJyA/exec",
      {
        method: "POST",
        body: JSON.stringify(outputData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(out);
  }

  
   /*
  // Geo Coder
  const geocoder = new window.google.maps.Geocoder();
  
  for(let i in markers){
    if (markers[i].position == null) { continue; }
    // Reverse geocode
    geocoder
      .geocode({location: markers[i].position})
      .then((response) => {
        let address = response.results[0].formatted_address;
        out.push(address);
        });
  };


  console.log(out);
 
  
  
  
 
  */
  
 


// Function to place markers, takes current reference of the map
function Mark({map}){

  // infowindow
  
  
  // states of count and positions clicked (to export)
  const [count,setCount] = useState(0);
  const [pos,setPos] = useState();
  
  const geocoder = new window.google.maps.Geocoder();

  useEffect(() => {
    pos && geocoder
      .geocode({location: pos})
      .then((response) => {
        let address = response.results[0].formatted_address;
        outputData.push(address);
        });

  });
  // Loop through the data and place appropriate markers
  for(let i in coordinates){

    // marker
    const marker = new window.google.maps.Marker({
      position: coordinates[i], 
      label: labels[i],
      map: map
    });
    markers.push(marker);

  };

  for (let i in markers){
    const infowindow = new window.google.maps.InfoWindow();
    // Listener for marker onClick!
    markers[i].addListener("click",() => {
      setCount(count+1);
      setPos(markers[i].getPosition());
      
      infowindow.setContent(count.toString());
      infowindow.open({
        anchor: markers[i],
        map: map
      });
    }); 
  }
  
  
}


// Function to pull data

function FetchMarks() {
  
  // State of data
  const [data, setData] = useState();

  // Using papaparse to import data
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


  // After data is downloaded, place it in the coordinates array
  data?.map(({latitude, longitude}) => 
    coordinates.push({
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    }),
   
);
data?.map(({label}) => 
    labels.push(label)
);

}

