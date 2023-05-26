import React, { useEffect, useState } from 'react'
import GridContainer from '../helpers/GridContainer'
import { Button, Typography } from '@mui/material'
import useInterval from 'use-interval'
import UpArrow from '../assets/up-arrow.svg'
import DownArrow from '../assets/down-arrow.svg'
import LeftArrow from '../assets/left-arrow.svg'
import RightArrow from '../assets/right-arrow.svg'

function Tetris () {


    if (localStorage.getItem('playoz-tetris-highest-score') === undefined) {
        localStorage.setItem('playoz-tetris-highest-score', '0')
    }

    // list of chunks and each chunk has list of blocks, each block stores its x and y val
    const [chunks, setChunks] = useState([])
    const [gameActive, setGameActive] = useState(false)
    const [score, setScore] = useState(0)
    // chunks = [[{x: 1, y: 2, active: true, centre: false}, {x: 1, y: 3, active: true, centre: false}]]

    // upon changing of chunks set the grid
    const height = 20;
    const width = 10;
    let initGrid = []
    for (let i = 0; i < height; i++) {
        initGrid.push(Array(width).fill(false))
    }
    
    let initColourGrid = []
    for (let i = 0; i < height; i++) {
        initColourGrid.push(Array(width).fill('black'))
    }

    const [grid, setGrid] = useState(initGrid)
    const [colourGrid, setColourGrid] = useState(initColourGrid);

    const canMoveChunkRight = (chunk) => {
        // Checks the grid if it can move further down
        // chunk = [{x: 0, y: 0, active: true}]

        // Get righest of blocks
        let righestBlocks = {}
        for (let i = 0; i < chunk.length; i++) {
            let block = chunk[i]
            if (block.y in righestBlocks) {
                if (block.x > righestBlocks[block.y].x) {
                    righestBlocks[block.y] = {...block}
                }
            } else {
                righestBlocks[block.y] = {...block}
            }
        }
        righestBlocks = Object.values(righestBlocks)

        // console.log(JSON.stringify(righestBlocks));

        for (let i = 0; i < righestBlocks.length; i++) {
            let block = righestBlocks[i]
            if (block.x < width - 1) {
                // console.log(`GRID; ${JSON.stringify(grid)}`)
                // console.log(`At pos; ${block.y} ${block.x}`)
                // console.log(`Checking pos; ${block.y} ${block.x + 1}, == ${grid[block.y][block.x + 1]}`)
            }
            
            if (block.x >= width - 1 || grid[block.y][block.x + 1] === true || !block.active) {
                return false
            }
        }

        // console.log('Can move')
        return true
    }



    // // Allow movement of active chunks
    const moveActiveChunksRight = () => {
        setChunks(chunks => {
            let newChunks = [];
            for (let i = 0; i < chunks.length; i++) {
                let currChunk = [];
                // console.log(JSON.stringify(grid));
                if (canMoveChunkRight(chunks[i])) {
                    for (let j = 0; j < chunks[i].length; j++) {
                        currChunk.push({x: chunks[i][j].x + 1, y: chunks[i][j].y, active: chunks[i][j].active, centre: chunks[i][j].centre, colour: chunks[i][j].colour})
                    }
                    newChunks.push(currChunk)
                } else {
                    for (let j = 0; j < chunks[i].length; j++) {
                        currChunk.push({x: chunks[i][j].x, y: chunks[i][j].y, active: chunks[i][j].active, centre: chunks[i][j].centre, colour: chunks[i][j].colour})
                    }
                    newChunks.push(currChunk)
                }
            }
            // console.log(JSON.stringify(chunks))
            return newChunks;
        })
        console.log('Move right');
    }

    const canMoveChunkLeft = (chunk) => {
        // Checks the grid if it can move further down
        // chunk = [{x: 0, y: 0, active: true}]

        // Get leftest of blocks
        let leftestBlocks = {}
        for (let i = 0; i < chunk.length; i++) {
            let block = chunk[i]
            if (block.y in leftestBlocks) {
                if (block.x < leftestBlocks[block.y].x) {
                    leftestBlocks[block.y] = {...block}
                }
            } else {
                leftestBlocks[block.y] = {...block}
            }
        }
        leftestBlocks = Object.values(leftestBlocks)

        // console.log(JSON.stringify(leftestBlocks));

        for (let i = 0; i < leftestBlocks.length; i++) {
            let block = leftestBlocks[i]

            if (block.x <= 0 || grid[block.y][block.x - 1] === true || !block.active) {
                return false
            }
        }

        // console.log('Can move')
        return true
    }

    // canMoveChunkLeft([{x: 0, y: 0, active: true}, {x: 1, y: 0, active: true}, {x: 1, y: 1, active: true}])


    const moveActiveChunksLeft = () => {
        setChunks(chunks => {
            let newChunks = [];
            for (let i = 0; i < chunks.length; i++) {
                let currChunk = [];
                // console.log(JSON.stringify(grid));
                if (canMoveChunkLeft(chunks[i])) {
                    for (let j = 0; j < chunks[i].length; j++) {
                        currChunk.push({x: chunks[i][j].x - 1, y: chunks[i][j].y, active: chunks[i][j].active, centre: chunks[i][j].centre, colour: chunks[i][j].colour})
                    }
                    newChunks.push(currChunk)
                } else {
                    for (let j = 0; j < chunks[i].length; j++) {
                        currChunk.push({x: chunks[i][j].x, y: chunks[i][j].y, active: chunks[i][j].active, centre: chunks[i][j].centre, colour: chunks[i][j].colour})
                    }
                    newChunks.push(currChunk)
                }
            }
            // console.log(JSON.stringify(chunks))
            return newChunks;
        })
        console.log('Move left');
    }

    const moveActiveChunksDown = () => {
        setChunks(chunks => {
            let newChunks = [];
            for (let i = 0; i < chunks.length; i++) {
                let currChunk = [];
                // console.log(JSON.stringify(grid));
                if (canMoveChunkDown(chunks[i])) {
                    for (let j = 0; j < chunks[i].length; j++) {
                        currChunk.push({x: chunks[i][j].x, y: chunks[i][j].y + 1, active: chunks[i][j].active, centre: chunks[i][j].centre, colour: chunks[i][j].colour})
                    }
                    newChunks.push(currChunk)
                } else {
                    for (let j = 0; j < chunks[i].length; j++) {
                        currChunk.push({x: chunks[i][j].x, y: chunks[i][j].y, active: chunks[i][j].active, centre: chunks[i][j].centre, colour: chunks[i][j].colour})
                    }
                    newChunks.push(currChunk)
                }
            }
            // console.log(JSON.stringify(chunks))
            return newChunks;
        })        
    }

    // const moveInactiveChunksDown = (i) => {
    //     // Consider all inactive blocks as one chunk and shift them down
    //     setChunks(chunks => {
    //         let newChunks = JSON.parse(JSON.stringify(chunks))

    //         newChunks.forEach(chunk => {
    //             chunk.forEach(block => {
    //                 if (!block.active && block.y < i) {
    //                     block.y += 1
    //                 }
    //             })
    //         });

    //         return newChunks;
    //     }) 
    // }

    const rotateChunk = (chunk) => {

        // JSON.parse(JSON.stringify(thing)) allows a deep copy of thing
        const ogChunk = JSON.parse(JSON.stringify(chunk))
        console.log(`OG: ${JSON.stringify(ogChunk)}`)
        // Find centre point
        let centreX = chunk[0].x
        let centreY = chunk[0].y
        chunk.forEach(b => {
            if (b.centre) {
                centreX = b.x
                centreY = b.y
            }
        });

        // Remove offset
        let newChunk = [...chunk]
        for (let i = 0; i < newChunk.length; i++) {
            newChunk[i].x -= centreX;
            newChunk[i].y -= centreY;
        }

        // Transpose
        for (let i = 0; i < newChunk.length; i++) {
            [newChunk[i].x, newChunk[i].y] = [newChunk[i].y, newChunk[i].x]
        }

        // Reverse xs'
        for (let i = 0; i < newChunk.length; i++) {
            newChunk[i].x *= -1;
        }

        // Add offset
        for (let i = 0; i < newChunk.length; i++) {
            newChunk[i].x += centreX;
            newChunk[i].y += centreY;
        }
        console.log(`OG2: ${JSON.stringify(ogChunk)}`)
        // Check if any of these blocks are taken in the grid
        console.log(JSON.stringify(newChunk))
        for (let i = 0; i < newChunk.length; i++) {
            let b = newChunk[i]
            console.log(b.x, b.y)
            if (b.y >= height || b.y < 0 || b.x < 0 || b.x >= width || (grid[b.y][b.x] && inactiveBlock(b.x, b.y))) {
                console.log('NO')
                // console.log(JSON.stringify(ogChunk))
                return ogChunk
            }
        }
        console.log('YES')
        
        return newChunk
    }

    const inactiveBlock = (xPos, yPos) => {
        
        for (let i = 0; i < chunks.length; i++) {
            for (let j = 0; j < chunks[i].length; j++) {
                let b = chunks[i][j]
                if (b.x === xPos && b.y === yPos) {
                    return !b.active
                }
            }
        }
        return true
    }


    // rotateChunk([{y: 1, x: 2, centre: false}, {y: 1, x: 3, centre: true}, {y: 1, x: 4, centre: false}, {y: 2, x: 2, centre: false}])

    const rotateActiveChunks = () => {
        setChunks(chunks => {

            let newChunks = JSON.parse(JSON.stringify(chunks))
            for (let i = 0; i < newChunks.length; i++) {
                if (newChunks[i].length > 0 && newChunks[i][0].active) {
                    newChunks[i] = rotateChunk(newChunks[i])
                }
            }

            return newChunks;
        })         
    }


    // It is best to avoid DOM manipulation in React
    // since event will not be able to keep track on how
    // the state changes, and will only know the state when
    // the first event listener was created, therefore for 
    // functions moveActiveChunksLeft/Right(), the state of
    // grid will be all false, so to fix this, useEffect has
    // no dependency array and will be remade at EVERY render
    // There may be a better way to do this, however I will 
    // stick to this for now as it seems inefficient to 
    // addEventListener at EVERY render
    useEffect(() => {
        const handleKeyDown = (e) => {
            // console.log(e.key)
            if (e.key === 'ArrowLeft') {
                moveActiveChunksLeft();
            } else if (e.key === 'ArrowRight') {
                moveActiveChunksRight();
            } else if (e.key === 'ArrowDown') {
                moveActiveChunksDown();
            } else if (e.key === 'ArrowUp') {
                rotateActiveChunks();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown)
    })

    // Place chunks on grid
    useEffect(() => {
        // console.log('WHOO')
        for (let i = 0; i < chunks.length; i++) {
            let chunk = chunks[i];
            for (let j = 0; j < chunk.length; j++) {
                let block = chunk[j];
                // console.log(block)
                // console.log(JSON.stringify(grid))
                setGrid(() => {
                    let newGrid = [...initGrid];
                    newGrid[block.y][block.x] = true;
                    // console.log(newGrid)
                    return newGrid;
                })

            }
        }
    }, [chunks])


    useEffect(() => {
        // console.log('WHOO')
        for (let i = 0; i < chunks.length; i++) {
            let chunk = chunks[i];
            for (let j = 0; j < chunk.length; j++) {
                let block = chunk[j];
                // console.log(block)
                // console.log(JSON.stringify(grid))
                setColourGrid(() => {
                    let newGrid = [...initColourGrid];
                    newGrid[block.y][block.x] = block.colour;
                    // console.log(newGrid)
                    return newGrid;
                })

            }
        }
    }, [chunks])

    const spawnChunk = () => {

        const chunksPossible = [
            [{x: 0, y: 0, active: true, centre: false, colour: 'red'}, {x: 1, y: 0, active: true, centre: true, colour: 'red'}, {x: 2, y: 0, active: true, centre: false, colour: 'red'}, {x: 3, y: 0, active: true, centre: false, colour: 'red'}],
            [{x: 0, y: 0, active: true, centre: false, colour: 'green'}, {x: 1, y: 0, active: true, centre: true, colour: 'green'}, {x: 2, y: 0, active: true, centre: false, colour: 'green'}, {x: 2, y: 1, active: true, centre: false, colour: 'green'}],
            [{x: 0, y: 0, active: true, centre: false, colour: 'blue'}, {x: 1, y: 0, active: true, centre: true, colour: 'blue'}, {x: 2, y: 0, active: true, centre: false, colour: 'blue'}, {x: 0, y: 1, active: true, centre: false, colour: 'blue'}],
            [{x: 0, y: 0, active: true, centre: false, colour: 'yellow'}, {x: 1, y: 0, active: true, centre: true, colour: 'yellow'}, {x: 2, y: 0, active: true, centre: false, colour: 'yellow'}, {x: 1, y: 1, active: true, centre: false, colour: 'yellow'}],
            [{x: 0, y: 0, active: true, centre: false, colour: 'purple'}, {x: 1, y: 0, active: true, centre: true, colour: 'purple'}, {x: 0, y: 1, active: true, centre: false, colour: 'purple'}, {x: 1, y: 1, active: true, centre: false, colour: 'purple'}],
            [{x: 0, y: 0, active: true, centre: false, colour: 'blue'}, {x: 1, y: 0, active: true, centre: true, colour: 'blue'}, {x: 1, y: 1, active: true, centre: false, colour: 'blue'}, {x: 2, y: 1, active: true, centre: false, colour: 'blue'}],
            [{x: 0, y: 1, active: true, centre: false, colour: 'orange'}, {x: 1, y: 1, active: true, centre: false, colour: 'orange'}, {x: 1, y: 0, active: true, centre: true, colour: 'orange'}, {x: 2, y: 0, active: true, centre: false, colour: 'orange'}]
        ]

        console.log('Spawning chunk!')
        setChunks(chunks => {
            const randomChunk = chunksPossible[Math.floor(Math.random() * chunksPossible.length)];
            // let newChunks = [...chunks, [{x: 0, y: 0, active: true, centre: false}, {x: 1, y: 0, active: true, centre: true}, {x: 1, y: 1, active: true, centre: false}, {x: 0, y: 1, active: true, centre: false}]];
            let newChunks = [...chunks, randomChunk]
            return newChunks;
        })
        console.log('Spawned chunk!')
    }
    
    const canMoveChunkDown = (chunk) => {
        // Checks the grid if it can move further down
        // chunk = [{x: 0, y: 0, active: true}]
        // console.log(JSON.stringify(grid))

        // Get lower level of blocks
        let lowestBlocks = {}
        for (let i = 0; i < chunk.length; i++) {
            let block = chunk[i]
            if (block.x in lowestBlocks) {
                if (block.y > lowestBlocks[block.x].y) {
                    lowestBlocks[block.x] = {...block}
                }
            } else {
                lowestBlocks[block.x] = {...block}
            }
        }
        lowestBlocks = Object.values(lowestBlocks)
        // console.log(JSON.stringify(lowestBlocks))
        for (let i = 0; i < lowestBlocks.length; i++) {
            let block = lowestBlocks[i]

            if (block.y >= height - 1 || grid[block.y + 1][block.x] === true || !block.active) {
                // console.log('Cant move')
                return false
            }
        }

        // console.log('Can move')
        return true
    }

    const hasLost = () => {

        for (let i = 0; i < chunks.length; i++) {
            for (let j = 0; j < chunks[i].length; j++) {
                let block = chunks[i][j]
                if (!block.active && block.y === 0) {
                    return true
                } 
            }
        }
        return false
    }

    // Check if the user has lost
    useEffect(() => {
        if (hasLost()) {
            stopGame();
            alert('You lose!')
        }
    }, [chunks])


    // useInterval is a custom React hook
    // It allows so that at every interval, the call back
    // is able to see the updated state, particularly for
    // canMoveChunkDown(), that needs to know the updated
    // state of grid, after every movement
    // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    // console.log('Moving down now')
    useInterval(() => {
        // console.log('Here!')
        if (gameActive) {
            setChunks(chunks => {
                // console.log('Moving!')
                // console.log(JSON.stringify(chunks))
                let newChunks = [];
                for (let i = 0; i < chunks.length; i++) {
                    let currChunk = [];
                    // console.log(JSON.stringify(grid));
                    if (canMoveChunkDown(chunks[i])) {
                        // console.log('Can move chunk down')
                        for (let j = 0; j < chunks[i].length; j++) {
                            currChunk.push({x: chunks[i][j].x, y: chunks[i][j].y + 1, active: true, centre: chunks[i][j].centre, colour: chunks[i][j].colour})
                        }
                        newChunks.push(currChunk)
                    } else {
                        // console.log('Cant move chunk down')
                        for (let j = 0; j < chunks[i].length; j++) {
                            currChunk.push({x: chunks[i][j].x, y: chunks[i][j].y, active: false, centre: chunks[i][j].centre, colour: chunks[i][j].colour})
                        }
                        newChunks.push(currChunk)
                    }
                }
                // console.log(JSON.stringify(chunks))
                return newChunks;
            })
        }
    }, 1000)

    // YOU NEED TO BE CAREFUL WHAT TO PUT IN DEPENCEY ARRAY, [grid] or [chunks] have detrimental effects!!
    // [chunks] bad idea circular loop
    // If theres no active chunks, spawn a new chunk
    useEffect(() => {
        if (gameActive) {
            setChunks(chunks => {
                for (let i = 0; i < chunks.length; i++) {
                    for (let j = 0; j < chunks[i].length; j++) {
                        if (chunks[i][j].active) {
                            return chunks
                        }
                    }
                }
                spawnChunk();
                return chunks
            })
        }
    }, [grid])

    // Check if its entirely an inactive row
    const inactiveRow = (i) => {
        console.log(`test ${width.length}`)
        for (let j = 0; j < width; j++) {
            console.log(`LOL: ${inactiveBlock(j, i)}`)
            if (!inactiveBlock(j, i)) {
                console.log('here5')
                return false
            }
        }
        console.log('poop')
        return true
    }

    // Eliminate a row if all of the row is filled with inactive blocks
    useEffect(() => {
        if (gameActive) {
            for (let i = height - 1; i >= 0; i--) {
                
                // console.log(grid[i].filter(v => !v).length, inactiveRow(i))
                if (grid[i].filter(v => !v).length === 0 && inactiveRow(i)) {
                    console.log(`ELIMINATE ROW! ${i}`)
                    console.log(JSON.stringify(grid))
                    setScore(score => score + 100)

                    // Eliminate row and shift rows < i down
                    setChunks(chunks => {

                        let cchunks = JSON.parse(JSON.stringify(chunks))
                        console.log('MOVE DOWN CHUNKS!!')
                        let newChunks = []
                        for (let j = 0; j < cchunks.length; j++) {
                            let newChunk = []
                            for (let k = 0; k < cchunks[j].length; k++) {
                                if (cchunks[j][k].y !== i) {
                                    newChunk.push(JSON.parse(JSON.stringify(cchunks[j][k])))
                                }
                            }
                            newChunks.push(newChunk)
                        }

                        let moveDownChunks = []
                        for (let j = 0; j < newChunks.length; j++) {
                            let newChunk = []
                            for (let k = 0; k < newChunks[j].length; k++) {
                                if (newChunks[j][k].y < i) {
                                    let newBlock = JSON.parse(JSON.stringify(newChunks[j][k]))
                                    newBlock.y += 1
                                    newChunk.push(newBlock)
                                } else {
                                    newChunk.push(JSON.parse(JSON.stringify(newChunks[j][k])))
                                }
                            }
                            moveDownChunks.push(newChunk)
                        }
                        console.log(JSON.stringify(moveDownChunks))
                        return moveDownChunks
                    })

                }
            }
        }
    }, [grid])

    const initGame = () => {
        if (!gameActive) {
            setGameActive(true);
            setChunks([]);
            setScore(0);
            setGrid(initGrid);
            spawnChunk();
        }
    }

    const stopGame = () => {
        setGameActive(false)
        localStorage.setItem('playoz-tetris-highest-score', Math.max(score, localStorage.getItem('playoz-tetris-highest-score')))
    }

    return (
        <GridContainer className='tetris-background'>
            <div className='tetris-game'>

                <div className='tetris-section'>
                    <div className='tetris-instructions'>
                        <Typography variant='h6'>Keyboard Controls</Typography>
                        <br></br>
                        <div className='arrow-instruction'>
                            <img src={UpArrow} className='arrow'></img>
                            <Typography variant='body2' className='inline-block'>Rotate Tetris block</Typography>
                        </div>
                        <div className='arrow-instruction'>
                            <img src={LeftArrow} className='arrow'></img>
                            <Typography variant='body2' className='inline-block'>Move Tetris block left</Typography>
                        </div>
                        <div className='arrow-instruction'>
                            <img src={RightArrow} className='arrow'></img>
                            <Typography variant='body2' className='inline-block'>Move Tetris block right</Typography>
                        </div>
                        <div className='arrow-instruction'>
                            <img src={DownArrow} className='arrow'></img>
                            <Typography variant='body2' className='inline-block'>Move Tetris block down</Typography>
                        </div>
                    </div>
                </div>
                <div className='tetris-section'>
                    <Typography variant='h6'>Score: {score}</Typography>
                    <div className='tetris-grid'>
                        {grid.map((r, i) => {
                            return (
                                <div key={i} className='tetris-row'>
                                    {console.log(JSON.stringify(colourGrid))}
                                    {r.map((c, j) => <TetrisBlock key={j} active={c} colour={colourGrid[i][j]}/>)}
                                </div>
                            )
                        })}
                    </div>
                    <br></br>
                    <div>
                        {!gameActive ? <Button variant='contained' color='success' size='small' onClick={initGame}>Start Game</Button> : <Button variant='contained' color='error' size='small' onClick={stopGame}>Finish Game</Button>}
                    </div>
                </div>
                <div className='tetris-section'>
                    <div className='tetris-highest-score'>
                        <Typography variant='h6'>Your Highest Score</Typography>
                        <Typography variant='h3' sx={{ textAlign: 'center' }}>{localStorage.getItem('playoz-tetris-highest-score')}</Typography>
                    </div>
                </div>
            </div>
            
            
        </GridContainer>
    );
}

function TetrisBlock(props) {
    
    let bg = '#202020'
    if (props.active) {
        bg = props.colour
    } else {
        bg = '#202020'
    }

    return (
        <div className='tetris-block tetris-dark' style={{ backgroundColor: bg }}></div>
    )
}

export default Tetris;