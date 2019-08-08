import React, {useState, useEffect} from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import DayList from "components/DayList";
import Appointment from "components/Appointment/Index";

import "components/Application.scss";

const DEMOstateDEMO = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: []
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [2,3]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id:3,
      name:"Duncan",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }  
};

export default function Application(props) {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});
const setDay = day => setState(prev => ({...prev, day}))
// const setDays = days => setState({...state, days})
// const setAppointments = appointments => setState({...state, appointments})
// const setInterviewers = interviewers => setState({...state, interviewers})


function bookInterview(id, interview) {
  const addInterview = {
    ...state, 
    appointments: {...state.appointments},
    interviewers: {...state.interviewers}, 
  }
  addInterview.appointments[id].interview = interview
  return axios.put(`http://localhost:3001/api/appointments/${id}`, {interview}).then(()=> setState(addInterview))
  // .catch((err)=>console.log(err))
}

function deleteInterview(id) {
  const removeInterview = {
    ...state, 
    appointments: {...state.appointments},
    interviewers: {...state.interviewers}, 
  }
  removeInterview.appointments[id].interview = null
  return axios.delete(`http://localhost:3001/api/appointments/${id}`).then(()=>   setState(removeInterview))

}

useEffect(() => {
Promise.all([
  (axios.get("http://localhost:3001/api/days")),
  (axios.get("http://localhost:3001/api/appointments")),
  (axios.get("http://localhost:3001/api/interviewers"))
]).then((allAnswers) => {
  const [days, appointments, interviewers] = allAnswers;
  console.log(allAnswers)
  setState(prevState =>
    ({
      ...prevState,
    days: days.data, 
    appointments:appointments.data, 
    interviewers:interviewers.data,
    bob:"chicken" 
   })  )
  })
  .catch(err => console.error)
}, [])

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
      </section>
    </main>
  );
}
