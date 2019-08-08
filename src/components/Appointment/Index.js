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

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(EMPTY)
  console.log("mode from index" + mode)
  return <article className="appointment"> 
    <Header time={props.time}/>
  {mode === EMPTY && 
    <Empty onAdd={transition} mode={CREATE}/>}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    />
  )}
  {mode === CREATE && 
    <Form 
      interviewers={[]} 
      onCancel={back}
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