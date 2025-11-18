import { useState,useEffect } from "react";

import TopLayout from "../layout/TopLayout";
import BottomLayout from "../layout/BottomLayout";

import { Data } from "../../../App";
import { KeyPressHook } from '../../Utilitites/KeyPressHook';

function Story({ storyOne, storyTwo, storyNum,setBackpack }) {
    // Data 
    const { story } = Data()

    const { keyPressStory } = KeyPressHook()

    // eslint-disable-next-line
    const [selected, setSelected] = useState(0)

    // Style
    const style = (id) => ({
        color: 'white',
        fontSize: '15pt',
        border: id === selected ? '3px black solid' : '3px transparent solid',
        backgroundColor: "transparent"
    })

    useEffect(() => {
        const handleKeyDown = (e) => {
            keyPressStory(
                e,
                selected,
                setSelected,
                setBackpack,
                storyOne,
                storyTwo
            )
        };
        document.addEventListener('keydown', handleKeyDown);
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <TopLayout />
            <ul>
                <li class="list-group-item">
                    <h3>{story?.[storyNum]?.place}</h3>
                </li>
                <li class="list-group-item">
                    <h4>{story?.[storyNum]?.storyDescription}</h4>
                </li>
                <li class="list-group-item">
                    {/* onClick sets PathOne true */}
                    <button className="btn" id='0' style={style(0)} onClick={(e) => storyOne(e)}>{story?.[storyNum]?.choiceOne}</button>
                    {/* onClick sets PathTwo true */}
                    <button className="btn" id='1' style={style(1)} onClick={(e) => storyTwo(e)}>{story?.[storyNum]?.choiceTwo}</button>
                </li>
            </ul>
            <BottomLayout />
        </>
    )
}

export default Story