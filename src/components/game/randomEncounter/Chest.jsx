import { useState, useEffect } from "react"
// import axios from "axios"

import Treasure from '../../../pic/chest.webp'

import { Data } from "../../../App"

function Chest({ handelFight }) {

    const { loadGame } = Data()

    const [itemData, setItemData] = useState()

    const [itemRandom, setItemRandom] = useState()

    const [itemDisplay, setItemDisplay] = useState(false)

    const [fight, setFight] = useState(false)

    useEffect(() => {
        axios({
            method: "GET",
            url: 'http://localhost:8000/getItem'
        })
            .then(res => setItemData(res.data))
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, [])

    function handleItem(e) {
        e.preventDefault()
        setItemRandom(Math.ceil(Math.random() * itemData.length))
        setItemDisplay(true)
    }

    let backPackItem = itemData?.[itemRandom]

    const handleSubmit = e => {
        e.preventDefault()
        loadGame.item = [...loadGame.item, backPackItem]
        console.log('Add item', loadGame.item)
        axios.put(`http://localhost:8000/updateUser/${loadGame?._id}`, { $push: { "item": backPackItem } })
            .then(res => {
                console.log(res)
                localStorage.setItem('user', JSON.stringify(loadGame))
            })
            .catch(err => console.log(err))
        setItemDisplay(false)
        setFight(true)
    }

    const treasureStyle = {
        width: '4rem',
        height: '4rem'
    }

    return (
        <>
            <div class="container text-center">
                <div class="row">
                    {
                        itemDisplay ? (
                            <div className="row text-white">
                                <div className="col">
                                    <h5>{backPackItem?.itemName}</h5>
                                </div>
                                <div className="col">
                                    <h5>{itemData?.[itemRandom]?.itemImage}</h5>
                                </div>
                                <div className="col">
                                    <button className="btn text-white" onClick={handleSubmit}>Add Item</button>
                                </div>
                            </div>
                        ) :
                            fight ? (
                                <div>
                                    <h5>Item was Add</h5>
                                    <button className="btn text-white" onClick={handelFight}>Next</button>
                                </div>
                            ) : (
                                <>
                                    <div class="col text-white">
                                    <img src={Treasure} alt="chest" style={treasureStyle} />
                                        <button className='btn text-white' onClick={handleItem}>Open</button>
                                    </div>
                                    <div class="col text-white">
                                    <img src={Treasure} alt="chest" style={treasureStyle} />
                                        <button className='btn text-white' onClick={handleItem}>Open</button>
                                    </div>
                                    <div class="col text-white">
                                    <img src={Treasure} alt="chest" style={treasureStyle} />
                                        <button className='btn text-white' onClick={handleItem}>Open</button>
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default Chest