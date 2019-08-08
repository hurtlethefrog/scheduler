import React, {Fragment} from "react";
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
const ERROR = "ERROR";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const STATUS = "STATUS";
const DELETE = "DELETE";

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(EMPTY)

  const save = function(name, interviewer) {
    const interview = {student:name, interviewer}
    transition(STATUS, true)
    props.bookInterview(props.id, interview).then(()=> transition(SHOW))  
  }

  const remove = function() {
    transition(DELETE, true)
    props.deleteInterview(props.id).then(()=> transition(EMPTY))
  }

  const confirm = function() {
    transition(CONFIRM, true)
  }

  const edit = function() {
    transition(EDIT)
  }

  return <article className="appointment"> 
    <Header time={props.time}/>
  {mode === EMPTY && 
    <Empty onAdd={transition} mode={CREATE}/>}

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
  <Confirm onConfirm={remove} onCancel={back} message={"Are you sure you wish to delete this interview? This action cannot be undone."}/>}

  {mode === STATUS &&
  <Status message={"Saving"}/>}

  {mode === EDIT &&
  <Form
  id={props.id}
  interviewers={props.interviewers}
  onCancel={back}
  onSave={save}
  name={props.interview.name}
  interviewer={props.interview.interviewer}/>}

  {mode === DELETE &&
  <Status message={"Deleting"}/>}

  {mode === CREATE && 
    <Form 
      id={props.id}
      interviewers={props.interviewers} 
      onCancel={back}
      onSave={save}
      />}
    {/* {props.interview ? 
      <Fragment>
        <Header time={props.time}/>
        <Show student={props.interview.student} interviewer={props.interview.interviewer}/>
      </Fragment> 
    : <Fragment>
        <Header time={props.time}/>
        <Empty/>
      </Fragment>} */}
    {/* <Show/>
    <Form/>
    <Confirm/>
    <Status/>
    <Error/> */}
  </article>
}