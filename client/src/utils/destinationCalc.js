import React from 'react'

export default function destinationCalc(distance, heading, coordinates, setCoordinates) {
    const R = 6378.1 //Radius of Earth
    const brng = heading * (Math.PI / 180) // converting degrees to radians
    const d = distance * 10 // distance in KM

    // #lat2  52.20444 - the lat result I'm hoping for
    // #lon2  0.36056 - the long result I'm hoping for.

    let lat1 = coordinates.lat * (Math.PI / 180) //Current lat converted to rad
    let lon1 = coordinates.long * (Math.PI / 180) //Current long converted to rad

    let lat2 = Math.asin(Math.sin(lat1) * Math.cos(d / R) +
        Math.cos(lat1) * Math.sin(d / R) * Math.cos(brng))

    let lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat1),
        Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2))

    lat2 = lat2 * (180/Math.PI) // turn to degree
    lon2 = lon2 * (180/Math.PI) // turn to degrees

    setCoordinates({
        long: lon2,
        lat: lat2,
    })
}


