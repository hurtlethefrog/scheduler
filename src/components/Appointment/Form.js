import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

import "./styles.scss";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interv, setInterviewer] = useState(props.interviewer || null);
  const {interviewers, interviewer, onChange} = props;

  // const reset = () => {
  //   setName("");
  //   setInterviewer(null);
  // }

  // const save = () => {
  //   setName(name);
  //   setInterviewer(interv);
  // }

return <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        onChange={(event)=> setName(event.target.value)}
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        value={name}
        placeholder="Enter Student Name"
      />
    </form>
    <InterviewerList interviewers={interviewers} value={interv} onChange={setInterviewer}/>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={(event) => props.onCancel()} danger>Cancel</Button>
      <Button onClick={(event) => props.onSave(name,interv)} confirm>Save</Button>
    </section>
  </section>
</main>
};