import { Container, Grid } from '@mui/material';
import React from 'react';

function GridContainerUp (props) {
  return (
    <Grid container
      spacing={0}
      direction='column'
      sx={{ height: 'calc(100vh - 64px)', top: '64px', position: 'absolute'}} // 64px is height of header
    >
      <Container maxWidth='lg' >
        <br />
        <br />
        <br />
        <br />
        {props.children}

      </Container>
    </Grid>
  );
}

export default GridContainerUp;
