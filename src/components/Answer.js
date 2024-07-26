import React from "react";

function Answer({ title, onClick, image, bgColor }) {
    return (
        <div onClick={onClick} className="medium-ff cursor-pointer flex items-center gap-5 field-bg p-3 rounded-lg">
            <div className="w-10 p-1 rounded-lg" style={{backgroundColor: bgColor}}>
                <img src={image} alt={title} />
            </div>
            <p className="text-lg">{title}</p>
        </div>
    );
}

export default Answer;
