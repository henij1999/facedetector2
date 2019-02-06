import React from 'react';

const Score = ({name,score}) => {
    const display = name + ", Your Current Rank Is #" + score
    return (
        <div className="">
            <div className="white f3 center">
                {display.charAt(0).toUpperCase()+display.slice(1)}
            </div>
        </div>
    )
}

export default Score