import React from "react";

import "./styles.scss";

export default function Empty(props) {
  return <main class="appointment__add">
  <img
    class="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={(event) => props.onAdd('button clicked')}
  />
</main>
}