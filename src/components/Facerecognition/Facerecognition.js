import React from 'react';
import './Facerecognition.css';

const Facerecognition = ({box,url}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="img" src={url} alt=" " width='500px' height='auto'/>
                <div className="bounding-box container no-title" style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
            </div>
        </div>
    )
}


export default Facerecognition