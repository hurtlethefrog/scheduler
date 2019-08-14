export function getAppointmentsForDay(state, day) {
  const [dayObj] = state.days.filter(x => x.name === day);
  const results = [];
  if (dayObj) {
    for (const key in state.appointments) {
      for (const ele of dayObj.appointments) {
        if (key == ele) {
          results.push(state.appointments[key]);
        }
      }
    }
  }
  return results;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const results = {
    interviewer: state.interviewers[interview.interviewer],
    student: interview.student
  };
  return results;
}

export function getInterviewersForDay(state, day) {
  const [dayObj] = state.days.filter(x => x.name === day);
  const results = [];
  if (dayObj) {
    for (const key in state.interviewers) {
      for (const ele of dayObj.interviewers) {
        if (key == ele) {
          results.push(state.interviewers[key]);
        }
      }
    }
  }
  return results;
}
