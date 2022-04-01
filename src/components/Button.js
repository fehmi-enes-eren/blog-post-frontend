import React from 'react';
import "../styles/button.css";

const STYLES = [
    "btn--primary",
    "btn--outline"
];

const SIZES = [
    "btn--medium",
    "btn--large"
];

export default function Button({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) {


    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonStyle : SIZES[0];

  return (
    <button className={`button ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
        {children}
    </button>
  )
}
