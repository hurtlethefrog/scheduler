export const SET_DAY = "SET_DAY";
export const SET_STATE = "SET_STATE";
export const BOOK_INTERVIEW = "BOOK_INTERVEW";
export const DELETE_INTERVIEW = "DELETE_INTERVIEW";
export const SET_DAYS = "SET_DAYS";

export default function reducer(state, action) {
  const { days, appointments, type, interviewers, day } = action;

  switch (type) {
    case SET_DAY:
      return { ...state, day };
    case SET_DAYS:
      return { ...state, days };
    case SET_STATE:
      return {
        ...state,
        days,
        appointments,
        interviewers
      };
    case BOOK_INTERVIEW:
      return {
        ...state,
        appointments,
        interviewers
      };
    case DELETE_INTERVIEW:
      return {
        ...state,
        appointments,
        interviewers
      };
    default:
      throw "tried to reduce with unsupported action type";
  }
}
