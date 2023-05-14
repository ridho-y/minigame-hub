import { Grid } from '@mui/material';
import React from 'react';

function GridContainer (props) {
  return (
    <Grid container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ height: 'calc(100vh - 64px)', top: '64px', position: 'absolute'}} // 64px is height of header
    >
      {props.children}
    </Grid>
  );
}

export default GridContainer;
