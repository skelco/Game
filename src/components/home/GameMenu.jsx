import { useState, useEffect } from "react";

// import axios from "axios";

import New from '../newUser/NewGame';

import Game from "../game/Game";

// import { Data } from "../../App";

// destructure function from keyPressHook
import { KeyPressHook } from "../Utilitites/KeyPressHook";

function LoadMenu() {

    const { setDisplay2, setLoadGame } = Data();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const [newUser, setNewUser] = useState([]);

    const [newGame, setNewGame] = useState(false);

    const handleNewGame = () => setNewGame(true);

    const [load, setLoad] = useState(false);

    // destructure function from keyPressHook
    const { keyPressGameMenu } = KeyPressHook();


    const [selected, setSelected] = useState(0);

    useEffect(() => { }, [user])

    document.onkeydown = e => {
        keyPressGameMenu(
            e,
            selected,
            setSelected,
            handleLoad,
            handleNewGame
        )
    };

    // eslint-disable-next-line
    const [select, setSelect] = useState(null);

    const extra = Array(3).fill({ name: "", class: "", race: "" });

    const handleLoad = (index) => {
        localStorage.setItem('user', JSON.stringify(user[index]))
        setSelect(index)
        setLoadGame(user[index])
        setDisplay2(true)
        setLoad(true)
    };

    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url: `http://localhost:8000/getUser`
    //     })
    //         .then(res => {
    //             setUser(res.data)
    //             setNewUser([...res.data, ...extra])
    //         })
    //         .catch(err => console.log(err))
    // }, []);

    // function handleDeletUser(id) {
    //     axios.delete(`http://localhost:8000/deleteUser/${id}`)
    //         .then(res => setNewUser(per => [...per].filter(item => item._id !== res.data._id)))
    //         .catch(err => console.log(err))
    // }

    const style = (id) => ({
        color: 'white',
        border: id === selected ? '3px black solid' : '3px transparent solid',
        backgroundColor: "transparent"
    });


    return (
        <>
            {
                newGame ?
                    (
                        <New />
                    ) :
                    load ?
                        (
                            // game is the main component 
                            <Game />
                        ) :
                        // loads users form DB 
                        newUser.map((item, i) => i < 3 ?
                            <div class="container text-center" id="load">
                                <div class="row">
                                    <div class="col">
                                        <h5>
                                            {item?.name}
                                        </h5>
                                    </div>
                                    <div class="col">
                                        <h5>
                                            {item?.race}
                                        </h5>
                                    </div>
                                    <div class="col">
                                        <h5>
                                            {item?.class}
                                        </h5>
                                    </div>
                                    {/* sets load to true taking you to the game component */}
                                    {item?._id ?
                                        <>
                                            <div class="col">
                                                <button className='btn' onClick={() => handleLoad(i)} id={i === 0 ? 1 : i === 1 ? 3 : 5} style={style(i === 0 ? 1 : i === 1 ? 3 : 5)}>Load Game</button>
                                            </div>
                                            <div class="col">
                                                <button className="btn" id={i === 0 ? 2 : i === 1 ? 4 : 6} style={style(i === 0 ? 2 : i === 1 ? 4 : 6)} onClick={() => handleDeletUser(item?._id)}>Delete Game</button>
                                            </div>
                                        </>
                                        :
                                        <button className='btn' onClick={handleNewGame} id={i === 1 ? 3 : i === 2 ? 4 : 6} style={style(i === 1 ? 3 : i === 2 ? 4 : 6)}>New Game</button> // either 0, 3, 5, or 7 depending on 1, 2, or 3 games saved
                                    }
                                </div>
                            </div>
                            : null
                        )
            }
        </>
    )
}

export default LoadMenu



////  i === 0 ? 1 : i === 1 ? 3 : 5
////  i === 0 ? 2 : i === 1 ? 4 : 6
////  i === 0 ? 3 : i === 1 ? 5 : 7