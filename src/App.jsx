import { useState, useEffect } from "react";

// import axios from "axios";

import "./styles.css";

import Home from "./components/home/Home";

// import Music from './music/Music';

// import { useContext, createContext } from "react";

// const AppContext = createContext(null);

// export const Data = () => useContext(AppContext);

function App() {
  const [display2, setDisplay2] = useState(false);

  const [loadGame, setLoadGame] = useState({});

  const [backpack, setBackpack] = useState(false);

  const [userArmor, setUserArmor] = useState(false);

  const [userWeapon, setUserWeapon] = useState(false);

  const [selected, setSelected] = useState(0);

  // Story
  const [story, setStory] = useState(false);
  // useEffect(() => {
  //   // get story // load data
  //   axios({
  //     method: "GET",
  //     url: "http://localhost:8000/getStory",
  //   })
  //     .then((res) => {
  //       setStory(res.data);
  //     })
  //     .catch((err) => console.log(err));

  // }, []);
  // Race
  const [race, setRace] = useState(false);
  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "http://localhost:8000/getRace",
  //   })
  //     .then((res) => setRace(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  const style = (id) => ({
    // border: id === selected ? '1px white solid' : '3px white solid',
    // backgroundColor: id === selected ? "white" : "white"
  });

  const background = { backgroundImage: display2 ? "black" : "white" };

  return (
    <>
 
        <div id="mainBody">
          <div id="mainCon" style={background}>
            <div className="container text-center">
              <div className="row">
                <div className="col">
                  {/* <Home /> */}
                  {/* <Music /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

    </>
  );
}

export default App;
