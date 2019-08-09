import React, {useState, useEffect} from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import DayList from "components/DayList";
import Appointment from "components/Appointment/Index";

import "components/Application.scss";
import { useApplicationData } from "hooks/useApplicationData";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData()

const appointmentsByDay = getAppointmentsForDay(state, state.day)
const interviewersByDay = getInterviewersForDay(state, state.day)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu" />
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointmentsByDay.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          const interviewers = interviewersByDay
          return <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interviewers={interviewers}
          interview={interview}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}/>
        })}
        <Appointment key="last"/>
      </section>
    </main>
  );
}
