import React from 'react';
import { Typography } from '@mui/material';
import GridContainer from '../helpers/GridContainer.jsx'

function Page404 () {
  return (
    <GridContainer>
      <Typography variant="h1">404</Typography>
      <br></br>
      <Typography variant="h5">Page Not Found</Typography>
    </GridContainer>
  );
}

export default Page404;
