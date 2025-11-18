import { useEffect, useState } from 'react'

import Home from '../home/Home'

function Credits() {

    // used for interval
    const [count, setCount] = useState(0)
    // used to turn interval on or off
    const [toggle, setToggle] = useState(true)

    useEffect(() => {

        if (toggle) {
            // interval
            const interval = setInterval(() => {
                // console.log("interval", count)
                setCount(prev => prev + 1)
                clearInterval(interval)
            }, 3000)
            // timeout used to clear interval and setToggle(false)
            setTimeout(() => {
                clearInterval(interval)
                setToggle(false)
            }, 18000)
        }

    }, [count, setCount, setToggle, toggle])

    return (
        <>
            { // count is controlled by interval
                count === 0 ? (
                    <div>
                        <h1> You have saved Skeldor</h1>
                        <h4>Team Leader</h4>
                        <h6>אלכסנדר סקלטון</h6>
                    </div>
                ) :
                    count === 2 ? (
                        <div>
                            <h1>A Code Killer Industries</h1>
                            <h4>Team Leader</h4>
                            <h6>デビッド・ブライアント・スミス</h6>
                        </div>
                    ) :
                        count === 3 ? (
                            <div>
                                <h1>Yolo</h1>
                                <h4>Team Leader</h4>
                                <h6>Big Her</h6>
                            </div>
                        ) :
                            count === 4 ? (
                                <div>
                                    <h1>The Trap</h1>
                                    <h4>Team Leader</h4>
                                    <h6>Девон Лоури</h6>
                                </div>
                            ) :
                                count === 5 ? (
                                    <div>
                                        <h1>Music</h1>
                                        <h4>Team Leader</h4>
                                        <h6>デビッド・ブライアント・スミス</h6>
                                    </div>
                                ) :
                                    count === 6 ? (
                                        <div>
                                            <h1>Beta Testers</h1>
                                            <h4>Team Leader</h4>
                                            <h6 id="name">Justin Wright</h6>
                                        </div>
                                    )
                                        :
                                        count === 7 ? (
                                            <div>
                                                <h1>The End</h1>
                                            </div>
                                        ) : (
                                            <>
                                                <Home />
                                            </>
                                        )
            }
        </>
    )
}

export default Credits