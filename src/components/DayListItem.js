import React from "react";

import "components/DayListItem.scss";

var classnames = require('classnames');

export default function DayListItem({name, spots, setDay, selected}) {

  const itemClass = classnames('div', {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
    "day-list__item":true
  })

  return <div data-testid="day" className={itemClass} onClick={() => setDay(name)}>
       <h1>{name}</h1>
       <h2>
      {spots <= 0 &&
          `no spots remaining`
        || spots === 1 &&
          `${spots} spot remaining`
        || spots > 1 &&
          `${spots} spots remaining`
      } </h2>
  </div>;
}