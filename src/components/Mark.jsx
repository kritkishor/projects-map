import { Marker } from "@react-google-maps/api";
import coordinates from "./FetchMarks";

function Mark(){
  console.log(coordinates);
}
export default Mark;

/*
return (
        coordinates?.map(({id, position }) => (
            <MarkerF
              icon={{strokeColor: "blue"}}
              key={id}
              position={position}
              label={{
                className: "label-class",
                text:id,
                anchor:new window.google.maps.Point(18,12),
                labelInBackground: true
              }}
              onClick={() => {
                setSelectedPosition(position);
              }}
            />
        
          ))
        
      );
      */