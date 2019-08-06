import React, {useState} from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "components/Appointment/Index";

import "components/Application.scss";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id:4,
    time:"1pm",
    interview: {
      student: "Duncan Haran",
      interviewer: {
        id: 2,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {id:"last"}
];

export default function Application(props) {
const [day, setDay] = useState('Monday')

axios
  .put(`http://localhost:3001/api/appointments/2`, {
    id: 2,
    time: "1pm",
    interview: {
      student: "Archie Cohen",
      interviewer: 9,
    },
  })
  .then(axios.get("http://localhost:3001/api/appointments").then((response) => {
    console.log(response);
  }))
  .catch((error) => {
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.response.data);
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<DayList
  days={days}
  day={day}
  setDay={day => setDay(day)}
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
        {appointments.map(appointment => {
          return <Appointment 
          key={appointment.id} 
          {...appointment}/>
        })}
      </section>
    </main>
  );
}
