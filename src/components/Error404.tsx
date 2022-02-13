import React from 'react';
import pictureFor404 from '../asserts/rick.png';
import s from "../App/App.module.css";

export const Error404 = () => {
    return (
        <div className={s.app} style={{fontSize: "70px", textAlign: "center"}}>
           <img src={pictureFor404}/>
            <h2 style={{color: "#7FFF00"}}>404</h2>
        </div>
    )
}