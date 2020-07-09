import React, { useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ParticleComponent from "./ParticleComponent";
// function App() {
//   return (
//     <div className="App">
//           <h1>This is it! Nice so Cool</h1>

//     </div>
//   );
// }


const App = () => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const DEMO_KEY = 'XbovXMaLIgC2GIxBbxVhHW4b6hgPfu4yB0PRjMw1'
    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-7-12&api_key=XbovXMaLIgC2GIxBbxVhHW4b6hgPfu4yB0PRjMw1'
    
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        console.log(setIsLoading);
        try{
          const res = await fetch(url); 
          const json = await res.json();
          setResponse(json)
          setIsLoading(false)
        } catch (error) {
          setError(error)
        }
      }
      fetchData();
    }, [])

    return (
      <div className="App">
      <div className="text-headers">
              <h1 className="text-header">Mars Rover Photos NASA<span role="img" aria-label="Rocket"> 🚀</span></h1>
              <div>
              <h2 className="text-headers">Images from Curiosity Rover</h2>
              <p>Captured Earth Date: July 12, 2015</p>
              </div>

        </div>
        <div className="body-container">
            { isLoading ? 
            <div> 
              <p>⏲Loading...</p>
            </div>
            : response ?
              Object.entries(response.photos).map(([key,values]) => {
                return <div key={key} className="image-container">
                          <img key={key} className="image-rover" src={values.img_src} alt="image_from_rover"/>
                      </div>
            })
            :  
            <p>{error}</p>
            }
        </div>
        <Router>
          <div
            style={{
              // position: "absolute",
              width: "100%",
              height: "100%"
            }}
          >
            <ParticleComponent />
            <div
              style={{
                // position: "absolute",
                // top: 0,
                // left: 0,
                // width: "100%",
                // height: "100%"
              }}
            >
            </div>
          </div>
        </Router>
      </div>
    );
  }

export default App;
