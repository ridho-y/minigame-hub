import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Link to='/blanko'>Blanko</Link>
            <br></br>
            <Link to='/slido'>Slido</Link>
            <br></br>
            <Link to='/tetro'>Tetro</Link>
        </>
    );
}

export default Home;