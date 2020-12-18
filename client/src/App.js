import { useState } from "react";
import { Cartesian3, Math as CesiumMath } from "cesium";
import { Viewer, CameraFlyTo } from "resium";
import { turnLeft, turnRight, flyToNJ, flyToNY } from './utils/movement'
import './App.css'

function App() {
  const [heading, setHeading] = useState(0)
  const [coordinates, setCoordinates] = useState({
    long: -74.4057,
    lat: 40.0583,
  })

  return (
    <div className='App'>
      <div className='button-row'>
        <button onClick={e => turnLeft(heading, setHeading)}>
          Left 5°
        </button>
        <button onClick={e => turnRight(heading, setHeading)}>
          Right 5°
        </button>
        <button onClick={e => flyToNY(setCoordinates)}>
          Fly to NY
        </button>
        <button onClick={e => flyToNJ(setCoordinates)}>
          Fly to NJ
        </button>
      </div>
      <Viewer
        full
        style={{ zIndex: '1' }}
        resolutionScale={0.5}
        homeButton={false}
        shouldAnimate={true}
        navigationHelpButton={false}
        fullscreenButton={false}
        vrButton={false}
        timeline={false}
        sceneModePicker={false}
        baseLayerPicker={false}
        geocoder={false}
        animation={false}
      >
        <CameraFlyTo
          destination={new Cartesian3.fromDegrees(coordinates.long, coordinates.lat, 10000)}
          duration={3}
          orientation={{
            heading: CesiumMath.toRadians(heading),
            pitch: CesiumMath.toRadians(-15.0),
          }}
        />
      </Viewer>
    </div>
  );
}
export default App;
