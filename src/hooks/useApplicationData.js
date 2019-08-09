import {React, useState, useEffect, useReducer} from "react";
import axios from "axios";

const SET_DAY = "SET_DAY"
const SET_STATE = "SET_STATE"
const BOOK_INTERVIEW = "BOOK_INTERVEW"
const DELETE_INTERVIEW = "DELETE_INTERVIEW"
const SET_DAYS = "SET_DAYS"

function reducer(state, action) {
  const {days, appointments, type, interviewers, day } = action;

  switch (type) {
    case SET_DAY :
      return {...state, day};
    case SET_DAYS :
      return {...state, days};
    case SET_STATE :
      return {
          ...state,
        days, 
        appointments, 
        interviewers
      };
    case BOOK_INTERVIEW :
      return {
        ...state,
        appointments,
        interviewers 
      };
    case DELETE_INTERVIEW : 
      return {
        ...state,
        appointments,
        interviewers
      };
  }
}
export function useApplicationData() {
const [state, dispatch] = useReducer(reducer, {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});
// const setDay = day => setState(prev => ({...prev, day}))

const setDay = (day) => dispatch({type: SET_DAY, day})

useEffect(() => {
  Promise.all([
    (axios.get("http://localhost:3001/api/days")),
    (axios.get("http://localhost:3001/api/appointments")),
    (axios.get("http://localhost:3001/api/interviewers"))
  ]).then((allAnswers) => {
    const [days, appointments, interviewers] = allAnswers;
    dispatch(
      {
      type : SET_STATE,
      days: days.data, 
      appointments:appointments.data, 
      interviewers:interviewers.data,
      })
    })
    .catch(err => console.error)
  }, [])

  useEffect(() => {
    (axios.get("http://localhost:3001/api/days"))
    .then((response) => {
      const days = response.data
      dispatch({
        type: SET_DAYS,
        days
      })
    })
  },[state.appointments])

  function bookInterview(id, interview) {
    const addInterview = {
      ...state, 
      spots: state.days.spots + 1,
      appointments: {...state.appointments},
      interviewers: {...state.interviewers}, 
    }
    addInterview.appointments[id].interview = interview
    return axios.put(`http://localhost:3001/api/appointments/${id}`, {interview}).then(()=> dispatch({...addInterview, type: BOOK_INTERVIEW}))
  }
  
  function deleteInterview(id) {
    console.log(state)
    const removeInterview = {
      ...state,
      spots: state.days.spots - 1,
      appointments: {...state.appointments},
      interviewers: {...state.interviewers}, 
    }
    removeInterview.appointments[id].interview = null
    return axios.delete(`http://localhost:3001/api/appointments/${id}`).then(()=>  dispatch({...removeInterview, type: DELETE_INTERVIEW}))
  }
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}