import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import GridContainerUp from '../helpers/GridContainerUp';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import TetrisLogo from '../assets/tetris.png'
import Logo2048 from '../assets/2048.png'

function Home() {

    return (
        <GridContainerUp>
            <Typography variant='h4'>Welcome to PlayOz</Typography>
            <br></br>
            <Grid container spacing={2} alignItems={'stretch'}>
                <GameCardLarge 
                    title={'Tetris'} 
                    link={'/tetris'}
                    img={TetrisLogo}
                    description={'Unleash your mental prowess in Tetris! Strategically arrange falling blocks, clear lines, and experience the exhilaration of triumph. With addictive gameplay and timeless appeal, this puzzle game will keep you hooked. Can you conquer the Tetris challenge?'}
                />
                <GameCardSmall 
                    title={'Blanko'} 
                    link={'/blanko'}
                    description={'Embark on an Aussie adventure with the Fill-in-the-Blank game! Immerse yourself in the unique world of Australian phrases as you uncover the missing three letters. Test your knowledge, embrace the lively slang, and unravel the puzzle.'}
                />
                <GameCardSmall 
                    title={'8-Puzzle'} 
                    link={'/slido'}
                    description={'Engage your mind in the captivating sliding puzzle game! Slide numbered tiles in a grid, strategically moving the blank space to solve the puzzle and reveal the hidden image. Test your logic and enjoy the thrill of arranging the pieces perfectly. Can you conquer this challenging puzzle?'}
                />
                <GameCardLarge 
                    title={'2048'} 
                    link={'/2048'}
                    img={Logo2048}
                    description={'Embark on a numbers adventure with 2048! Combine tiles to reach the elusive 2048 tile and beyond. With each strategic move, witness your numbers grow and your mind sharpen. Addictive and satisfying, this puzzle game will captivate you. Can you conquer the challenge and reach the ultimate number?'}
                />
            </Grid>
        </GridContainerUp>
    );
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.background.paper,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
}));

function GameCardLarge(props) {
    
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Grid item xs={12} md={7} display={'flex'} className='rise-on-hover' onClick={() => {navigate(props.link)}}>
            <Item elevation={6}>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div style={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center', paddingRight: '25px'}}>
                    <img src={props.img} width={'100%'} alt={'Logo'}></img>
                </div>
                <div style={{ flex: '3' }}>
                    <Typography variant='h5' color={theme.palette.primary.main}>{props.title}</Typography>
                    <br></br>
                    <Typography variant='p'>{props.description}</Typography>
                </div>
            </div>
            </Item>
        </Grid>
        
    )
}

function GameCardSmall(props) {
    
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Grid item xs={12} md={5} display={'flex'} className='rise-on-hover' onClick={() => {navigate(props.link)}}>
            <Item elevation={6}>
                <Typography variant='h5' color={theme.palette.primary.main}>{props.title}</Typography>
                <br></br>
                <Typography variant='p'>{props.description}</Typography>
            </Item>
        </Grid>
    )
}

export default Home;