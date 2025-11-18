// import axios from 'axios';

import { Data } from "../../../App"
import { KeyPressHook } from "../../Utilitites/KeyPressHook";

function BottomLayout() {

    // user 
    const { loadGame, setLoadGame, setBackpack } = Data()

    const handleBackpack = () => setBackpack(true)

    const handleDelete = () => {
        const increaseHP = ['Herb', 'Ale', 'Cherries', 'Meat', 'Potion'].includes(loadGame.item[0].itemName) ? 100 : 0
        const increaseMoney = ['Gem', 'Money'].includes(loadGame.item[0].itemName) ? 100 : 0
        const increaseStrength = ['Hammer'].includes(loadGame.item[0].itemName) ? 1 : 0
        const increaseDefense = ['Hammer', 'Banjo'].includes(loadGame.item[0].itemName) ? 1 : 0
        const increaseWisdom = ['Banjo'].includes(loadGame.item[0].itemName) ? 1 : 0
        const increaseAccuracy = ['Glassess', 'Candel'].includes(loadGame.item[0].itemName) ? 1 : 0
        const increaseLuck = ['Paper', 'Pen'].includes(loadGame.item[0].itemName) ? 1 : 0
        if (loadGame.item.length) {
            axios.put(`http://localhost:8000/deleteItem/${loadGame?._id}`,
                {
                    $pop: { "item": -1 }, index: 0, $inc: {
                        "hp": increaseHP,
                        "money": increaseMoney,
                        'proficiency.strength': increaseStrength,
                        'proficiency.defense': increaseDefense,
                        'proficiency.wisdom': increaseWisdom,
                        'proficiency.accuracy': increaseAccuracy,
                        'proficiency.luck': increaseLuck
                    }
                })
                .then(res => {
                    setLoadGame(res.data)
                    localStorage.setItem("user", JSON.stringify(res.data))
                })
                .catch(err => console.log(err))
        }
    }

    // destructure function from keyPressHook
    const { keyPressCharacterBar } = KeyPressHook()

    const itemOne = () => handleDelete(0)

    document.onkeydown = e => {
        keyPressCharacterBar(
            e,
            itemOne
        )
    };

    return (
        <li className="list-group-item text-white">
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <h5>1</h5>
                        <h4>{loadGame?.item?.[0]?.itemImage}</h4>
                    </div>
                    <div class="col">
                        <h5>2</h5>
                        <h4>{loadGame?.item?.[1]?.itemImage}</h4>
                    </div>
                    <div class="col">
                        <h5>3</h5>
                        <h4>{loadGame?.item?.[2]?.itemImage}</h4>
                    </div>
                    <div class="col">
                        <h5>4</h5>
                        <h4>{loadGame?.item?.[3]?.itemImage}</h4>
                    </div>
                    <div class="col">
                        <h5>5</h5>
                        <h4>{loadGame?.item?.[4]?.itemImage}</h4>
                    </div>
                    <div class="col">
                        <button className='btn text-white' onClick={handleBackpack}>Backpack</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default BottomLayout