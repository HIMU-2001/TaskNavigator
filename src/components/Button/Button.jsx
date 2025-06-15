import React from "react";

const Button = (props) => {
    return (
        <button
            id={props.id}
            className={props.className}
            type={props.type || "button"}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.icon && (
                <span style={props.iconStyle}>
                    {props.icon}
                </span>
            )}
            {props.value}
        </button>
    );
};

export default Button;