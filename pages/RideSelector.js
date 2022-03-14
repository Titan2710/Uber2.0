import React, {useState, useEffect} from 'react'
import tw from "tailwind-styled-components"
import { carList } from './data/CarList'

const RideSelector = (props) => {

    const [ rideDuration, setRideDuration ] = useState(0);

    useEffect(() => {
        fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${props.pickupCoordinate[0]}, ${props.pickupCoordinate[1]};${props.dropoffCoordinate[0]}, ${props.dropoffCoordinate[1]}?access_token=pk.eyJ1Ijoid2FpaGx5YW53aW4iLCJhIjoiY2t4Yjg5dmRjM3BmejJ0cHo3ejAxbnozdCJ9.C4R3XCZBjsq6w-HGWHJsvA`
            )
            .then(res => res.json())
            .then(data => {
                setRideDuration(data.routes[0].duration / 100)
            })
    } , [props.pickupCoordinate, props.dropoffCoordinate])

    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up for more</Title>
            <CarList>
                { carList.map((car, index) => (

                    <Car key={index}>
                        <CarImage src={car.imgUrl} />
                        <CarDetail>
                            <Service>{car.service}</Service>
                            <Time>5 min away</Time>
                        </CarDetail>
                        <Price>{'$' + (rideDuration * car.multiplier).toFixed(2)}</Price>
                    </Car>
                ))}
                
            </CarList>
        </Wrapper>
    )
}

const Wrapper = tw.div`
    flex-1 overflow-hidden flex flex-col
`;

const Title = tw.div`
    text-gray-500 text-center text-xs py-2 border-b
`;

const CarList = tw.div`
    overflow-y-scroll
    
`;

const Car = tw.div`
    flex p-4 items-center transform hover:bg-gray-200 transition 
    active:bg-gray-300 transition
     cursor-pointer 
`;

const CarImage = tw.img`
 h-14 mr-4
`;

const CarDetail = tw.div`
    flex-1
`;

const Service = tw.div`
    font-medium
`;

const Price = tw.div`
    font-medium
`;

const Time = tw.div`
    text-xs text-blue-500
`;
export default RideSelector
