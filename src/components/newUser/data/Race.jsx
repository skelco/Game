import { useState } from 'react'

import { Data } from "../../../App";

import { KeyPressHook } from "../../Utilitites/KeyPressHook";

function Race({ handleKind, setUserRace }) {
    // Data 
    const { race } = Data()
    // destructure function from keyPressHook
    const { keypressRace } = KeyPressHook()

    const [selected, setSelected] = useState(0)

    const style = (id) => ({
        color: id === selected ? "black" : "white",
        backgroundColor: id === selected ? "white" : "transparent"
    })

    document.onkeydown = e => keypressRace(e, selected, setSelected, race, setUserRace, handleKind)

    return (
        <>
                <div>
                    <h4>Pick your Race !</h4>
                    <div className='raceGrid'>
                        {race.map((item, i) => (<div style={style(i)} id={i}>{item?.raceName}</div>))}
                        <div id='35'>
                            <button className="btn" style={style(35)} onClick={handleKind}>Continue</button>
                        </div>
                    </div>
                </div>
                <br />
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            <h6>w,a,s,d = move around</h6>
                        </div>
                        <div class="col">
                            <h6>j = to erase</h6>
                        </div>
                        <div class="col">
                            <h6>K = to enter your name</h6>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Race