import React from 'react';
import Tilt from 'react-tilt'
import Image from "./Image.png"
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 125, width: 125 }} >
            <div className="Tilt-inner ma3 pt3"><img alt=" " src={Image}/></div>
            </Tilt>
        </div>
    )
}

export default Logo;