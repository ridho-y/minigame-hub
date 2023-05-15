import { useState, useEffect } from 'react';
import { startBoard, moveUp, moveRight, moveDown, moveLeft } from './helpers/game2048.js'

function Game2048 () {

    const initialBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    const [board, setBoard] = useState(startBoard(initialBoard));

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown);
    
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
    
    return (
        <div id='game'>
            <div id='board'>
                {board.map(r => {
                    return r.map(c => {
                        return <Cell val={c}/>
                    })
                })}
            </div>
        </div>
    );
}

function Cell(props) {

    let cellClassName = 'cell';
    if (props.val == '0') {
        cellClassName += ' invisible'
    } else if (props.val == '2') {
        cellClassName += ' num-2';
    } else if (props.val == '4') {
        cellClassName += ' num-4';
    } else if (props.val == '8') {
        cellClassName += ' num-8';
    } else if (props.val == '16') {
        cellClassName += ' num-16';
    } else if (props.val == '32') {
        cellClassName += ' num-32';
    } else if (props.val == '64') {
        cellClassName += ' num-64';
    } else if (props.val == '128') {
        cellClassName += ' num-128';
    } else if (props.val == '512') {
        cellClassName += ' num-512';
    } else if (props.val == '1024') {
        cellClassName += ' num-1024';
    } else if (props.val == '2048') {
        cellClassName += ' num-2048';
    }

    return (
        <div className={cellClassName}>{props.val}</div>
    )
}

export default Game2048;
