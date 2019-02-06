import React from 'react';

const Navigation = ({isSignedIn,changeRoute}) => {
        if(isSignedIn){
        return(
            <nav style={{display:"flex",justifyContent:"flex-end"}}>
            <p onClick={()=>changeRoute("signout")} className="f3 link dim black underline pa3 pointer" style={navStyle}>Sign Out</p>
            </nav>
        )}
        else{
            return (
                <nav style={{display:"flex",justifyContent:"flex-end"}}>
                 <p onClick={()=>changeRoute("signin")} className="f3 link dim black underline pa3 pointer" style={navStyle}>Sign In</p>
                 <p onClick={()=>changeRoute("register")} className="f3 link dim black underline pa3 pointer" style={navStyle}>Register</p>
                </nav>
            )
        }
}

const navStyle={
    marginRight:"10px",
    marginTop:"2px"
}

export default Navigation