import { InfoWindow, MarkerF } from "@react-google-maps/api";
import { useState } from "react";




function Mark({data}){

  const [clicked,setClicked] = useState(false);
  // Place the markers
  return data?.map(({ id, position, address },index) => (
    <MarkerF
      key={index}
      position={position}
      label={{
        className: "label-class",
        text: id,
        anchor: new window.google.maps.Point(18, 12),
        labelInBackground: true,
      }}
      onClick={(e) => {
        setClicked(!clicked);
      }}
    >
    { // Show an Infowindow on click
      clicked?(
        <InfoWindow
        visible={true}
        anchor={position}>
          <div>{address}</div>
          
        </InfoWindow>
      ):null
    }
    </MarkerF>  
  
  ));
 

}
export default Mark;

