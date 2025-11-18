import { useState, useEffect } from 'react';
// import axios from 'axios';

import Home from '../../home/Home';
import BottomLayout from '../layout/BottomLayout';

// Pic
import Troll from '../../../pic/fantasy characters/troll.png';
import Dragon from '../../../pic/fantasy characters/dragon.png';
import Goblin from '../../../pic/fantasy characters/goblin.png';
import User from '../../../pic/fantasy characters/knight.png';

// Data
import { Data } from "../../../App"


function Combat({ handelGameBord, fight, randomEncounter, sq }) {

    const { loadGame } = Data()

    const images = [
        Troll, Dragon, Goblin
    ]

    const [display, setDisplay] = useState(false)
    // User HP
    // eslint-disable-next-line
    const [userHp, setUserHp] = useState(loadGame?.hp || 0)
    // User Attack
    // eslint-disable-next-line
    const [userWeapon, setUserWeapon] = useState(loadGame?.weapon?.[0].die)

    const [monster, setMonster] = useState(JSON.parse(localStorage.getItem('monster')) || null)
    const [enemyHp, setEnemyHp] = useState(monster?.hp)

    // eslint-disable-next-line
    const [randomNum, setRandomNum] = useState(Math.ceil(Math.random() * 29))

    // Get Monster date
    useEffect(() => {
        const checkForMonster = JSON.parse(localStorage.getItem('monster'))
        if (fight || randomEncounter === 4 || sq) {
            if (!checkForMonster) {
                axios({
                    method: "GET",
                    url: 'http://localhost:8000/getMonster'
                })
                    .then(res => {
                        setMonster(res.data[randomNum])
                        localStorage.setItem("monster", JSON.stringify(res.data[randomNum]))
                        setEnemyHp(res.data[randomNum].hp)
                    })
                    .catch(err => console.log(err))
            }
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (enemyHp <= 0) {
            loadGame.xp = loadGame.xp + monster.xp
            localStorage.removeItem("monster")
            localStorage.setItem('user', JSON.stringify(loadGame))
        }
        // eslint-disable-next-line
    }, [enemyHp])

    const [magic, setMagic] = useState(false)
    const handleMagic = () => setMagic(true)
    const handleOff = () => setMagic(false)

    const [run, setRun] = useState(false)
    const handleRun = () => setRun(true)

    const [gameOver, setGameOver] = useState(false)
    const handleGameOver = () => setGameOver(true)

    const [selected, setSelected] = useState(0)
    document.onkeydown = e => {
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
                if (selected >= 0) {
                    setSelected(prev => prev - 1)
                }
                break
            case 'd':
                if (selected <= 1) {
                    setSelected(prev => prev + 1)
                }
                break;
            case 'k':
                if (selected === 0) {
                    handleTimeout(e)
                }
                break;
            case ' ':

                break;
            default:
                break;
        }
    }

    const userRoll = Math.ceil(Math.random() * userWeapon)
    const enemyRoll = Math.ceil(Math.random() * monster?.die)
    const [dam, setDam] = useState(false)

    function handleAttack() {
        loadGame.hp = loadGame.hp - enemyRoll
        localStorage.setItem('user', JSON.stringify(loadGame))
        setUserHp(prev => prev - (enemyRoll - (loadGame?.proficiency?.defense - monster?.strength)))
        setDisplay(false)
        setTimeout(() => {
            setDam(false)
        }, 3000)
    }

    const handleTimeout = (e) => {
        e.preventDefault()
        setDam(true)
        setDisplay(true)
        setEnemyHp(prev => prev - (userRoll - (loadGame?.proficiency?.strength - monster?.defense)))
        setTimeout(() => {
            handleAttack()
        }, 3000)
    }

    const style = (id) => ({
        color: 'white',
        border: id === selected ? '3px black solid' : '3px transparent solid',
        backgroundColor: "transparent"
    })

    const pic = {
        width: '5rem',
        height: '5rem'
    }

    let totolDam = userRoll - (loadGame?.proficiency?.strength - monster?.defense)

    function useMagic() { }

    return (
        <>
            <div>
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
                                        </div>
                                        <div class="col">
                                        <h6>{loadGame.name} does {totolDam} damage</h6>
                                        </div>
                                        <div class="col">
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
                        dam ? (
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

                                        </div>
                                        <div class="col">
                                        <h6>{monster?.monsterName} does {enemyRoll} damage</h6>
                                        </div>
                                        <div class="col">
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
                                    <div class="container text-center">
                                        <div class="row">
                                            <div class="col">
                                                <p>Magic</p>
                                                <button className='btn text-white' onClick={useMagic}>{loadGame?.magic[0]?.name}</button>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <button className='btn text-white' onClick={handleOff}>Back</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                                :
                                loadGame.hp <= 0 ?
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
                                    enemyHp <=0 ?
                                        (
                                            <div>
                                                <h4>You gaied {monster.xp} XP</h4>
                                                <botton className='btn text-white' onClick={(e) => {
                                                    handelGameBord(e)
                                                }}>Next</botton>
                                            </div>
                                        ) :
                                    run ?
                                        (
                                            <div>
                                                <h4>Why you run!</h4>
                                                <botton className='btn text-white' onClick={(e) => {
                                                    handelGameBord(e)
                                                }}>Next</botton>
                                            </div>
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
                                                            <h6>{loadGame.name} HP: {loadGame.hp}</h6>
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
                                                            <button className="btn" onClick={handleTimeout} style={style(0)}>Attack</button>
                                                        </div>
                                                        <div class="col">
                                                            <button className="btn" onClick={handleMagic} style={style(1)}>Magic</button>
                                                        </div>
                                                        <div class="col">
                                                            <button className="btn" onClick={handleRun} style={style(2)}>Run</button>
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
            </div>
        </>
    )
}

export default Combat