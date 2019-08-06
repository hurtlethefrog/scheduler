import React from "react";
import Button from "components/Button"

import "./styles.scss";

export default function Confirm(props) {
  return <main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">{props.message}</h1>
  <section className="appointment__actions">
    <Button onClick={(event) => props.onConfirm("deleted real good")} danger>Confirm</Button>
    <Button onClick={(event) => props.onCancel("decided not to delete")} danger>Cancel</Button>
  </section>
</main>
};