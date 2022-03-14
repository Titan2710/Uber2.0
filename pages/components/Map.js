import React from 'react'
import { useEffect  } from 'react';
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1Ijoid2FpaGx5YW53aW4iLCJhIjoiY2t4Yjg5dmRjM3BmejJ0cHo3ejAxbnozdCJ9.C4R3XCZBjsq6w-HGWHJsvA';

const Map = (props) => {

    useEffect(() => {
        const map = new mapboxgl.Map({
        container: "map",
        style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
        center: [-99.29011, 39.39172],
        zoom: 3,
      });

      if(props.pickupCoordinate) {
          addToMap(map, props.pickupCoordinate);


          
      }

      if(props.dropoffCoordinate) {
          addToMap(map, props.dropoffCoordinate);

      }

      if(props.pickupCoordinate && props.dropoffCoordinate) {
        map.fitBounds([
            props.dropoffCoordinate,
            props.pickupCoordinate,
        ], {
            padding: 60
        })
      }
    }, [props.pickupCoordinate, props.dropoffCoordinate]);

    const addToMap = (map, coordinates) => {
        const marker1 = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
    }

    return (
        <Wrapper id="map">
            
        </Wrapper>
    )
}

const Wrapper = tw.div`
  flex-1 h-1/2
`;



export default Map
