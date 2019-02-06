import React from 'react';

const ImageLink = ({onInputChange,onButtonClick}) => {
    return (
        <div>
           <p className="center f3 white">This Magic Brain Will Detect Faces In Your Pictures</p>
           <div className="center">
                <div className="form pa4 br3 shadow-5">
                    <input type="text" className="f4 pa2 w-70" onChange={onInputChange}/>
                    <button onClick={onButtonClick} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
                </div>
           </div>
        </div>
    )
}


export default ImageLink