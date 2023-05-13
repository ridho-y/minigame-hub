import { Grid } from '@mui/material';
import React from 'react';

function GridContainer (props) {
  return (
    <Grid container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ height: '100vh' }}
    >
      {props.children}
    </Grid>
  );
}

export default GridContainer;
