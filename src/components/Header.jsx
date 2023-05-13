import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';
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
            <Container maxWidth='xl' style={{ display: 'flex', justifyContent: 'center' }}>
                <Toolbar disableGutters>
                    <Box style={{ display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')} className='pointer'>
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
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;
