import React, { useState } from "react";
import './GameBoard.css';
import GameTile from "./GameTile";
import PlayerFigure from "./PlayerFigure";

const defBoard = [
    0, 0, 0, 0, 29, 30, 31, 0, 0, 0, 0,
    0, 121, 122, 0, 28, 71, 32, 0, 131, 132, 0,
    0, 123, 124, 0, 27, 72, 33, 0, 133, 134, 0,
    0, 0, 0, 0, 26, 73, 34, 0, 0, 0, 0,
    21, 22, 23, 24, 25, 74, 35, 36, 37, 38, 39,
    20, 61, 62, 63, 64, 0, 44, 43, 42, 41, 40,
    19, 18, 17, 16, 15, 54, 5, 4, 3, 2, 1,
    0, 0, 0, 0, 14, 53, 6, 0, 0, 0, 0,
    0, 111, 112, 0, 13, 52, 7, 0, 101, 102, 0,
    0, 113, 114, 0, 12, 51, 8, 0, 103, 104, 0,
    0, 0, 0, 0, 11, 10, 9, 0, 0, 0, 0]


const GameBoard = () => {
    const order = ['Yellow', 'Blue', 'Red', 'Green'];

    const yellowPlayerHome = [101, 102, 103, 104];
    const bluePlayerHome = [111, 112, 113, 114];
    const redPlayerHome = [121, 122, 123, 124];
    const greenPlayerHome = [131, 132, 133, 134];

    const [yellowPlayerFigures, setYellowPlayerFigures] = useState(yellowPlayerHome);
    const [bluePlayerFigures, setBluePlayerFigures] = useState(bluePlayerHome);
    const [redPlayerFigures, setRedPlayerFigures] = useState(redPlayerHome);
    const [greenPlayerFigures, setGreenPlayerFigures] = useState(greenPlayerHome);
    const [playersTurn, setPlayersTurn] = useState('Yellow');


    const [lastRoll, setLastRoll] = useState(0);
    const [buttonVisibility, setbuttonVisibility] = useState(true);

    const rollDice = () => {
        let rollValue = Math.floor(Math.random() * 6) + 1;
        setLastRoll(rollValue);
    }

    // const checkForWinner = () => {
    //     return
    // }

    const changePlayersTurn = () => {
        let indexOfColor = order.indexOf(playersTurn);
        return indexOfColor === 3 ? order[0] : order[indexOfColor + 1];
    }

    const handleMoveFigure = (tileValue, event) => {
        const parentElementID = parseInt(event.target.parentElement.id);
        const parentElementClass = event.target.parentElement.classList[0];
        console.log(event.target)
        console.log(parentElementClass)

        let updatedArray;
        let switchFigurePositionsArray;
        let freeHomeTile;

        let targetTileValue = parentElementID + lastRoll;

        const checkIfClickedFromHome = (item) => {
            return ((parentElementClass === 'home') && (item === parentElementID) && (lastRoll === 6))
        }

        const checkForOtherFigures = (tileToCheck, item) => {
            switch (true) {
                //tiletocheck= 40
                //yellow playerfigure= [40,-,-,-]
                case (yellowPlayerFigures.includes(tileToCheck)):
                    switchFigurePositionsArray = yellowPlayerFigures;
                    //find empty home tile
                    freeHomeTile = yellowPlayerHome.find(item => yellowPlayerFigures.every((el) => el !== item));
                    if (tileToCheck <= 40) {
                        switchFigurePositionsArray[yellowPlayerFigures.indexOf(tileToCheck)] = freeHomeTile;
                        switchFigurePositionsArray[yellowPlayerFigures.indexOf(item)] = tileToCheck;
                    } else {
                        return item;
                    }
                    return tileToCheck;

                case (bluePlayerFigures.includes(tileToCheck)):
                    switchFigurePositionsArray = bluePlayerFigures;
                    //find empty home tile
                    freeHomeTile = bluePlayerHome.find(item => bluePlayerFigures.every((el) => el !== item));
                    if (tileToCheck <= 40) {
                        switchFigurePositionsArray[bluePlayerFigures.indexOf(tileToCheck)] = freeHomeTile;
                        switchFigurePositionsArray[bluePlayerFigures.indexOf(item)] = tileToCheck;
                    } else {
                        return item;
                    }
                    return tileToCheck;

                case (redPlayerFigures.includes(tileToCheck)):
                    switchFigurePositionsArray = redPlayerFigures;
                    //find empty home tile
                    freeHomeTile = redPlayerHome.find(item => redPlayerFigures.every((el) => el !== item));
                    if (tileToCheck <= 40) {
                        switchFigurePositionsArray[redPlayerFigures.indexOf(tileToCheck)] = freeHomeTile;
                        switchFigurePositionsArray[redPlayerFigures.indexOf(item)] = tileToCheck;
                    } else {
                        return item;
                    }
                    return tileToCheck;

                case (greenPlayerFigures.includes(tileToCheck)):
                    switchFigurePositionsArray = greenPlayerFigures;
                    //find empty home tile
                    freeHomeTile = greenPlayerHome.find(item => greenPlayerFigures.every((el) => el !== item));
                    if (tileToCheck <= 40) {
                        switchFigurePositionsArray[greenPlayerFigures.indexOf(tileToCheck)] = freeHomeTile;
                        switchFigurePositionsArray[greenPlayerFigures.indexOf(item)] = tileToCheck;
                    } else {
                        return item;
                    }
                    return tileToCheck;
                default:
                    return tileToCheck;

            }
        }

        //check if if the figure is on 'home' tile.. if yes move it to '1'
        //if not.. check if the destination id is less than 44.. if yes check if theres a other figure.. if yes move it to its 'home' and move on the tile with the id
        switch (playersTurn) {
            case 'Yellow':
                updatedArray = yellowPlayerFigures.map(item =>
                    checkIfClickedFromHome(item) ?
                        checkForOtherFigures(1, item) : ((item === parentElementID) && (targetTileValue <= 44)) ?
                            checkForOtherFigures(targetTileValue, item) : item
                );
                setYellowPlayerFigures(updatedArray);
                break;
            case 'Blue':
                updatedArray = bluePlayerFigures.map(item =>
                    checkIfClickedFromHome(item) ?
                        checkForOtherFigures(11, item) : ((item === parentElementID) && (targetTileValue <= 40)) ?
                            checkForOtherFigures(targetTileValue, item) : item
                );
                setBluePlayerFigures(updatedArray);
                break;
            case 'Red':
                updatedArray = redPlayerFigures.map(item =>
                    checkIfClickedFromHome(item) ?
                        checkForOtherFigures(21, item) : ((item === parentElementID) && (targetTileValue <= 40)) ?
                            checkForOtherFigures(targetTileValue, item) : item
                );
                setRedPlayerFigures(updatedArray);
                break;
            case 'Green':
                updatedArray = greenPlayerFigures.map(item =>
                    checkIfClickedFromHome(item) ?
                        checkForOtherFigures(31, item) : ((item === parentElementID) && (targetTileValue <= 40)) ?
                            checkForOtherFigures(targetTileValue, item) : item
                );
                setGreenPlayerFigures(updatedArray);
                break;
            default:
                break;

        }

        let newTurnOrder = changePlayersTurn();
        setbuttonVisibility(true);
        setLastRoll(0);
        setPlayersTurn(newTurnOrder);
    }

    const checkForFigures = (item) => {
        return yellowPlayerFigures.includes(item) ? <div className="figure yellow" onClick={(e) => playersTurn === 'Yellow' && lastRoll !== 0 ? handleMoveFigure(item, e) : null}>
            <div className="figure-head"></div>
            <div className="figure-body"></div>
        </div> :
            bluePlayerFigures.includes(item) ? <div className="figure blue" onClick={(e) => playersTurn === 'Blue' && lastRoll !== 0 ? handleMoveFigure(item, e) : null}>
                <div className="figure-head"></div>
                <div className="figure-body"></div>
            </div> :
                redPlayerFigures.includes(item) ? <div className="figure red" onClick={(e) => playersTurn === 'Red' && lastRoll !== 0 ? handleMoveFigure(item, e) : null}>
                    <div className="figure-head"></div>
                    <div className="figure-body"></div>
                </div> :
                    greenPlayerFigures.includes(item) ? <div className="figure green" onClick={(e) => playersTurn === 'Green' && lastRoll !== 0 ? handleMoveFigure(item, e) : null}>
                        <div className="figure-head"></div>
                        <div className="figure-body"></div>
                    </div> : <></>
    }

    const renderBoard = () => {
        //initialize board
        // defBoard.map(item => console.log(item));
        let tempBoard = defBoard.map((item, index) => {
            switch (true) {
                //home town pole
                case item > 130:
                    return <div className='home board-tile playable green' id={item} key={index}>
                        {checkForFigures(item)}
                    </div>

                case item > 120:
                    return <div className='home board-tile playable red' id={item} key={index} >
                        {checkForFigures(item)}
                    </div>

                case item > 110:
                    return <div className='home board-tile playable blue' id={item} key={index}>
                        {checkForFigures(item)}
                    </div>

                case item > 100:
                    return <div className='home board-tile playable yellow' id={item} key={index}>
                        {checkForFigures(item)}
                    </div>

                //finish pole
                case item > 70:
                    return <div className='end board-tile playable green' id={item} key={index}>
                        {greenPlayerFigures.includes(item) ? <div className="figure fin green"></div> : checkForFigures(item)}
                    </div>
                case item > 60:
                    return <div className='end board-tile playable red' id={item} key={index} >
                        {redPlayerFigures.includes(item) ? <div className="figure fin red"></div> : checkForFigures(item)}
                    </div>

                case item > 50:
                    return <div className='end board-tile playable blue' id={item} key={index}>
                        {bluePlayerFigures.includes(item) ? <div className="figure fin blue"></div> : checkForFigures(item)}
                    </div>

                case item > 40:
                    return <div className='end board-tile playable yellow' id={item} key={index}>
                        {/* {console.log('item', yellowPlayerFigures.includes(item))} */}
                        {yellowPlayerFigures.includes(item) ? <div className="figure fin yellow"></div> : checkForFigures(item)}
                    </div>

                //startovni pole
                case item === 31:
                    return <div className='starting board-tile green' id={item} key={index}>
                        {checkForFigures(item)}
                    </div>
                case item === 21:
                    return <div className='starting board-tile red' id={item} key={index} >
                        {checkForFigures(item)}
                    </div>
                case item === 11:
                    return <div className='starting board-tile blue' id={item} key={index}>
                        {checkForFigures(item)}
                    </div>
                case item === 1:
                    return <div className='starting board-tile yellow' id={item} key={index}>
                        {checkForFigures(item)}
                    </div>

                //klasicky pole
                case item > 0:
                    return <div className="board-tile playable" id={item} key={index} >
                        {checkForFigures(item)}
                    </div>

                //okoli
                default:
                    return <div className="board-tile non-playable" id={'np' + index} key={index}></div>
            }
        }
        )
        return tempBoard;
    }

    return <>
        <h1>Člověče nezlobři se</h1>
        <h3>{playersTurn} players turn.</h3>
        <h3>Last roll: {lastRoll}</h3>

        <div id="board">
            {renderBoard()}
        </div>

        <div id="controls">
            {buttonVisibility ? <button id='roll-dice-button' onClick={() => { rollDice(); setbuttonVisibility(false) }}>Roll dice!</button> : null}
        </div>
    </>
}

export default GameBoard;