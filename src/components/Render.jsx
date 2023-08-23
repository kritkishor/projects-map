import { GoogleMap,useJsApiLoader} from "@react-google-maps/api";
import FetchMarks from "./FetchMarks";

// Function to render Map
function Render() {
  
  // Loading Google Maps
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
  
    
    return (
      <div className="App">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={{ lat: 40.57852755, lng: -74.3276703 }}
            zoom={13}
            options={{mapId: process.env.REACT_APP_MAP_ID}}
            onLoad={console.log("loaded")}
          >
          <FetchMarks />
          </GoogleMap>
          
        )}
        
      </div>
    );
    
  }
  
  export default Render;

