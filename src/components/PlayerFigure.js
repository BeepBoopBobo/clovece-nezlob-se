import React from "react";

const PlayerFigure = (props) => {
    return <div className="figure" id={props.color} onClick={() => props.toggleMove()}>
        {props.color}

    </div>
}

export default PlayerFigure;