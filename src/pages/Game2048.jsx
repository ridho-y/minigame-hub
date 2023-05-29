import { useState, useEffect } from 'react';
import { startBoard, moveUp, moveRight, moveDown, moveLeft, getScore, setScore2 } from './helpers/game2048.js'
import '../styles/Game2048.css'
import GridContainer from '../helpers/GridContainer.jsx';
import { Typography } from '@mui/material';

function Game2048 () {
    
    const initialBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
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
                if (board[i][j] === 2048) {
                    setTimeout(() => {
                        alert('You win! 2048!')
                        setBoard(startBoard([...initialBoard]))
                    }, 100)
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
    

    return (
        <GridContainer className='background-2048'>
            <div className='game2048-header'>
                <Typography className='game2048-name'>2048</Typography>
                <div className='game2048-info'>
                    <span className='game2048-score'><Typography className='info-name'>SCORE</Typography><Typography className='info-num'>{score}</Typography></span>
                    <span className='game2048-highest-score'><Typography className='info-name'>BEST</Typography><Typography className='info-num'>{localStorage.getItem('playoz-2048-highest-score')}</Typography></span>
                </div>
            </div>
            <br></br>
            
            <div id='game'>
                <div id='board'>
                    {board.map((r,i) => {
                        return r.map((c,j) => {
                            return <Cell key={j} val={c} posX={j} posY={i}/>
                        })
                    })}
                </div>
            </div>
        </GridContainer>

    );
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
