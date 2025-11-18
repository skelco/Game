import { useEffect, useState } from "react";

import GameMenu from "./GameMenu";

import { KeyPressHook } from "../Utilitites/KeyPressHook";

function Home() {

    // used for interval
    const [count, setCount] = useState(0)

    // used to turn interval on or off
    const [toggle, setToggle] = useState(true)

    // starts game menu
    const [start, setStart] = useState(true)

    // function used to start menu
    const handleStart = () => setStart(false)

    // destructure function from keyPressHook
    const { keyPressHome } = KeyPressHook()

    useEffect(() => {

        localStorage.clear()

        if (toggle) {
            // interval
            const interval = setInterval(() => {
                setCount(prev => prev + 1)
                clearInterval(interval)
            }, 2000)
            // timeout used to clear interval and setToggle(false)
            setTimeout(() => {
                clearInterval(interval)
                setToggle(false)
            }, 8000)
        }

    }, [count, setCount, setToggle, toggle])

    document.onkeydown = e => { keyPressHome(e, handleStart) }


    const style = {
        color: 'white',
        fontSize: '15pt',
        border: '3px black solid',
        backgroundColor: "transparent"
    }

    return (
        <>
            { // count is controlled by interval
                count === 0 ? (
                    <div>
                        <h1>Skelco</h1>
                        <h4>Presents</h4>
                    </div>
                ) :
                    count === 2 ? (
                        <div id="codeKiller">
                            <h1>A Code Killer Industries</h1>
                        </div>
                    ) :
                        count === 3 ? (
                            <div>
                                <h4>Styling bY</h4>
                                <h1>Yolo</h1>
                            </div>
                        ) :
                            count === 4 ? (
                                <div>
                                    <h1>The Trap</h1>
                                    <h4>Data House</h4>
                                </div>
                            ) :
                                count === 5 ? (
                                    <>
                                        {
                                            start ? (
                                                <div>
                                                    {/* Start Menu */}
                                                    <h3>The World of</h3>
                                                    <h1>Skeldor</h1>
                                                    <button className="btn" onClick={handleStart} style={style}>Start</button>
                                                </div>
                                            ) : (
                                                <>
                                                    {/* Loads previous game // takes you to the load menu component*/}
                                                    <GameMenu />
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <div>
                                        <h3>Please Reload Game</h3>
                                        <div class="spinner-border text-info" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )
            }
        </>
    )
}

export default Home