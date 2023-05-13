import React, { useEffect, useState } from 'react';
import { strs } from '../data/blanko.js'
import GridContainer from '../helpers/GridContainer.jsx';
import { Box, Button, Input, Typography } from '@mui/material';

function Blanko() {

    const [word, setWord] = useState('');
    const [blankIdxs, setBlankIdxs] = useState([]);
    const [currWord, setCurrWord] = useState([]);

    const initGame = () => {
        let initWord = strs[Math.floor(Math.random() * strs.length)];

        let initBlankIdxs = []
        for (let i = 0; i < initWord.length; i++) {
            if (initWord[i] !== ' ') {
                initBlankIdxs.push(i)
            } 
        }
        initBlankIdxs = initBlankIdxs.sort(() => Math.random() - Math.random()).slice(0, 3);

        let initCurrWord = []
        for (let i = 0; i < initWord.length; i++) {
            if (initBlankIdxs.includes(i)) {
                initCurrWord.push(null)
            } else {
                initCurrWord.push(initWord[i])
            }
        }

        setWord(initWord);
        setBlankIdxs(initBlankIdxs);
        setCurrWord(initCurrWord);
    }

    useEffect(() => {
        if (currWord.length > 0 && currWord.join('') === word) {
            setTimeout(() => {
                alert('You got it!')
                setCurrWord([]);
                setReset(reset => !reset)
            }, 100)
        }
    }, [currWord])

    // ** Starting game and reset functionality **
    // The purpose of this useEffect and useState is to allow the reset
    // of input fields upon the changing of a word (on reset).
    // If this was not present, then the letters on input would remain
    // there even on the next new word.
    const [reset, setReset] = useState(false)
    useEffect(() => {
        initGame();
    }, [reset])

    return (
        <GridContainer>
            <Typography>Guess the Aussie slang!</Typography>
            <br></br>
            <Box className='word'>
                {currWord.map((c, i) => <Square key={i} idx={i} letter={c} blankIdxs={blankIdxs} setCurrWord={setCurrWord} word={word} />)}
            </Box>
            <br></br>
            <Button variant='outlined' color='error' size='small' style={{ position: 'absolute', bottom: '20px'}} onClick={initGame}>Reset</Button>
        </GridContainer>
    )
}

function Square(props) {

    const [input, setInput] = useState('')
    const handleChange = (e) => {
        setInput(e.target.value)
        props.setCurrWord(currWord => {
            let newCurrWord = [...currWord]
            newCurrWord[props.idx] = e.target.value
            return newCurrWord
        })
    }

    let space = '';
    if (props.blankIdxs.includes(props.idx)) {
        space = <Input sx={{ mx: 1 }} inputProps={{ maxLength: 1, style: { textAlign: 'center' } }} onChange={handleChange} value={input} name={`${Math.floor(Math.random() * 10000)}`}/>
    } else {
        space = <Typography>{props.word[props.idx]}</Typography>
    }

    return (
        <Box className='square'>
            {space}
        </Box>
    )
}


export default Blanko;
