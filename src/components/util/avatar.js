import React from "react";
import Image from "react-bootstrap/Image";

export default function Avatar(props) {
  return (
    <Image
      style={props.style}
      className={props.className}
      src={`${props.src}`}
      roundedCircle
    />
  );
}
