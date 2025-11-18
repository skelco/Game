// NPM
import { useEffect, useState } from 'react';
// import axios from 'axios';

// Components
import Home from '../../home/Home';

// Pic
import User from '../../../pic/fantasy characters/knight.png';
import Angel from '../../../pic/fantasy characters/angel.jpg';

// Data
import { Data } from "../../../App";
import BottomLayout from '../layout/BottomLayout';

function Boss({ nextStory }) {

    const { loadGame } = Data()

    const [display, setDisplay] = useState(false)

    // User HP
    const [userHp, setUserHp] = useState(JSON.parse(localStorage.getItem('user')).hp || loadGame?.hp)

    // User Attack
    // eslint-disable-next-line
    const [userWeapon, setUserWeapon] = useState(loadGame?.weapon?.[0].die)

    // Boss
    const [boss, setBoss] = useState(JSON.parse(localStorage.getItem('boss')) || null)
    const [bossHp, setBossHp] = useState(boss?.hp)

    // eslint-disable-next-line
    // const [randomNum, setRandomNum] = useState(Math.ceil(Math.random() * 29))

    // Get Boss date
    useEffect(() => {
        const checkForMonster = JSON.parse(localStorage.getItem('boss'))
        if (!checkForMonster) {
            axios({
                method: "GET",
                url: 'http://localhost:8000/getBoss'
            })
                .then(res => {
                    setBoss(res.data[loadGame?.storyLevel])
                    localStorage.setItem("boss", JSON.stringify(loadGame?.storyLevel))
                    setBossHp(res.data[loadGame?.storyLevel].hp)
                })
                .catch(err => console.log(err))
        }

        // eslint-disable-next-line
    }, [])

    const [magic, setMagic] = useState(false)
    const handleMagic = () => setMagic(true)
    const handleOff = () => setMagic(false)

    const [run, setRun] = useState(false)
    const handleRun = () => {
        setRun(true)
    }

    const [gameOver, setGameOver] = useState(false)
    const handleGameOver = () => setGameOver(true)

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
    const enemyRoll = Math.ceil(Math.random() * boss?.die)
    const [dam, setDam] = useState(false)

    function handleAttack() {
        loadGame.hp = loadGame.hp - (enemyRoll - loadGame?.proficiency?.defense)
        localStorage.setItem('user', JSON.stringify(loadGame))
        setUserHp(prev => prev - (enemyRoll - loadGame?.proficiency?.defense))
        setDisplay(false)
        setTimeout(() => {
            setDam(false)
        }, 3000)
    }

    const handleTimeout = (e) => {
        e.preventDefault()
        setDam(true)
        setDisplay(true)
        setBossHp(prev => prev - (userRoll - (loadGame?.proficiency?.strength - boss?.defense)))
        setTimeout(() => {
            handleAttack()
        }, 3000)
    }

    useEffect(() => {
        if (bossHp <= 0) {
            loadGame.xp = loadGame.xp + boss.xp
            localStorage.removeItem("boss")
            localStorage.setItem('user', JSON.stringify(loadGame))
        }
        // eslint-disable-next-line
    }, [bossHp])

    const styles = (id) => ({
        color: 'white',
        border: id === selected ? '3px black solid' : '3px transparent solid',
        backgroundColor: "transparent"
    })

    const pic = {
        width: '5rem',
        height: '5rem'
    }

    let totolDam = userRoll - (loadGame?.proficiency?.strength - boss?.defense)

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
                                            {boss?.monsterName} Hp: {bossHp}
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
                                            <img style={pic} src={Angel} alt="" />
                                        </div>
                                        <div class="col">
                                            <h5>{boss?.bossName}</h5>
                                        </div>
                                        <div class="col">
                                            <img style={pic} src={User} alt="" />
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
                                            <h6>{loadGame?.name} does {totolDam} damage</h6>
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
                                            {boss?.monsterName} Hp: {bossHp}
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
                                            <img style={pic} src={Angel} alt="" />
                                        </div>
                                        <div class="col">
                                            <h5>{boss?.bossName}</h5>
                                        </div>
                                        <div class="col">
                                            <img style={pic} src={User} alt="" />
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
                                        <div class="col"></div>
                                        <div class="col">
                                            <h6>{boss?.bossName} does {enemyRoll} damage</h6>
                                        </div>
                                        <div class="col">
                                        </div></div>
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
                                ) :
                                userHp <= 0 ?
                                    (
                                        gameOver ? (
                                            <Home />
                                        ) :
                                            (
                                                <div className="card-body">
                                                    <p className="card-text">Game Over</p>
                                                    <button className="btn text-white" onClick={handleGameOver}>Next</button>
                                                </div>
                                            )
                                    ) :
                                    bossHp <= 0 ?
                                        (
                                            <div>
                                                <h4>You gaied {boss.xp} XP</h4>
                                                <button className='btn text-white' onClick={nextStory}>Next Chapter</button>
                                            </div>
                                        ) :
                                        run ?
                                            (
                                                <div>
                                                    <h4>Why you run!</h4>
                                                    <button className='btn text-white' onClick={nextStory}>Next Chapter</button>
                                                </div>
                                            ) :
                                            (
                                                <div>
                                                    <div class="container text-center">
                                                        <div class="row">
                                                            <div class="col">
                                                                {boss?.monsterName} Hp: {bossHp}
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
                                                                <img style={pic} src={Angel} alt="Angel" />
                                                            </div>
                                                            <div class="col">
                                                                <h5>{boss?.bossName}</h5>
                                                            </div>
                                                            <div class="col">
                                                                <img style={pic} src={User} alt="" />
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
                                                                <button className="btn" onClick={handleTimeout} style={styles(0)}>Attack</button>
                                                            </div>
                                                            <div class="col">
                                                                <button className="btn" onClick={handleMagic} style={styles(1)}>Magic</button>
                                                            </div>
                                                            <div class="col">
                                                                <button className="btn" onClick={handleRun} style={styles(2)}>Run</button>
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
            </div >
        </>
    )
}

export default Boss;