import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";

import {useVisualMode} from "../../hooks/useVisualMode" 

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const STATUS = "STATUS";
const DELETE = "DELETE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)
  const save = function(name, interviewer) {
    const interview = {student:name, interviewer}
    transition(STATUS, true)
    props.bookInterview(props.id, interview).then(()=> transition(SHOW))
    .catch((err)=> {
      console.log(err); 
      transition(ERROR_SAVE, true)})  
  }

  const remove = function() {
    transition(DELETE, true)
    props.deleteInterview(props.id).then(()=> transition(EMPTY))
    .catch((err)=> {
      console.log(err); 
      transition(ERROR_DELETE, true)})
  }

  const confirm = function() {
    transition(CONFIRM)
  }

  const edit = function() {
    transition(EDIT)
  }

  return <article data-testid="appointment" className="appointment"> 
    <Header time={props.time}/>
  {mode === EMPTY && 
    <Empty onAdd={transition} mode={CREATE}/>}

  {mode === ERROR_SAVE &&
    <Error onClose={back} message={"There was an error saving."}/>}

  {mode === ERROR_DELETE &&
    <Error onClose={back} message={"There was an error deleting."}/>}

  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onConfirmDelete={confirm}
      interview={props.interview}
      onEdit={edit}
    />
  )}
  {mode === CONFIRM && 
  <Confirm onConfirm={remove} onCancel={back} message={"Do you wish to delete the interview? This action cannot be undone."}/>}

  {mode === STATUS &&
  <Status message={"Saving"}/>}

  {mode === EDIT &&
  <Form 
    id={props.id}
    interviewers={props.interviewers}
    onCancel={back}
    onSave={save}
    name={props.interview.student}
    interviewer={props.interview.interviewer.id}/>}

  {mode === DELETE &&
  <Status message={"Deleting"}/>}

  {mode === CREATE && 
    <Form 
      id={props.id}
      interviewers={props.interviewers} 
      onCancel={back}
      onSave={save}
      />}
  </article>
}