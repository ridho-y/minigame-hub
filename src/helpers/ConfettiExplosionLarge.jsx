import ConfettiExplosion from 'react-confetti-explosion';

export function ConfettiExplosionLarge() {

    const largeProps = {  
        force: 0.8,
        duration: 2000,
        particleCount: 100,
        width: 2000,
        colors: ['#F60000', '#FF8C00', '#FFEE00', '#4DE94C', '#3783FF', '#4815AA']
    }

    return (<ConfettiExplosion {...largeProps}/>);
}

export default ConfettiExplosionLarge;
