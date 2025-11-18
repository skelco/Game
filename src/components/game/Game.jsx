import { useState } from 'react';

// import axios from 'axios';

import Home from '../home/Home';
import Combat from './combat/Combat';
import Chest from './randomEncounter/Chest';
import Npc from './randomEncounter/Npc';
import Credits from '../credits/Credits';
import GameMenu from '../home/GameMenu';
import Backpack from './backpack/Backpack';
import Bord from './game-bord/Board';
import Boss from './combat/Boss';
import TopLayout from './layout/TopLayout'
import BottomLayout from './layout/BottomLayout';
import Story from './story/Story';
import PathOne from './story/PathOne';
import PathTwo from './story/PathTwo';

import { Data } from "../../App";

function Game() {

    // Data 
    const {
        loadGame,
        display2,
        setDisplay2,
        backpack,
        setBackpack,
        story
    } = Data()

    // start
    const [display, setDisplay] = useState(false)

    // story Line
    const [pathOne, setPathOne] = useState(false)

    // story line2
    const [pathTwo, setPathTwo] = useState(false)

    // gives random outcome
    const [randomEncounter, setRandomEncounter] = useState(0)

    // combat
    const [fight, setFight] = useState(false)

    // chapter // level
    const [storyNum, setStoryNum] = useState(loadGame?.storyLevel || 0)

    // Game Bord
    const [gameBord, setGameBord] = useState(false)

    // Boss
    const [boss, setBoss] = useState(false)

    // activates story one
    function storyOne() {
        setDisplay(false)
        setDisplay2(false)
        setPathOne(true)
    }

    // activates story2 // sets display(false)
    function storyTwo() {
        setDisplay(false)
        setDisplay2(false)
        setPathTwo(true)
    }

    // activates random encounter // sets other states false
    function random() {
        setPathOne(false)
        setPathTwo(false)
        setRandomEncounter(Math.ceil(Math.random() * 5))
    }

    // activates fight // sets other states false
    function handelFight(e) {
        e.preventDefault(e)
        setRandomEncounter(0)
        setFight(true)
    }

    function handelGameBord(e) {
        e.preventDefault(e)
        setRandomEncounter(0)
        setFight(false)
        setGameBord(true)
    }

    function handelBoss(e) {
        e.preventDefault(e)
        setGameBord(false)
        setRandomEncounter(0)
        setFight(false)
        setBoss(true)
    }

    // avtivates next chapter number 
    // function nextStory(e) {
    //     e.preventDefault(e)
    //     axios.put(`http://localhost:8000/updateUser/${loadGame?._id}`, { $inc: { "storyLevel": 1 } })
    //         .then(res => {
    //             console.log("updated values", res.data)
    //             setStoryNum(res.data.storyLevel)
    //             localStorage.setItem("user", JSON.stringify(res.data))
    //         })
    //     setBoss(false)
    //     localStorage.removeItem("selected")
    //     localStorage.removeItem('battle')
    //     localStorage.removeItem('boss')
    //     setDisplay2(true)
    // }

    // Style
    const style = (id) => ({
        color: 'white',
        fontSize: '15pt',
        border: id === selected ? '3px black solid' : '3px transparent solid',
        backgroundColor: "transparent"
    })

    // KeyDown
    // eslint-disable-next-line
    const [selected, setSelected] = useState(0)

    return (
        <>
            <div class="container text-center">
                <div className="row">
                    <div className='col-12'>
                        {
                            loadGame.hp <= 0 ?
                                (
                                    <Home />
                                ) :
                                // if display2 is true 
                                display2 ? (
                                    // render chapter 
                                    <>
                                        {
                                            backpack ? (
                                                <Backpack />
                                            ) :
                                                storyNum === 6 ? (
                                                    <Credits />
                                                ) : (
                                                    <Story
                                                        storyOne={storyOne}
                                                        storyTwo={storyTwo}
                                                        storyNum={storyNum}
                                                        setBackpack={setBackpack}
                                                    />
                                                )
                                        }
                                    </>
                                ) :
                                    // sub-chapters story1 
                                    pathOne ? (
                                        <>
                                            {
                                                backpack ? (
                                                    <Backpack />
                                                ) :
                                                    (
                                                        <PathOne
                                                            storyNum={storyNum}
                                                            setBackpack={setBackpack}
                                                            random={random}
                                                        />
                                                    )
                                            }
                                        </>
                                    ) :
                                        //sub-chapters story2 
                                        pathTwo ? (
                                            <>
                                                {
                                                    backpack ? (
                                                        <Backpack />
                                                    ) :
                                                        (
                                                            <PathTwo
                                                                storyNum={storyNum}
                                                                setBackpack={setBackpack}
                                                                random={random}
                                                            />
                                                        )
                                                }
                                            </>
                                        ) :
                                            // random encounter will determine wich component to display.
                                            // Chest encounter
                                            randomEncounter === 1 || randomEncounter === 5 ? (
                                                <>
                                                    {
                                                        backpack ? (
                                                            <Backpack />
                                                        ) :
                                                            (
                                                                <div>
                                                                    <TopLayout />
                                                                    <ul>
                                                                        <li class="list-group-item">
                                                                            <h3>{story?.[storyNum]?.place}</h3>
                                                                        </li>
                                                                        <br />
                                                                        <li class="list-group-item">
                                                                            {/* sets Fight to true takes you to combat component */}
                                                                            <Chest handelFight={handelFight} />
                                                                        </li>
                                                                    </ul>
                                                                    <BottomLayout />
                                                                </div>
                                                            )
                                                    }
                                                </>
                                            )
                                                :
                                                // Nothing Encounter
                                                randomEncounter === 2 ? (
                                                    <>
                                                        {
                                                            backpack ? (
                                                                <Backpack />
                                                            ) :
                                                                (
                                                                    <div>
                                                                        <TopLayout />
                                                                        <ul>
                                                                            <li class="list-group-item">
                                                                                <h3>{story?.[storyNum]?.place}</h3>
                                                                            </li>
                                                                            <p>Nothing Happens</p>
                                                                            {/* sets Fight to true takes you to combat component */}
                                                                            <button className="btn" onClick={handelFight} style={style(0)}>Next</button>
                                                                        </ul>
                                                                        <BottomLayout />
                                                                    </div>
                                                                )
                                                        }
                                                    </>
                                                )
                                                    :
                                                    // NPC Encounter
                                                    randomEncounter === 3 ? (
                                                        <>
                                                            {
                                                                backpack ? (
                                                                    <Backpack />
                                                                ) :
                                                                    (
                                                                        <div>
                                                                            <TopLayout />
                                                                            <ul>
                                                                                <li class="list-group-item">
                                                                                    <h3>The Riddler appears !</h3>
                                                                                </li>
                                                                                <Npc handelFight={handelFight} story={story} storyNum={storyNum} />
                                                                                {/* sets Fight to true takes you to Npc component */}
                                                                            </ul>
                                                                            <BottomLayout />
                                                                        </div>
                                                                    )
                                                            }
                                                        </>
                                                    ) :
                                                        // is randomEncounter is 4 OR fight is true
                                                        randomEncounter === 4 || fight ? (
                                                            <>
                                                                {
                                                                    backpack ? (
                                                                        <Backpack />
                                                                    ) :
                                                                        (
                                                                            <Combat
                                                                                fight={fight}
                                                                                randomEncounter={randomEncounter}
                                                                                handelGameBord={handelGameBord}
                                                                            />
                                                                        )
                                                                }
                                                            </>
                                                        ) :
                                                            gameBord ?
                                                                (
                                                                    <Bord handelBoss={handelBoss} />
                                                                ) :
                                                                boss ? (
                                                                    <Boss nextStory={nextStory} />
                                                                ) :
                                                                    display ? (
                                                                        <GameMenu />
                                                                    ) :
                                                                        (
                                                                            <p></p>
                                                                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Game