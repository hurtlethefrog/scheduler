import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const dayList = props.days.map(day => (
    <DayListItem
      key={day.id}
      setDay={props.setDay}
      selected={day.name === props.day}
      name={day.name}
      spots={day.spots}
    />
  ));
  return <ul>{dayList}</ul>;
}
