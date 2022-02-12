import React from 'react';
import pictureFor404 from '../asserts/rick.png'

export const Error404 = () => {
    return (
        <div style={{fontSize: "70px", textAlign: "center"}}>
           <img src={pictureFor404}/>
            <h2 style={{color: "#7FFF00"}}>404</h2>
        </div>
    )
}