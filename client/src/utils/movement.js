export const turnLeft = (heading, setHeading) => {
    if (heading - 5 < 0) {
        setHeading(355)
    } else {
        setHeading(heading - 5)
    }
}

export const turnRight = (heading, setHeading) => {
    if (heading + 5 > 360) {
        setHeading(5)
    } else {
        setHeading(heading + 5)
    }
}

export const flyToNJ = (setCoordinates) => {
    setCoordinates({ long: -74.4057, lat: 40.0583 })
}

export const flyToNY = (setCoordinates) => {
    setCoordinates({ long: -74.0060, lat: 40.7128 })
}

