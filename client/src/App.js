//Main
import { useState } from "react";
import { Cartesian3, Math as CesiumMath } from "cesium";
import { Viewer, CameraFlyTo, ScreenSpaceCameraController } from "resium";

//CSS
import './App.css'

//Utils
import useInterval from './utils/useInterval'
import destinationCalc from './utils/destinationCalc'

//Assets
import Stone from './assets/stone.png'
import Road from './assets/frosted_road.png'
// import Sweeper from './assets/sweeper.gif'
import './App.css'


function App() {
  const [heading, setHeading] = useState(0)
  const [distance, setDistance] = useState(0)
  const [stoneMoving, setStoneMoving] = useState(false)
  const [timeToTravel, setTimeToTravel] = useState(0)
  const [launchPress, setLaunchPress] = useState(false);
  const [coordinates, setCoordinates] = useState({
    long: 9.5018,
    lat: 56.2639,
  })

  useInterval(() => {
    if (distance < 100 && launchPress) setDistance(distance + 1)
    if (distance > 0 && !launchPress) setDistance(distance - 1)
  }, 10);

  return (
    <div className='App'>
      <Viewer
        full
        resolutionScale={0.4}
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
        <ScreenSpaceCameraController
          enableInputs={false}
          enableLook={false}
          enableRotate={false}
          enableTilt={false}
          enableTranslate={false}
          enableZoom={false}
        />    
        <CameraFlyTo
          destination={new Cartesian3.fromDegrees(coordinates.long, coordinates.lat, 10000)}
          duration={Math.floor(timeToTravel)}
          maximumHeight={1000}
          orientation={{
            heading: CesiumMath.toRadians(heading),
            pitch: CesiumMath.toRadians(-15.0),
          }}
        />
      </Viewer>
      <meter id="meter"
        value={`${distance / 100}`}
        max="1"
        high=".75"
        low=".25"
        optimum=".2"
      />
      <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', zIndex: '2', position: 'absolute' }}>
        <img src={Road} alt="Road" className='road' />
      </div>
      <div className='user-input'>
        <img
          src={Stone}
          alt="Stone" className={`${stoneMoving ? `up-down-${Math.floor(timeToTravel)} stone` : 'stone'}`}
        />
        <input
          type="range"
          min="0"
          max="360"
          onInput={e => setHeading(e.target.value)}
          value={heading}
          list="tickmarks" />
        <datalist id="tickmarks">
          <option value="0" label="N"></option>
          <option value="45" />
          <option value="90" label="E"></option>
          <option value="135" />
          <option value="180" label="S"></option>
          <option value="225" />
          <option value="270" label="W"></option>
          <option value="3155" />
          <option value="360" label="N"></option>
        </datalist>
        <button
          onMouseDown={() => {
            setLaunchPress(true)
            setStoneMoving(false)
          }}
          onTouchStart={() => {
            setLaunchPress(true)
            setStoneMoving(false)
          }}


          onMouseUp={() => {
            setLaunchPress(false)
            destinationCalc(distance, heading, coordinates, setCoordinates)
            setTimeToTravel(distance / 10)
            setStoneMoving(true)

          }}
          onTouchEnd={() => {
            setLaunchPress(false)
            destinationCalc(distance, heading, coordinates, setCoordinates)
            setTimeToTravel(distance / 10)
            setStoneMoving(true)
          }}
        >
          HOLD TO LAUNCH
        </button>
      </div>
      {/* <div className='sweeper-container'>
        <img className='sweeper' src={Sweeper} alt="Sweeper" style={{  position: 'absolute', height: '250px' }} />
        <img  src={Stone} alt="Stone" style={{height: '150px', width: '150px', zIndex: '5'}} />
      </div> */}
    </div>
  );
}
export default App;


