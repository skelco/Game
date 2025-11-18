// create a custom hook for your keypress functions

export const KeyPressHook = (e) => {

    // Keypress for Home Component
    function keyPressHome(e, handleStart) {
        switch (e.key) {
            case 'k':
                handleStart()
                break;
            default:
                break;
        }
    }

    // Keypress for Game Menu Component
    function keyPressGameMenu(e, selected, setSelected, handleLoad) {
        switch (e.key) {
            case 'w':
                if (selected - 1 >= 0) {
                    setSelected(prev => prev - 1)
                }
                break;
            case 's':
                if (selected + 1 <= 5) {
                    setSelected(prev => prev + 1)
                }
                break;
            case 'k':
                handleLoad(selected)
                break;
            default:
                break;
        }
    }

    // Keypress for New Game Component
    function keyPressNewGame(
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
    ) {
        switch (e.key) {
            case 'w':
                if (selected - 10 >= 0) {
                    setSelected(prev => prev - 10)
                }
                break;
            case 's':
                if (![54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64].includes(selected)) {
                    setSelected(prev => prev + 10)
                }
                break;
            case 'a':
                if (![0, 10, 20, 30, 40, 50, 60].includes(selected)) {
                    setSelected(prev => prev - 1)
                }
                break;
            case 'd':
                if (![9, 19, 29, 39, 49, 59, 63].includes(selected)) {
                    setSelected(prev => prev + 1)
                }
                break;
            case 'k':
                if (controls) {
                    handleName()
                }
                else if (userStory) {
                    handleControls()
                }
                else if (selected === 62) {
                    handleBack()
                } else if (selected === 63) {
                    handleRace()
                } else {
                    setName(prev => [...prev, keyBoard[selected]].join(''))
                }
                break;
            case 'j':
                handleBack()
                break;
            default:
                break;
        }
    }

    // keypress from Race Component
    function keypressRace(
        e,
        selected,
        setSelected,
        race,
        setUserRace,
        handleKind
    ) {
        switch (e.key) {
            case 'w':
                if (selected - 6 >= 0) {
                    setSelected(prev => prev - 6)
                }
                break;
            case 's':
                if (selected + 6 <= 35) {
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
                if (selected === 35) {
                    handleKind()
                }
                else
                    setUserRace(prev => [...prev, race?.[selected]?.raceName].join(''))
                break;
            default:
                break;
        }
    }

    // Keypress for Game Component
    function keyPressStory(
        e,
        selected,
        setSelected,
        setBackpack,
        storyOne,
        storyTwo
    ) {
        switch (e.key) {
            case 'a':
                setSelected(prev => prev - 1)
                break;
            case 'd':
                setSelected(prev => prev + 1)
                break;
            case 'k':
                if (selected === 0) {
                    storyOne()
                }
                else if (selected === 1) {
                    storyTwo()
                }
                break;
            case 'j':
                setBackpack(false)
                break;
            case 'b':
                setBackpack(true)
                break;
            default:
                break;
        }
    }

    // Keypress for CharacterBar Component
    function keyPressCharacterBar(e, itemOne) {
        switch (e.key) {
            case '1':
                itemOne()
                break;
            case '2':
                break;
            case '3':
                break;
            case '4':
                break;
            case '5':
                break;
            default:
                break;
        }
    }

    function keyPressBord(e, selected, setSelected, setBackpack) {
        switch (e.key) {
            case 'w':
                if (selected - 10 >= 0) {
                    setSelected(prev => prev - 10)
                }
                break;
            case 's':
                if (selected + 10 <= 99) {
                    setSelected(prev => prev + 10)
                }
                break;
            case 'a':
                if (![0, 10, 20, 30, 40, 50, 60, 70, 80, 90].includes(selected)) {
                    setSelected(prev => prev - 1)
                }
                break;
            case 'd':
                if (![9, 19, 29, 39, 49, 59, 69, 79, 89, 99].includes(selected)) {
                    setSelected(prev => prev + 1)
                }
                break;
            case 'j':
                setBackpack(false)
                break;
            case 'b':
                setBackpack(true)
                break;
            default:
                break;
        }
    }


    return {
        keyPressHome,
        keyPressGameMenu,
        keyPressNewGame,
        keypressRace,
        keyPressStory,
        keyPressCharacterBar,
        keyPressBord
    }
}