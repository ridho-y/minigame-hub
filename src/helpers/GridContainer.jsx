import { Grid } from '@mui/material';
import React from 'react';

function GridContainer (props) {
  return (
    <Grid container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      className={props.className}
      sx={{ minHeight: 'calc(100% - 64px)', top: '64px', position: 'absolute' }} // 64px is height of header
    >
      {props.children}
    </Grid>
  );
}

export default GridContainer;
