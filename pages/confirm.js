import React, {useEffect, useState} from 'react'
import tw from "tailwind-styled-components"
import Map from "./components/Map"
import { useRouter } from 'next/router'
import Link from 'next/link'
import RideSelector from './RideSelector'

const Confirm = () => {
    const router = useRouter()
    const {pickup, dropoff} = router.query

    const [ pickupCoordinate , setPickupCoordinate ] = useState([0, 0]);
    const [ dropoffCoordinate, setDropoffCoordinate] = useState([0, 0]);

    const getPickupCoordinates = (pickup) => {
        

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
            access_token: "pk.eyJ1Ijoid2FpaGx5YW53aW4iLCJhIjoiY2t4Yjg5dmRjM3BmejJ0cHo3ejAxbnozdCJ9.C4R3XCZBjsq6w-HGWHJsvA",
            limit: 1,
        })
        )
        .then(response => response.json())
        .then(data => {
            setPickupCoordinate(data.features[0].center);
        })
    }

    const getDropoffCoordinates = (dropoff) => {
    
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
            access_token: "pk.eyJ1Ijoid2FpaGx5YW53aW4iLCJhIjoiY2t4Yjg5dmRjM3BmejJ0cHo3ejAxbnozdCJ9.C4R3XCZBjsq6w-HGWHJsvA",
            limit: 1,
        })
        )
        .then(response => response.json())
        .then(data => {
            setDropoffCoordinate(data.features[0].center);
        })
    }

    useEffect(() => {
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    }, [pickup, dropoff])

    return (
        <Wrapper>
             <ButtonContainer>
                 <Link href="/search">
                     <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                 </Link>
                 
             </ButtonContainer>
            <Map 
                pickupCoordinate={pickupCoordinate}
                dropoffCoordinate={dropoffCoordinate}
            />
            <RideContainer>
               <RideSelector 
                    pickupCoordinate={pickupCoordinate}
                    dropoffCoordinate={dropoffCoordinate}
               />
                <ConfirmButtonContainer>
                   <ConfirmButton>
                       Confirm UberX
                   </ConfirmButton>
                </ConfirmButtonContainer>
            </RideContainer>
        </Wrapper>
    )
}

const Wrapper = tw.div`
    flex flex-col h-screen flex-1 static
`;

const RideContainer = tw.div`
    flex-1 flex flex-col h-1/2
`
const ConfirmButtonContainer = tw.div`
    border-t-2
`;

const ConfirmButton = tw.div` 
    bg-black text-white my-4 mx-4 py-4 text-xl text-center rounded cursor-pointer
`;

const ButtonContainer = tw.div`
    rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`;

const BackButton = tw.img`
    h-full object-contain
`;

export default Confirm
