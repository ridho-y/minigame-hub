import { useState, useEffect } from 'react';
import { startBoard, moveUp, moveRight, moveDown, moveLeft, getScore, setScore2 } from './helpers/game2048.js'
import '../styles/Game2048.css'
import GridContainer from '../helpers/GridContainer.jsx';
import { Typography } from '@mui/material';
import UpArrow from '../assets/up-arrow.svg'
import DownArrow from '../assets/down-arrow.svg'
import LeftArrow from '../assets/left-arrow.svg'
import RightArrow from '../assets/right-arrow.svg'
import ConfettiExplosionLarge from '../helpers/ConfettiExplosionLarge.jsx';

function Game2048 () {
    
    const initialBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    const [isExploding, setIsExploding] = useState(false);
    const [board, setBoard] = useState(startBoard([...initialBoard]))
    const [score, setScore] = useState(0)

    if (localStorage.getItem('playoz-2048-highest-score') === null) {
        localStorage.setItem('playoz-2048-highest-score', '0')
    }

    let throttleTimer;
    const throttle = (callback, time) => {
    if (throttleTimer) return;
        throttleTimer = true;
        callback();
        setTimeout(() => {
            throttleTimer = false;
        }, time);
    }

    useEffect(() => {

        let spacesLeft = 0
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 0) {
                    spacesLeft += 1
                }
            }
        }

        console.log(spacesLeft)

        if (spacesLeft === 0) {
            setTimeout(() => {
                alert('You lose!')
                setBoard(startBoard([...initialBoard]))
                setScore2(0)
            }, 100)
        }

    }, [board])

    useEffect(() => {

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 32) {
                    setIsExploding(true)
                    setTimeout(() => {
                        alert('You got it!')
                        setBoard(startBoard([...initialBoard]))
                    }, 100)
                    setTimeout(() => setIsExploding(false), 2000)

                }
            }
        }

    }, [board])

    useEffect(() => {

        document.addEventListener('keydown', (e) => throttle(() => handleKeyDown(e), 100));
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        }

    }, []);



    function handleKeyDown(e) {
        if (e.key === 'ArrowUp') {
            setBoard(board => moveUp([...board]));
        } else if (e.key === 'ArrowRight') {
            setBoard(board => moveRight([...board]));
        } else if (e.key === 'ArrowDown') {
            setBoard(board => moveDown([...board]));
        } else if (e.key === 'ArrowLeft') {
            setBoard(board => moveLeft([...board]));
        }
    }

    useEffect(() => {
        setScore(getScore())
        localStorage.setItem('playoz-2048-highest-score', Math.max(getScore(), localStorage.getItem('playoz-2048-highest-score')))
    })
    

    // RESPONSIVENESS

    const checkMobile = () => {
        if (window.innerWidth <= 1100) {
            return true
        } else {
            return false
        }
    }

    const [isMobile, setIsMobile] = useState(checkMobile())

    useEffect(() => {

        const changeMobile = () => {
            setIsMobile(checkMobile())
        }

        window.addEventListener('resize', changeMobile)

        return () => window.removeEventListener('resize', changeMobile)
    }, [])

    if (isMobile) {
        return (
            <GridContainer className='background-2048'>
                {isExploding && <ConfettiExplosionLarge />}
                <div className='game2048'> 
                    <Game2048Board board={board} score={score} setBoard={setBoard} moveUp={moveUp} moveDown={moveDown} moveRight={moveRight} moveLeft={moveLeft}/>
                    <Game2048Instructions />
                    <Game2048Controls />
                </div>
            </GridContainer>
    
        );
    } else {
        return (
            <GridContainer className='background-2048'>
                {isExploding && <ConfettiExplosionLarge />}
                <div className='game2048'> 
                    <Game2048Instructions />
                    <Game2048Board board={board} score={score} setBoard={setBoard} moveUp={moveUp} moveDown={moveDown} moveRight={moveRight} moveLeft={moveLeft}/>
                    <Game2048Controls />
                </div>
            </GridContainer>
    
        );
    }

}

function Game2048Board(props) {

    return (
        <div className='game2048-section'>
            <div className='game2048-header'>
                <Typography className='game2048-name'>2048</Typography>
                <div className='game2048-info'>
                    <span className='game2048-score'><Typography className='info-name'>SCORE</Typography><Typography className='info-num'>{props.score}</Typography></span>
                    <span className='game2048-highest-score'><Typography className='info-name'>BEST</Typography><Typography className='info-num'>{localStorage.getItem('playoz-2048-highest-score')}</Typography></span>
                </div>
            </div>
            <br></br>
            <div id='game'>
                <div id='board'>
                    {props.board.map((r,i) => {
                        return r.map((c,j) => {
                            return <Cell key={j} val={c} posX={j} posY={i}/>
                        })
                    })}
                </div>
            </div>
            <div className='tetris-settings'>
                <br></br>
                <div className='tetris-controls'>
                    <img src={UpArrow} className='arrow pointer' onClick={() => props.setBoard(board => props.moveUp([...board]))}></img>
                </div>
                <div className='tetris-controls'>
                    <img src={LeftArrow} className='arrow pointer' onClick={() => props.setBoard(board => props.moveLeft([...board]))}></img>
                    <img src={DownArrow} className='arrow pointer' onClick={() => props.setBoard(board => props.moveDown([...board]))}></img>
                    <img src={RightArrow} className='arrow pointer' onClick={() => props.setBoard(board => props.moveRight([...board]))}></img>
                </div>
            </div>
        </div>
    )
}

function Game2048Instructions() {
    return (
        <div className='game2048-section'>
            <div className='game2048-instructions'>
                <Typography variant='h4'>How to Play:</Typography>
                <br></br>
                <Typography variant='body2' className='inline-block'>Swipe the grid&apos;s tiles (up, down, left, or right) to merge matching numbers. When two tiles with the same value collide, they combine. Aim for a tile with a value of 2048 while planning strategic moves.</Typography>
            </div>
        </div>
    )

}

function Game2048Controls() {
    return (
        <div className='game2048-section'>
            <div className='game2048-instructions'>
                <Typography variant='h6'>Keyboard Controls</Typography>
                <br></br>
                <div className='arrow-instruction'>
                    <img src={UpArrow} className='arrow'></img> &nbsp; &nbsp; 
                    <Typography variant='body2' className='inline-block'>Slide blocks up</Typography>
                </div>
                <div className='arrow-instruction'>
                    <img src={LeftArrow} className='arrow'></img> &nbsp; &nbsp; 
                    <Typography variant='body2' className='inline-block'>Slide blocks left</Typography>
                </div>
                <div className='arrow-instruction'>
                    <img src={RightArrow} className='arrow'></img> &nbsp; &nbsp; 
                    <Typography variant='body2' className='inline-block'>Slide blocks right</Typography>
                </div>
                <div className='arrow-instruction'>
                    <img src={DownArrow} className='arrow'></img> &nbsp; &nbsp; 
                    <Typography variant='body2' className='inline-block'>Slide blocks down</Typography>
                </div>
            </div>
        </div>
    )
}

function Cell(props) {

    let cellClassName = 'cell';
    if (props.val === 0) {
        cellClassName += ' invisible'
    } else if (props.val === 2) {
        cellClassName += ' num-2';
    } else if (props.val === 4) {
        cellClassName += ' num-4';
    } else if (props.val === 8) {
        cellClassName += ' num-8';
    } else if (props.val === 16) {
        cellClassName += ' num-16';
    } else if (props.val === 32) {
        cellClassName += ' num-32';
    } else if (props.val === 64) {
        cellClassName += ' num-64';
    } else if (props.val === 128) {
        cellClassName += ' num-128';
    } else if (props.val === 512) {
        cellClassName += ' num-512';
    } else if (props.val === 1024) {
        cellClassName += ' num-1024';
    } else if (props.val === 2048) {
        cellClassName += ' num-2048';
    }

    return (
        <div className={cellClassName} style={{ '--x': props.posX, '--y': props.posY }}><Typography className='cell-font' variant='h4'>{props.val === 0 ? null : props.val}</Typography></div>
    )
}

export default Game2048;
