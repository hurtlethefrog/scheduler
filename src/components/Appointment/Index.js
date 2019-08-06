import React, {Fragment} from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";

import "./styles.scss";

export default function Appointment(props) {
  return <article className="appointment">
  
  {props.interview ? 
    <Fragment><Header time={props.time}/><Show student={props.interview.student} interviewer={props.interview.interviewer}/></Fragment> 
  : <Fragment><Header time={props.time}/><Empty/></Fragment>}
  {/* <Show/>
  <Form/>
  <Confirm/>
  <Status/>
  <Error/> */}
</article>
}