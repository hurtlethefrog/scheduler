import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light" />
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => {
          return (
            <InterviewerListItem
              setInterviewer={event => props.onChange(interviewer.id)}
              selected={interviewer.id === props.value}
              name={interviewer.name}
              avatar={interviewer.avatar}
            />
          );
        })}
      </ul>
    </section>
  );
}
