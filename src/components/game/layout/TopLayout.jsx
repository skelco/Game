import { useState, useEffect } from 'react';

import { Data } from "../../../App"

function TopLayout() {

    // user 
    const { loadGame } = Data()

    const [level, setLevel] = useState(loadGame?.level || 0)

    const [xp, setXp] = useState(loadGame?.xp || 0)

    // const [stats, setStats] = useState(loadGame?.stats || 0)

    // setStats(() => ({
    //     strength: (pev => pev + Math.ceil(Math.random() * 20)),
    //     defense: Math.ceil(Math.random() * 20),
    //     wisdom: Math.ceil(Math.random() * 20),
    //     accuracy: Math.ceil(Math.random() * 20),
    //     luck: Math.ceil(Math.random() * 20)
    // }))

    useEffect(() => {
        const levelThresholds = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
        if (level < levelThresholds.length && xp >= levelThresholds[level]) {
            setXp(prev => prev - levelThresholds[level]);
            setLevel(loadGame?.level + 1);
        }
        // eslint-disable-next-line
    }, []);

    const Bar = {
        color: "black",
        backgroundColor: "transparent"
    }

    return (
        <div style={Bar}>
            <ul>
                <li className="list-group-item text-white">
                    <div class="container text-center">
                        <div class="row">
                            <div class="col">
                                <h5>HP: {loadGame?.hp}</h5>
                            </div>
                            <div class="col">
                                <h5>MP: {loadGame?.mp}</h5>
                            </div>
                            <div class="col">
                                <h5>Gold: {loadGame?.money}</h5>
                            </div>
                            <div class="col">
                                <h5>Level: {loadGame?.level}</h5>
                            </div>
                            <div class="col">
                                <h5>XP: {loadGame?.xp}</h5>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default TopLayout