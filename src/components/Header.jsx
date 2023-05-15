import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';

function Header () {
    const navigate = useNavigate();

    const titleStyle = {
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    }

    return (
        <AppBar position='absolute'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate('/')}>Home</Button>
                    </Box>
                    <Box style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => navigate('/')} className='pointer'>
                        <Typography
                            variant='h5'
                            component='a'
                            sx={titleStyle}
                        >
                            PLAY
                        </Typography>
                        <SportsBaseballOutlinedIcon sx={{ mr: 0.3, width: '20px' }} />
                        <Typography
                            variant='h5'
                            component='a'
                            sx={titleStyle}
                        >
                            Z
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, justifyContent: 'right', display: 'flex', flexDirection: 'row' }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>Sign In</Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>Sign Up</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;
