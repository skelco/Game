import React from 'react'

// Pic
import User from '../../../pic/pic-side/knight.jpg';
import Grass from '../../../pic/grass.jpg';
import Path from '../../../pic/path.jpg';
import Water from '../../../pic/water.jpg';

function GridBord({ selected }) {

    const waterPath = [2, 3, 4, 5, 6, 11, 17, 28, 39, 48, 56, 57, 58, 59, 66, 67, 68, 69, 77, 78, 79, 87, 88, 89]
    const grassPath = [1, 7, 8, 9, 12, 13, 14, 15, 16, 18, 19, 26, 27, 29, 30, 31, 32, 33, 34, 36, 37, 38, 40, 41, 42, 43, 44, 46, 47, 49, 50, 51, 52, 60, 61, 62, 70, 71, 72, 80, 81, 82, 83, 84, 85, 64, 65, 90, 91, 92, 93, 94, 95]
    const path = [0, 10, 20, 21, 22, 23, 24, 25, 35, 45, 55, 54, 53, 63, 73, 74, 75, 76, 86, 96, 97, 98, 99]

    const styles = {

        square: (id) => ({
            border: '1px white solid',
            // backgroundColor: id === selected ? "red" : "green",
            backgroundColor: waterPath.includes(id) ? "blue" : path.includes(id) ? 'gray' : `white`,
            backgroundImage: selected === id ? `url(${User})` : waterPath.includes(id) ? `url(${Water})` : grassPath.includes(id) ? `url(${Grass})` : path.includes(id) ? `url(${Path})` : null,
            backgroundSize: "cover"
        }),
        player: () => ({
            // border: '1px white solid',
            // backgroundColor:"red",
            // backgroundImage: user,
            // zIndex: 1
        })
    }

    return (
        <>
            <div className="bord h-100" style={{ height: "100%" }}>
                <div class="container ">
                    {/* Grid Container */}
                    <div class="bordGrid">
                        {Array(100).fill('').map((row, i) => <div className="col" id={i} style={styles.square(i)}>&#160;</div>)}
                    </div>
                </div>
            </div>
        </>
    )
}



export default GridBord