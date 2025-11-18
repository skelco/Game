import { useState, useEffect } from 'react'

function Music() {
    

// Music
const [note, setNote] = useState([440.0, 330])
// eslint-disable-next-line
const [int, setInt] = useState(500)

let notes = [293.7, (293.7 * 2), 370.0, 146.8, 185, (370.0 / .5), 220.0, (293.7 / 2), (370.0 * 1.5), (440.0 * 1.5)]
// eslint-disable-next-line 
function changeNote() {
    setNote(note[0] = notes[Math.floor(Math.random() * 10)])
}

useEffect(() => {
    setInt(Math.floor(Math.random() * 1000))
    // playSong()
}, [note])

useEffect(() => {
    setInterval(() => {
        makeNoise()
        changeNote()
    }, 250)
    // eslint-disable-next-line 
}, [])

// eslint-disable-next-line 
function makeNoise() {

    let audioContext = new AudioContext()
    let notes = note
    let oscillators = notes.map(note => {
        let o = audioContext.createOscillator()
        o.frequency.value = note;
        return o
    })
    let volumeControl = audioContext.createGain()
    volumeControl.gain.setTargetAtTime(1, 0.0, 0.05)
    volumeControl.gain.setTargetAtTime(.05, 0.1, 0.2)
    let speakers = audioContext.destination
    oscillators.forEach(o => o.connect(volumeControl))
    volumeControl.connect(speakers)
    let startTime = audioContext.currentTime
    let stopTime = startTime + 1.75
    oscillators.forEach(o => {
        o.start(startTime)
        o.stop(stopTime)
    })
    oscillators[0].addEventListener("ended", () => {
        // console.log('ended')
    })
}

}

export default Music
