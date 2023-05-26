import React, { useEffect, useState } from 'react'

import Aimg1 from '../data/modern-family-1/1.jpg';
import Aimg2 from '../data/modern-family-1/2.jpg';
import Aimg3 from '../data/modern-family-1/3.jpg';
import Aimg4 from '../data/modern-family-1/4.jpg';
import Aimg5 from '../data/modern-family-1/5.jpg';
import Aimg6 from '../data/modern-family-1/6.jpg';
import Aimg7 from '../data/modern-family-1/7.jpg';
import Aimg8 from '../data/modern-family-1/8.jpg';
import Bimg1 from '../data/modern-family-2/B1.jpg';
import Bimg3 from '../data/modern-family-2/B3.jpg';
import Bimg4 from '../data/modern-family-2/B4.jpg';
import Bimg5 from '../data/modern-family-2/B5.jpg';
import Bimg6 from '../data/modern-family-2/B6.jpg';
import Bimg7 from '../data/modern-family-2/B7.jpg';
import Bimg8 from '../data/modern-family-2/B8.jpg';
import Bimg9 from '../data/modern-family-2/B9.jpg';
import Cimg1 from '../data/modern-family-3/1.jpg';
import Cimg3 from '../data/modern-family-3/3.jpg';
import Cimg4 from '../data/modern-family-3/4.jpg';
import Cimg5 from '../data/modern-family-3/5.jpg';
import Cimg6 from '../data/modern-family-3/6.jpg';
import Cimg7 from '../data/modern-family-3/7.jpg';
import Cimg8 from '../data/modern-family-3/8.jpg';
import Cimg9 from '../data/modern-family-3/9.jpg';
import Dimg1 from '../data/modern-family-4/1.jpg';
import Dimg2 from '../data/modern-family-4/2.jpg';
import Dimg3 from '../data/modern-family-4/3.jpg';
import Dimg4 from '../data/modern-family-4/4.jpg';
import Dimg5 from '../data/modern-family-4/5.jpg';
import Dimg6 from '../data/modern-family-4/6.jpg';
import Dimg7 from '../data/modern-family-4/7.jpg';
import Dimg8 from '../data/modern-family-4/8.jpg';
import GridContainer from '../helpers/GridContainer';
import { Button, Typography } from '@mui/material';

function Slido() {

    // create a state of all tiles []
    const [tiles, setTiles] = useState([])
    const gameImageOptions = [
        [null, Aimg1, Aimg2, Aimg3, Aimg4, Aimg5, Aimg6, Aimg7, Aimg8],
        [Bimg1, null, Bimg3, Bimg4, Bimg5, Bimg6, Bimg7, Bimg8, Bimg9],
        [Cimg1, null, Cimg3, Cimg4, Cimg5, Cimg6, Cimg7, Cimg8, Cimg9],
        [null, Dimg1, Dimg2, Dimg3, Dimg4, Dimg5, Dimg6, Dimg7, Dimg8],
    ]

    const selectRandomImg = () => {
        const newImg = [...gameImageOptions[Math.floor(Math.random() * gameImageOptions.length)]]
        return newImg;
    }

    const [answer, setAnswer] = useState([])

    const jumbleImgs = (imgs) => {
        const randomImgs = imgs.sort(() => .5 - Math.random());
        setTiles([...randomImgs]);
    }

    const initGame = () => {
        const imgs = selectRandomImg()
        setAnswer([...imgs])
        jumbleImgs([...imgs])
    }

    useEffect(() => {
        initGame();
    }, [])

    useEffect(() => {
        if ((JSON.stringify(tiles) === JSON.stringify(answer)) && tiles.length > 0) {
            setTimeout(() => {
                alert('You got it!');
                initGame();
            }, 100)
        }
    }, [tiles])

    const solve = () => {
        setTiles([...answer])
    }

    return (
        <>
            <GridContainer className='slido-background'>
                <Typography variant='body1' style={{ backgroundColor: 'white', borderRadius: '5px', padding: '0 10px' }}>Click a tile to move it into the empty position</Typography>
                <div className='grid'>
                    <div className='grid-row'>{tiles.slice(0,3).map((t, i) => <Tile key={i} img={t} pos={i} tiles={tiles} setTiles={setTiles}/>)}</div>
                    <div className='grid-row'>{tiles.slice(3,6).map((t, i) => <Tile key={i} img={t} pos={i + 3} tiles={tiles} setTiles={setTiles}/>)}</div>
                    <div className='grid-row'>{tiles.slice(6).map((t, i) => <Tile key={i} img={t} pos={i + 6} tiles={tiles} setTiles={setTiles}/>)}</div>
                </div>
                <br></br>
                <div>
                    <Button variant='contained' color='success' size='small' onClick={initGame}>New Meme</Button>&nbsp;&nbsp;
                    <Button variant='contained' color='warning' size='small' onClick={() => jumbleImgs([...answer])}>Jumble</Button>&nbsp;&nbsp;
                    <Button variant='contained' color='error' size='small' onClick={solve}>I Give Up</Button>
                </div>
               
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
        // console.log(validPos, props.pos);
        return validPos.includes(props.pos)
    }

    const handleClick = () => {
        // console.log('Testing...')
        if (nextToValid()) {
            // console.log('Valid')
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