import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

import "./styles.scss";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interv, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")
  const {interviewers, interviewer, onChange} = props;
  const validate = function(inputField) {
    if(!inputField) {
      setError("student name cannot be blank")
      return
    } 
    setError("")
    props.onSave(name,interv)
  }
  const clearField = function() {
    setError("")
    setName("")
    setInterviewer(null)
    props.onCancel()
  }

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
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={interviewers} value={interv} onChange={setInterviewer}/>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={(event) => {clearField()}} danger>Cancel</Button>
      <Button onClick={(event) => {validate(name)}} confirm>Save</Button>
    </section>
  </section>
</main>
};