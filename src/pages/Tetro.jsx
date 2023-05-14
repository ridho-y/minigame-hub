import React, { useEffect, useState } from 'react'
import GridContainer from '../helpers/GridContainer'
import { Button, Grid } from '@mui/material'
import useInterval from 'use-interval'

function Tetro() {

    // list of chunks and each chunk has list of blocks, each block stores its x and y val
    const [chunks, setChunks] = useState([])
    // chunks = [[{x: 1, y: 2, active: true}, {x: 1, y: 3, active: true}]]

    // upon changing of chunks set the grid
    const height = 20;
    const width = 10;
    let initGrid = []
    for (let i = 0; i < height; i++) {
        initGrid.push(Array(width).fill(false))
    }

    const [grid, setGrid] = useState(initGrid)

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
                        currChunk.push({x: chunks[i][j].x + 1, y: chunks[i][j].y, active: chunks[i][j].active})
                    }
                    newChunks.push(currChunk)
                } else {
                    for (let j = 0; j < chunks[i].length; j++) {
                        currChunk.push({x: chunks[i][j].x, y: chunks[i][j].y, active: chunks[i][j].active})
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

    canMoveChunkLeft([{x: 0, y: 0, active: true}, {x: 1, y: 0, active: true}, {x: 1, y: 1, active: true}])


    const moveActiveChunksLeft = () => {
        setChunks(chunks => {
            let newChunks = [];
            for (let i = 0; i < chunks.length; i++) {
                let currChunk = [];
                // console.log(JSON.stringify(grid));
                if (canMoveChunkLeft(chunks[i])) {
                    for (let j = 0; j < chunks[i].length; j++) {
                        currChunk.push({x: chunks[i][j].x - 1, y: chunks[i][j].y, active: chunks[i][j].active})
                    }
                    newChunks.push(currChunk)
                } else {
                    for (let j = 0; j < chunks[i].length; j++) {
                        currChunk.push({x: chunks[i][j].x, y: chunks[i][j].y, active: chunks[i][j].active})
                    }
                    newChunks.push(currChunk)
                }
            }
            // console.log(JSON.stringify(chunks))
            return newChunks;
        })
        console.log('Move left');
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

    const spawnChunk = () => {
        console.log('Spawning chunk!')
        setChunks(chunks => {
            let newChunks = [...chunks, [{x: 0, y: 0, active: true}, {x: 1, y: 0, active: true}, {x: 1, y: 1, active: true}]];
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


    // useInterval is a custom React hook
    // It allows so that at every interval, the call back
    // is able to see the updated state, particularly for
    // canMoveChunkDown(), that needs to know the updated
    // state of grid, after every movement
    // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    // console.log('Moving down now')
    useInterval(() => {
        // console.log('Here!')
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
                        currChunk.push({x: chunks[i][j].x, y: chunks[i][j].y + 1, active: true})
                    }
                    newChunks.push(currChunk)
                } else {
                    // console.log('Cant move chunk down')
                    for (let j = 0; j < chunks[i].length; j++) {
                        currChunk.push({x: chunks[i][j].x, y: chunks[i][j].y, active: false})
                    }
                    newChunks.push(currChunk)
                }
            }
            // console.log(JSON.stringify(chunks))
            return newChunks;
        })
    }, 1000)

    const initGame = () => {
        console.log('START GAME!')
        spawnChunk();
    }

    return (
        <GridContainer>
            <div className='tetris-grid'>
                {grid.map((r, i) => {
                    return (
                        <div key={i} className='tetris-row'>
                            {r.map((c, j) => <TetrisBlock key={j} active={c}/>)}
                        </div>
                    )
                })}
            </div>
            <br></br>
            <Button variant='contained' color='success' size='small' onClick={initGame}>START</Button>
            <Button variant='contained' color='success' size='small' onClick={spawnChunk}>SPAWN</Button>
        </GridContainer>
    );
}

function TetrisBlock(props) {
    
    let bg = 'white'
    if (props.active) {
        bg = 'red'
    }

    return (
        <div className='tetris-block' style={{ backgroundColor: bg }}></div>
    )
}

export default Tetro;