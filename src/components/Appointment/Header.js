import React from "react";

import "./styles.scss";

export default function Header(props) {
  return <header class="appointment__time">
  <h4 class="text--semi-bold">{props.time}</h4>
  <hr class="appointment__separator" />
</header>
};