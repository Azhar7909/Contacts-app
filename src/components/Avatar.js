import React from "react";

export default function Avatar(props) {
  const { img, name } = props;
  return (
    <div className="avatar">{img? <img src={img} /> : name && name[0]}</div>
  );
}
