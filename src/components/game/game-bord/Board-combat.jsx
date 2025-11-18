import { useState, useEffect } from "react";

// import axios from "axios";

import Home from '../../home/Home';
import Bord from "./Board";
import BottomLayout from "../layout/BottomLayout";

// Pic
import User from '../../../pic/fantasy characters/knight.png';
import Troll from '../../../pic/fantasy characters/troll.png';
import Dragon from '../../../pic/fantasy characters/dragon.png';
import Goblin from '../../../pic/fantasy characters/goblin.png';

// Data
import { Data } from "../../../App";

function BordCombat({ setBC, selected, handelBoss }) {

    // Combat with monters


    const { loadGame } = Data()

    const images = [
        Troll, Dragon, Goblin
    ]

    const [display, setDisplay] = useState(false)
    // User HP
    const [userHp, setUserHp] = useState(JSON.parse(localStorage.getItem('user')).hp || loadGame?.hp)
    // User Attack
    // eslint-disable-next-line
    const [userWeapon, setUserWeapon] = useState(loadGame?.weapon?.[0].die)
    // User XP
    // eslint-disable-next-line
    // const [userXP, setUserXP] = useState(loadGame.xp)

    const [monster, setMonster] = useState(JSON.parse(localStorage.getItem('monster')) || null)
    const [enemyHp, setEnemyHp] = useState(monster?.hp)

    // eslint-disable-next-line
    const [randomNum, setRandomNum] = useState(Math.ceil(Math.random() * 29))

    // Get Monster date
    // useEffect(() => {
    //     const checkForMonster = JSON.parse(localStorage.getItem('monster'))
    //     if (sq) {
    //         if (!checkForMonster) {
    //             axios({
    //                 method: "GET",
    //                 url: 'http://localhost:8000/getMonster'
    //             })
    //                 .then(res => {
    //                     setMonster(res.data[randomNum])
    //                     localStorage.setItem("monster", JSON.stringify(res.data[randomNum]))
    //                     setEnemyHp(res.data[randomNum].hp)
    //                     setSq(false)
    //                 })
    //                 .catch(err => console.log(err))
    //         }
    //     }

    // }, [])

    const userRoll = Math.ceil(Math.random() * userWeapon)
    const enemyRoll = Math.ceil(Math.random() * monster?.die)

    // eslint-disable-next-line
    const [count, setCount] = useState(2)

    function handleAttack() {
        loadGame.hp = loadGame.hp - enemyRoll
        localStorage.setItem('user', JSON.stringify(loadGame))
        setUserHp(prev => prev - (enemyRoll - (loadGame?.proficiency?.defense - monster?.strength)))
        setDisplay(false)
    }

    const handleTimeout = (e) => {
        e.preventDefault()
        setDisplay(true)
        setEnemyHp(prev => prev - (userRoll - (loadGame?.proficiency?.strength - monster?.defense)))
        const interval = setInterval(() => {
            setCount(prev => prev++)
        }, 500)
        setTimeout(() => {
            clearInterval(interval)
            handleAttack()
        }, 1500)
    }

    useEffect(() => {
        if (enemyHp <= 0) {
            loadGame.xp = loadGame.xp + monster.xp
            localStorage.removeItem("monster")
            localStorage.setItem('user', JSON.stringify(loadGame))
            localStorage.setItem("battle", JSON.stringify(selected))
        }
        // eslint-disable-next-line
    }, [enemyHp])

    const [magic, setMagic] = useState(false)
    const handleMagic = () => setMagic(true)
    const handleOff = () => setMagic(false)

    const [gameOver, setGameOver] = useState(false)
    const handleGameOver = () => setGameOver(true)

    const pic = {
        width: '5rem',
        height: '5rem'
    }

    const [sq, setSq] = useState(true)

    let totolDam = userRoll - (loadGame?.proficiency?.strength - monster?.defense)

    return (
        <>
            {
                display ?
                    (
                        <div>
                            <div class="container text-center">
                                <div class="row">
                                    <div class="col">
                                        {monster?.monsterName} Hp: {enemyHp}
                                    </div>
                                    <div class="col"></div>
                                    <div class="col">
                                        {loadGame.name}: HP: {loadGame.hp}
                                    </div>
                                </div>
                            </div>
                            <div class="container text-center">
                                <div class="row">
                                    <div class="col">
                                        <img style={pic} src={`${images[Math.floor(Math.random() * 3)]}`} alt="pic" />
                                    </div>
                                    <div class="col">
                                    </div>
                                    <div class="col">
                                        <img style={pic} src={User} alt="pic" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <h1>&#160;</h1>
                                    </div>
                                    <div class="col">
                                        <h1>&#160;</h1>
                                    </div>
                                    <div class="col">
                                        <h1>&#160;</h1>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <h5>You did</h5>
                                    </div>
                                    <div class="col">
                                        <h5>{totolDam}</h5>
                                    </div>
                                    <div class="col">
                                        <h5>Damg</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <h1>&#160;</h1>
                                    </div>
                                    <div class="col">
                                        <h1>&#160;</h1>
                                    </div>
                                    <div class="col">
                                        <h1>&#160;</h1>
                                    </div>
                                </div>
                            </div>
                            <BottomLayout />
                        </div>
                    ) :
                    magic ?
                        (
                            <div>
                                <li class="list-group-item">
                                    <p>Magic</p>
                                    <button onClick={handleOff}>Back</button>
                                </li>
                            </div>
                        )
                        :
                        userHp <= 0 ?
                            (
                                gameOver ? (
                                    <Home />
                                ) :
                                    (
                                        <div className="card-body">
                                            <p className="card-text">Game Over</p>
                                            <button className="btn" onClick={handleGameOver}>Next</button>
                                        </div>
                                    )
                            ) :
                            enemyHp <= 0 ?
                                (
                                    <Bord handelBoss={handelBoss} />
                                ) :
                                (
                                    <div>
                                        <div class="container text-center">
                                            <div class="row">
                                                <div class="col">
                                                    {monster?.monsterName} Hp: {enemyHp}
                                                </div>
                                                <div class="col"></div>
                                                <div class="col">
                                                    {loadGame.name}: HP: {loadGame.hp}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="container text-center">
                                            <div class="row">
                                                <div class="col">
                                                    <img style={pic} src={`${images[Math.floor(Math.random() * 3)]}`} alt="pic" />
                                                </div>
                                                <div class="col">
                                                </div>
                                                <div class="col">
                                                    <img style={pic} src={User} alt="pic" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <h1>&#160;</h1>
                                                </div>
                                                <div class="col">
                                                    <h1>&#160;</h1>
                                                </div>
                                                <div class="col">
                                                    <h1>&#160;</h1>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <button className="btn text-white" onClick={handleTimeout}>Attack</button>
                                                </div>
                                                <div class="col">
                                                    <button className="btn text-white" onClick={handleMagic} >Magic</button>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <h1>&#160;</h1>
                                                </div>
                                                <div class="col">
                                                    <h1>&#160;</h1>
                                                </div>
                                                <div class="col">
                                                    <h1>&#160;</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <BottomLayout />
                                    </div>
                                )
            }
        </>
    )
}

export default BordCombat