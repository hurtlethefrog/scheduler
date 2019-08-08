// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//       interviewers: []
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//       interviewers: [2,3]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     },
//     "3": {
//       id:3,
//       name:"Duncan",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
  
// };
export function getAppointmentsForDay(state, day) {
  const [dayObj] = state.days.filter((x) => x.name === day)
  const results = []
  if (dayObj) {
    for (const key in state.appointments) {
      for (const ele of dayObj.appointments) {
        if (key == ele) {
          results.push(state.appointments[key])
        }
      }
    }
  }
  return results;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null
  }
  const results = {interviewer:state.interviewers[interview.interviewer], student:interview.student};
  return results;
}

export function getInterviewersForDay(state, day) {
  const [dayObj] = state.days.filter((x) => x.name === day)
  const results = []
  if (dayObj) {
    for (const key in state.interviewers) {
      for (const ele of dayObj.interviewers) {
        if (key == ele) {
          results.push(state.interviewers[key])
        }
      }
    }
  }
  return results;
}