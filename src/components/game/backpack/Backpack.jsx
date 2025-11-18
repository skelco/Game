import { useState } from 'react';
// import axios from 'axios'

import BackpackUse from './Inside-Backpack'

import { Data } from "../../../App"

function Character() {

    // user 
    const {
        loadGame,
        setBackpack,
        userArmor,
        setUserArmor,
        userWeapon,
        setUserWeapon,
    } = Data()

    const equipArmor = () => setUserArmor(true)
    const unequipArmor = () => setUserArmor(false)

    const equipWeapon = () => setUserWeapon(true)
    const unequipWeapon = () => setUserWeapon(false)

    // const [equiped , setEquip] = useState(false)
    const [eq, setEq] = useState(false)

    // Inside the Bacpack
    const handleBackpack = () => setEq(true)

    const handleBackpackOff = () => setBackpack(false)

    const [save, setSave] = useState(false)
    const [toggle, setToggle] = useState(true)
    const [count, setCount] = useState(0)

    const handelSaveOn = () => {
        setSave(true)
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
                setSave(false)
            }, 4000)
        }
        // Save Game
        axios({
            method: 'PUT',
            url: `http://localhost:8000/updateUser/${loadGame?._id}`,
            data: JSON.parse(localStorage.getItem('user'))
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    const handleSaveOff = () => {
        setSave(false)
        setCount(0)
    }

    return (
        <>
            {
                eq ? (
                    <BackpackUse
                        setBackpack={setBackpack}
                        equipArmor={equipArmor}
                        equipWeapon={equipWeapon}
                    />
                ) :
                    save ? (
                        <>
                            <h6>Pleace Do Not Turn Off Console !</h6>
                            <div class="spinner-border text-info" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </>
                    )
                        :
                        count === 1 ?
                            (
                                <div>
                                    <h4>Game Saved</h4>
                                    <button className='btn' onClick={handleSaveOff}>Back</button>
                                </div>
                            )
                            :
                            (
                                <div class="row">
                                    <div class="col">
                                        <li className="list-group-item">

                                            <div className=" text-center">
                                                <div className="row align-items-start">
                                                    <div className="col">

                                                        <h5>Armor</h5>

                                                        {loadGame?.armor?.map((item, i) => i < 1 ?
                                                            <div>
                                                                {
                                                                    userArmor ?
                                                                        <div className="col-6 col-sm-2">
                                                                            <button className='btn' onClick={unequipArmor}>
                                                                                {item?.armorImage}
                                                                            </button>
                                                                        </div>
                                                                        :
                                                                        <div className="col">
                                                                            <h5>No Armor</h5>
                                                                        </div>
                                                                }
                                                            </div>
                                                            : null
                                                        )
                                                        }
                                                    </div>
                                                    <div className="col"></div>
                                                    <div className="col">
                                                        <h5>Weapon</h5>
                                                        {loadGame?.weapon?.map(item =>
                                                            <div>
                                                                {userWeapon ?
                                                                    <div className="col-6 col-sm-2">
                                                                        <button className='btn' onClick={unequipWeapon}>
                                                                            {item?.weaponImage}
                                                                        </button>
                                                                    </div>
                                                                    :
                                                                    <div className="col">
                                                                        <h5>No weapon</h5>
                                                                    </div>
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className=" text-center">
                                                <div className="row">
                                                    <button className='btn text-white' onClick={handleBackpack}>Backpack</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className=" text-center">
                                                <div className="row">
                                                    <button className='btn text-white' onClick={e => handelSaveOn(e)}>Save</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className=" text-center">
                                                <div className="row">
                                                    <button className='btn text-white' onClick={e => handleBackpackOff(e)}>Back</button>
                                                </div>
                                            </div>
                                        </li>
                                    </div>


                                    {/* Right Side  */}

                                    <div class="col">
                                        <li className="list-group-item">
                                            <div className=" text-center">
                                                <div className="row">
                                                    <div className='col'>
                                                        <h3>
                                                            S
                                                        </h3>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='die-face'>
                                                            <h1>
                                                                {loadGame?.stats?.strength}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <h3>
                                                            SP
                                                        </h3>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='die-face'>
                                                            <h1>
                                                                {loadGame?.proficiency?.strength}
                                                            </h1>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className='col'>
                                                        <h3>
                                                            D
                                                        </h3>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='die-face'>
                                                            <h1>
                                                                {loadGame?.stats?.defense}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <h3>
                                                            DP
                                                        </h3>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='die-face'>
                                                            <h1>
                                                                {loadGame?.proficiency?.defense}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className='col'>
                                                        <h3>
                                                            W
                                                        </h3>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='die-face'>
                                                            <h1>
                                                                {loadGame?.stats?.wisdom}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <h3>
                                                            WP
                                                        </h3>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='die-face'>
                                                            <h1>
                                                                {loadGame?.proficiency?.wisdom}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className='col'>
                                                        <h3>
                                                            A
                                                        </h3>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='die-face'>
                                                            <h1>
                                                                {loadGame?.stats?.accuracy}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <h3>
                                                            AP
                                                        </h3>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='die-face'>
                                                            <h1>
                                                                {loadGame?.proficiency?.accuracy}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className='col'>
                                                        <h3>
                                                            L
                                                        </h3>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='die-face'>
                                                            <h1>
                                                                {loadGame?.stats?.luck}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <h3>
                                                            LP
                                                        </h3>
                                                    </div>
                                                    <div className='col'>
                                                        <div className='die-face'>
                                                            <h1>
                                                                {loadGame?.proficiency?.luck}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>

                                    </div>
                                </div>
                            )
            }
        </>
    )
}

export default Character