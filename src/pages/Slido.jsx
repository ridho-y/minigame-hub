import React, { useEffect, useState } from 'react'
import img1 from '../data/shrek/1.png';
import img2 from '../data/shrek/2.png';
import img3 from '../data/shrek/3.png';
import img4 from '../data/shrek/4.png';
import img5 from '../data/shrek/5.png';
import img6 from '../data/shrek/6.png';
import img7 from '../data/shrek/7.png';
import img8 from '../data/shrek/8.png';
import GridContainer from '../helpers/GridContainer';
import { Button } from '@mui/material';

function Slido() {

    // create a state of all tiles []
    const [tiles, setTiles] = useState([])
    const initImgs = [img1, img2, img3, img4, img5, img6, img7, img8, null]

    const initGame = () => {
        const imgs = initImgs.sort(() => .5 - Math.random());
        setTiles(imgs);
    }

    useEffect(() => {
        initGame();
    }, [])

    useEffect(() => {
        if (JSON.stringify(tiles) === JSON.stringify(initImgs)) {
            setTimeout(() => {
                alert('You got it!');
                initGame();
            }, 100)
        }
    }, [tiles])

    return (
        <>
            <GridContainer>
                <div className='grid'>
                    <div className='grid-row'>{tiles.slice(0,3).map((t, i) => <Tile key={i} img={t} pos={i} tiles={tiles} setTiles={setTiles}/>)}</div>
                    <div className='grid-row'>{tiles.slice(3,6).map((t, i) => <Tile key={i} img={t} pos={i + 3} tiles={tiles} setTiles={setTiles}/>)}</div>
                    <div className='grid-row'>{tiles.slice(6).map((t, i) => <Tile key={i} img={t} pos={i + 6} tiles={tiles} setTiles={setTiles}/>)}</div>
                </div>
                <Button variant='outlined' color='error' size='small' style={{ display: 'flex', justifyContent: 'center', position: 'absolute', bottom: '20px'}} onClick={initGame}>Reset</Button>
            </GridContainer>
        </>
    );
}

function Tile(props) {

    // Checks if the current tile is next to an empty tile
    const nextToValid = () => {
        if (props.img === null) {
            return false
        }

        // Get position of empty tile
        const emptyPos = props.tiles.indexOf(null);
        let validPos = [emptyPos + 1, emptyPos - 1, emptyPos - 3, emptyPos + 3];
        validPos = validPos.filter(v => {
            if (emptyPos === 5 || emptyPos === 2) {
                if (v === emptyPos + 1) {
                    return false
                }
            } else if (emptyPos === 3 || emptyPos === 6) {
                if (v === emptyPos - 1) {
                    return false
                }
            }
            return (v >= 0 && v < 9)
        });
        console.log(validPos, props.pos);
        return validPos.includes(props.pos)
    }

    const handleClick = () => {
        console.log('Testing...')
        if (nextToValid()) {
            console.log('Valid')
            props.setTiles(tiles => {
                let newTiles = [...tiles];
                const nullIdx = newTiles.indexOf(null);
                [newTiles[props.pos], newTiles[nullIdx]] = [newTiles[nullIdx], newTiles[props.pos]]
                return newTiles
            })
        }
    }


    let img = <img className='tile-img' src={props.img} alt={'piece of puzzle'}/>
    if (props.img === null) {
        img = <></>
    }

    return(
        <div className='tile' onClick={handleClick}>
            {img}
        </div>
    )
}

export default Slido;