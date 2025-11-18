import { useEffect } from "react"

function Fin({
    setStats,
    setUserItem,
    setUserWeapon,
    setUserArmor,
    item,
    weapon,
    armor,
    stats,
    setShow,
    setProficiency,
    handleSubmit
}) {

    useEffect(() => {
        setStats(() => ({
            strength: Math.ceil(Math.random() * 20),
            defense: Math.ceil(Math.random() * 20),
            wisdom: Math.ceil(Math.random() * 20),
            accuracy: Math.ceil(Math.random() * 20),
            luck: Math.ceil(Math.random() * 20)
        }))

        const newItem = []
        for (let i = 0; i < 3; i++) {
            newItem.push(Math.floor(Math.random() * 10))
        }

        const newWeapon = []
        for (let i = 0; i < 1; i++) {
            newWeapon.push(Math.floor(Math.random() * 5))
        }

        const newArmor = []
        for (let i = 0; i < 2; i++) {
            newArmor.push(Math.floor(Math.random() * 5))
        }

        setUserItem([item?.[newItem[0]], item?.[newItem[1]], item?.[newItem[2]]])
        setUserWeapon([weapon?.[newWeapon[0]]])
        setUserArmor([armor?.[newArmor[0]], armor?.[newArmor[1]]])

        setShow(true)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // eslint-disable-next-line
        Object.entries(stats).map(item => {
            if (item[1] <= 10) {
                item = item[0]
                setProficiency(prev => ({
                    ...prev,
                    [item]: 1
                }))
            } else if (item[1] <= 15) {
                item = item[0]
                setProficiency(prev => ({
                    ...prev,
                    [item]: 2
                }))
            }
            else if (item[1] <= 20) {
                item = item[0]
                setProficiency(prev => ({
                    ...prev,
                    [item]: 3
                }))
            }
            else {
                <p>err</p>
            }
        })
        // eslint-disable-next-line
    }, [stats])

    return (
        <button className="btn text-white" onClick={handleSubmit}>Continue</button>
    )
}
export default Fin