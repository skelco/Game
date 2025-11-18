import { useState, useEffect } from 'react'
import axios from 'axios'

function Pick({ setUserClass, handleFin }) {

    const [data, setData] = useState()

    const [selected, setSelected] = useState(0)

    useEffect(() => {
        axios({
            method: "GET",
            url: 'http://localhost:8000/getClass'
        })
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    document.onkeydown = e => {
        switch (e.key) {
            case 'w':
                if (selected - 6 >= 0) {
                    setSelected(prev => prev - 6)
                }
                break;
            case 's':
                if (selected + 6 <= 29) {
                    setSelected(prev => prev + 6)
                }
                break;
            case 'a':
                if (![0, 6, 12, 18, 24, 30].includes(selected)) {
                    setSelected(prev => prev - 1)
                }
                break;
            case 'd':
                if (![5, 11, 17, 23, 29, 35].includes(selected)) {
                    setSelected(prev => prev + 1)
                }
                break;
            case 'k':
                if (selected === 29) {
                    handleFin()
                }
                else
                    setUserClass(prev => [...prev, data?.[selected]?.name].join(''))
                break;
            default:
                break;
        }
    }

    const style = (id) => ({
        color: id === selected ? "black" : "white",
        backgroundColor: id === selected ? "white" : "transparent"
    })


    return (
        <>
            <form class="needs-validation" >
                <div class="row g-3 ">
                    <label class="form-label">Pick your Class !</label>
                    <div className="bord">
                        <div class="container text-center">
                            <div class="row row-cols-6">
                                <div className="col" id='0' style={style(0)}>{data?.[0]?.name}</div>
                                <div className="col" id='1' style={style(1)}>{data?.[1]?.name}</div>
                                <div className="col" id='2' style={style(2)}>{data?.[2]?.name}</div>
                                <div className="col" id='3' style={style(3)}>{data?.[3]?.name}</div>
                                <div className="col" id='4' style={style(4)}>{data?.[4]?.name}</div>
                                <div className="col" id='5' style={style(5)}>{data?.[5]?.name}</div>
                            </div>
                            <div class="row row-cols-6">
                                <div className="col" id='6' style={style(6)}>{data?.[6]?.name}</div>
                                <div className="col" id='7' style={style(7)}>{data?.[7]?.name}</div>
                                <div className="col" id='8' style={style(8)}>{data?.[8]?.name}</div>
                                <div className="col" id='9' style={style(9)}>{data?.[9]?.name}</div>
                                <div className="col" id='10' style={style(10)}>{data?.[10]?.name}</div>
                                <div className="col" id='11' style={style(11)}>{data?.[11]?.name}</div>
                            </div>
                            <div class="row row-cols-6">
                                <div className="col" id='12' style={style(12)}>{data?.[12]?.name}</div>
                                <div className="col" id='13' style={style(13)}>{data?.[13]?.name}</div>
                                <div className="col" id='14' style={style(14)}>{data?.[14]?.name}</div>
                                <div className="col" id='15' style={style(15)}>{data?.[15]?.name}</div>
                                <div className="col" id='16' style={style(16)}>{data?.[16]?.name}</div>
                                <div className="col" id='17' style={style(17)}>{data?.[17]?.name}</div>
                            </div>
                            <div class="row row-cols-6">
                                <div className="col" id='18' style={style(18)}>{data?.[18]?.name}</div>
                                <div className="col" id='19' style={style(19)}>{data?.[19]?.name}</div>
                                <div className="col" id='20' style={style(20)}>{data?.[20]?.name}</div>
                                <div className="col" id='21' style={style(21)}>{data?.[21]?.name}</div>
                                <div className="col" id='22' style={style(22)}>{data?.[22]?.name}</div>
                                <div className="col" id='23' style={style(23)}>{data?.[23]?.name}</div>
                            </div>
                            <div class="row row-cols-6">
                                <div className="col" id='24' style={style(24)}>{data?.[24]?.name}</div>
                                <div className="col" id='25' style={style(25)}>{data?.[25]?.name}</div>
                                <div className="col" id='26' style={style(26)}>{data?.[26]?.name}</div>
                                <div className="col" id='27' style={style(27)}>{data?.[27]?.name}</div>
                                <div className="col" id='28' style={style(28)}>{data?.[28]?.name}</div>
                            </div>
                            <div className="col" id='29'>
                                <button className="btn" style={style(29)} onClick={handleFin}>End</button>
                            </div>
                        </div>
                    </div>
                </div>
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
            </form>
        </>
    )
}

export default Pick