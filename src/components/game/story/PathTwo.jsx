import { useState } from "react";

import TopLayout from "../layout/TopLayout"
import BottomLayout from "../layout/BottomLayout"

import { Data } from "../../../App";

function PathTwo({ storyNum, random }) {

    // Data 
    const { story } = Data()

    // eslint-disable-next-line
    const [selected, setSelected] = useState(0)

    // Style
    const style = (id) => ({
        color: 'white',
        fontSize: '15pt',
        border: id === selected ? '3px black solid' : '3px transparent solid',
        backgroundColor: "transparent"
    })

    return (
            <div>
                <TopLayout />
                <ul>
                    <li class="list-group-item">
                        <h3>{story?.[storyNum]?.place}</h3>
                    </li>
                    <li class="list-group-item">
                        <h4>{story?.[storyNum]?.choiceTwoDescription}</h4>
                    </li>
                    <li class="list-group-item">
                        {/* sets Random encounter(true)  */}
                        <button className="btn" onClick={random} style={style(0)}>{story?.[storyNum]?.choiceThree}</button>
                    </li>
                </ul>
                <BottomLayout />
            </div>
    )
}

export default PathTwo