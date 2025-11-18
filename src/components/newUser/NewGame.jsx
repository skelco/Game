import { useState, useEffect } from "react"

// import axios from "axios"

// import Race from "./data/Race"
// import Kind from './data/Kind'
// import Proficiency from "./data/Proficiency"
import GameMenu from '../home/GameMenu'

import { KeyPressHook } from "../Utilitites/KeyPressHook";

function NewGame() {

    // destructure function from keyPressHook
    const { keyPressNewGame } = KeyPressHook()

    const [show, setShow] = useState(false)
    const [userStory, setUserStory] = useState(true)
    const [controls, setControls] = useState(false)
    const [userName, setUsername] = useState(false)

    const [userItem, setUserItem] = useState()
    const [userWeapon, setUserWeapon] = useState()
    const [userArmor, setUserArmor] = useState()

    const [stats, setStats] = useState({})

    const [item, setItem] = useState()
    const [weapon, setWeapon] = useState()
    const [armor, setArmor] = useState()

    const [selected, setSelected] = useState(0)

    const [race, setRace] = useState(false)

    const [kind, setKind] = useState(false)

    const [fin, setFin] = useState(false)

    const [name, setName] = useState([])

    const [userRace, setUserRace] = useState([])

    const [userClass, setUserClass] = useState([])

    const [gameStart, setGameStart] = useState(false)

    const [proficiency, setProficiency] = useState({
        strength: 0,
        defense: 0,
        wisdom: 0,
        accuracy: 0,
        luck: 0,
    })

    // Name bord
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
    const letter = range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) => String.fromCharCode(x))
    const number = range(0, 9, 1)
    const keyBoard = [...letter, ...number, ...letter.join("").toLowerCase()]
    const handleBack = () => setName(pev => pev.split('').toSpliced(pev.length - 1, 1).join(''))
    // Controls
    const handleControls = () => {
        setUserStory(false)
        setControls(per => !per)
    }
    // Name
    const handleName = () => {
        setControls(false)
        setUsername(true)
    }
    // Race
    const handleRace = () => {
        setUsername(false)
        setRace(true)
    }
    // Kind
    function handleKind() {
        setRace(false)
        setKind(true)
    }
    // Finish
    function handleFin() {
        setKind(false)
        setFin(true)
    }

    // Getting Item
    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url: 'http://localhost:8000/getItem'
    //     })
    //         .then(res => setItem(res.data))
    //         .catch(err => console.log(err))
    // }, [])

    // Getting Weapon
    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url: 'http://localhost:8000/getWeapon'
    //     })
    //         .then(res => setWeapon(res.data))
    //         .catch(err => console.log(err))
    // }, [])

    // Getting Armor
    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url: 'http://localhost:8000/getArmor'
    //     })
    //         .then(res => setArmor(res.data))
    //         .catch(err => console.log(err))
    // }, [])

    // Magic
    let magic = [{
        name: 'heal',
        power: 100
    }]

    // Make new user !
    // const handleSubmit = e => {
    //     e.preventDefault()
    //     axios({
    //         method: "POST",
    //         url: `http://localhost:8000/createUser`,
    //         data: {
    //             name: name,
    //             race: userRace,
    //             class: userClass,
    //             stats: stats,
    //             proficiency: proficiency,
    //             magic: magic,
    //             level: 0,
    //             hp: 100,
    //             mp: 50,
    //             money: 100,
    //             xp: 0,
    //             item: userItem,
    //             weapon: userWeapon,
    //             armor: userArmor,
    //             storyLevel: 0
    //         }
    //     })
    //         .then(res => {
    //             localStorage.setItem('user', JSON.stringify(res.data))
    //             setShow(false)
    //             setFin(false)
    //             setUsername(false)
    //             setGameStart(true)
    //         })
    //         .catch(console.log('err'))
    // }

    // Styles
    const style = (id) => ({
        color: id === selected ? "black" : "white",
        backgroundColor: id === selected ? "white" : "transparent"
    })
    const userStoryStyle = {
        border: '3px solid black',
        color: "white",
    }
    const controlsStyle = {
        border: '3px solid black',
        backgroundColor: "white"
    }
    const header = {
        'background': 'transparent',
        color: 'white',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    }

    // Key Downs
    document.onkeydown = e => keyPressNewGame(
        e,
        selected,
        setSelected,
        handleBack,
        keyBoard,
        setName,
        handleRace,
        userStory,
        handleControls,
        controls,
        handleName
    )
    return (
        <div className="container text-center">
            {
                gameStart ? (
                    <GameMenu />
                ) : show ?
                    (
                        <div class="container text-center ">
                            <div class="row ">
                                <div class="row">
                                    <div class="col">
                                        <li className="list-group-item d-flex justify-content-between lh-sm">
                                            <p>Strength</p>
                                            <p>defense</p>
                                            <p>Wisdom</p>
                                            <p>accuracy</p>
                                            <p>Luck</p>
                                        </li>
                                    </div>
                                </div>
                                <div class="row ">
                                    <div class="col">
                                        <li className="list-group-item d-flex justify-content-between lh-sm dice-container li">
                                            <div className='die-face'>
                                                <h1>
                                                    {stats.strength}
                                                </h1>
                                            </div>
                                            <div className='die-face'>
                                                <h1>
                                                    {stats.defense}
                                                </h1>
                                            </div>
                                            <div className='die-face'>
                                                <h1>
                                                    {stats.wisdom}
                                                </h1>
                                            </div>
                                            <div className='die-face'>
                                                <h1>
                                                    {stats.accuracy}
                                                </h1>
                                            </div>
                                            <div className='die-face'>
                                                <h1>
                                                    {stats.luck}
                                                </h1>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                                <h6>Proficiency</h6>
                                <div class="row">
                                    <div class="col">
                                        <li className="list-group-item d-flex justify-content-between lh-sm dice-container li">
                                            <div className='die-face'>
                                                <h1>
                                                    {proficiency.strength}
                                                </h1>
                                            </div>
                                            <div className='die-face'>
                                                <h1>
                                                    {proficiency.defense}
                                                </h1>
                                            </div>
                                            <div className='die-face'>
                                                <h1>
                                                    {proficiency.wisdom}
                                                </h1>
                                            </div>
                                            <div className='die-face'>
                                                <h1>
                                                    {proficiency.accuracy}
                                                </h1>
                                            </div>
                                            <div className='die-face'>
                                                <h1>
                                                    {proficiency.luck}
                                                </h1>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div className="row">
                            <div className="col">
                                <h4 className="text-white">{name}</h4>
                            </div>
                            <div class="col">
                                <h3 className="text-white">{userRace}</h3>
                            </div>
                            <div class="col">
                                <h3 className="text-white">{userClass}</h3>
                            </div>
                        </div>
                    )
            }
            {/* Main Content */}
            {
                userStory ? (
                    <>
                        <div style={header}>
                            <h2>
                                Welcome to Skeldor
                            </h2>
                        </div>
                        <p>
                            <h3>The Angels fall and the demons rise in the once peaceful land of Skeldor.</h3>
                            <h4>
                                Needing a hero as people plead for their lives.As the screams fill the air, a portal from hell releases the darkness.
                                The sky roars of light that is no more.
                            </h4>
                        </p>
                        <p>
                            <button className="btn text-white" style={userStoryStyle} onClick={handleControls}>Enter the world of Sekeldor</button>
                        </p>
                    </>
                ) :
                    controls ? (
                        <div class="container text-center">
                            <h2>Game Instructions</h2>
                            <div class="row">
                                <div class="col">
                                    <h4>Controls</h4>
                                    <h6>W = Will move you Up</h6>
                                    <h6>S = Will move you Down</h6>
                                    <h6>A = Will move you Left</h6>
                                    <h6>D = Will move you Right</h6>
                                    <h6>j = Will take you back to pev page</h6>
                                    <h6>k = will take you forward</h6>
                                </div>
                                <div class="col">
                                    <h4>Stats</h4>
                                    <h6>SP = Strength Proficiency</h6>
                                    <h6>DP = Defense Proficiency</h6>
                                    <h6>WP = Wisdom Proficiency</h6>
                                    <h6>AP = Accuracy Proficiency</h6>
                                    <h6>LP = Luck Proficiency</h6>
                                    <h6>Proficiency is added to your attack</h6>
                                </div>
                                <div class="col">
                                    <h4>Stats are decided by a roll of a D20</h4>
                                    <h5>Proficiency takes the roll of stats to be your modifier EX:</h5>
                                    <h6>If stats are 10 or less you get a proficiency of 1</h6>
                                    <h6>If stats are 20 or less you get a proficiency of 2</h6>
                                    <h6>If stats are 30 or less you get a proficiency of 3</h6>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <button className="btn" style={controlsStyle} onClick={handleName}>Next</button>
                                </div>
                            </div>
                        </div>
                    ) :
                        userName ? (
                            <div>
                                <h4>Enter Your Name</h4>
                                <div class="text-center">
                                    <div className='newGameGrid'>
                                        {keyBoard.map((x, i) => (<div style={style(i)} className={x} id={x}>{x}</div>))}
                                        <div id='62' style={style(62)}>
                                            <button className="btn" style={style(62)} onClick={(e) => handleBack(e)}>Back</button>
                                        </div>
                                        <div id='63'>
                                            <button className="btn" style={style(63)} onClick={handleRace}>Continue</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="container text-center">
                                    <div class="row">
                                        <div class="col">
                                            <h6>w,a,s,d = move around</h6>
                                        </div>
                                        <div class="col">
                                            <h6>j = to delete</h6>
                                        </div>
                                        <div class="col">
                                            <h6>K = to enter your name</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) :
                            race ? (
                                <Race
                                    handleKind={handleKind}
                                    setUserRace={setUserRace}
                                />
                            ) : kind ? (
                                <Kind
                                    setUserClass={setUserClass}
                                    handleFin={handleFin}
                                />
                            ) :
                                fin ? (
                                    <Proficiency
                                        setStats={setStats}
                                        setUserItem={setUserItem}
                                        setUserWeapon={setUserWeapon}
                                        setUserArmor={setUserArmor}
                                        item={item}
                                        weapon={weapon}
                                        armor={armor}
                                        stats={stats}
                                        proficiency={proficiency}
                                        setProficiency={setProficiency}
                                        handleSubmit={handleSubmit}
                                        setShow={setShow}
                                    />
                                ) :
                                    (
                                        <p>err</p>
                                    )
            }
        </div>
    )
}

export default NewGame