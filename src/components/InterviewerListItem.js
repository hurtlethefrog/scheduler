import React from "react";

import "components/InterviewerListItem.scss";

var classnames = require("classnames");

export default function InterviewerListItem(props) {
  const itemClass = classnames("li", {
    interviewers__item: true,
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={itemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
