import { useState } from 'react';

import { Data } from "../../../App"

function BackpackUse({ setBackpack }) {

    // user 
    const {
        loadGame,
        userArmor,
        setUserArmor,
        userWeapon,
        setUserWeapon
    } = Data()

    const equipArmor = () => setUserArmor(true)
    const unequipArmor = () => setUserArmor(false)

    const equipWeapon = () => setUserWeapon(true)
    const unequipWeapon = () => setUserWeapon(false)

    const [selected, setSelected] = useState(0)
    document.onkeydown = e => {
        console.log(e.key)
        switch (e.key) {
            // case 'w':
            //     if (selected - 1 >= 0) {
            //         setSelected(prev => prev - 1)
            //     }
            //     break;
            // case 's':
            //     if (selected + 1 <= 2) {
            //         setSelected(prev => prev + 1)
            //     }
            case 'a':
                if (selected >= 1) {
                    setSelected(prev => prev - 1)
                }
                break
            case 'd':
                if (selected <= 4) {
                    setSelected(prev => prev + 1)
                }
                break
            case 'j':
                handleBackpack(e)
                break;
            case ' ':

                break;
            default:
                break;
        }
    }

    const handleBackpack = () => setBackpack(false)

    const style = (id) => ({
        border: id === selected ? '3px black solid' : '3px transparent solid'
    })

    return (
        <>
            <div>
                <ul>
                    <div class="container text-center">
                        <div class="row">

                            <div class="col">
                                {/* Weapons */}
                                <h6>Weapons</h6>

                                <li className="list-group-item">
                                    <div className=" text-center">
                                        <div className="row">
                                            {
                                                loadGame?.weapon?.map((item, i) =>

                                                    <div className="col-6 col-sm-2">

                                                        <button type="button" class="btn" onClick={equipWeapon} style={style(i + 3)}>
                                                            <div className="col-6 col-sm-2">
                                                                {
                                                                    userWeapon ?
                                                                        <div className="col-6 col-sm-2">

                                                                        </div>
                                                                        :
                                                                        <div className="col-6 col-sm-2" name='righthand'>
                                                                            {item?.weaponImage}
                                                                        </div>
                                                                }
                                                            </div>
                                                        </button>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </li>

                                {/* Armor */}
                                <h6>Armor</h6>

                                <li className="list-group-item">
                                    <div className=" text-center">
                                        <div className="row">
                                            {loadGame?.armor?.map((item, i) =>
                                                <div className="col-6 col-sm-2">

                                                    <button type="button" class="btn" onClick={equipArmor} style={style(i + 4)}>
                                                        <div className="col-6 col-sm-2">
                                                            {
                                                                userArmor ?
                                                                    <div className="col-6 col-sm-2"></div>
                                                                    :
                                                                    <div className="col-6 col-sm-2">
                                                                        {item?.armorImage}
                                                                    </div>
                                                            }
                                                        </div>
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </li>

                            </div>

                            <div class="col">

                                <li className="list-group-item">

                                    <div className=" text-center">


                                        <li className="list-group-item">

                                            <div className=" text-center">
                                                <div className="row align-items-start">
                                                    <div className="col">

                                                        <h5>Armor</h5>

                                                        {loadGame?.armor?.map((item, i) => i < 1 ?
                                                            <div>
                                                                {
                                                                    userArmor ?
                                                                        <div className="col-6">
                                                                            <button className='btn' onClick={unequipArmor}>
                                                                                {item?.armorImage}
                                                                            </button>
                                                                        </div>
                                                                        :
                                                                        <div className="col">
                                                                            <h5>Skin</h5>
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
                                                                        <h5>Hand</h5>
                                                                    </div>
                                                                }
                                                            </div>
                                                        )}

                                                    </div>

                                                </div>
                                            </div>
                                        </li>

                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default BackpackUse