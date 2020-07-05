import React from 'react'

export default function MeetingItem(props) {
  let m = props.meeting;
  return (
    <div className="item">
      <div className={'row'}>
        <div><b>{m.firstname} {m.lastname}</b></div>
        <div>{m.date}</div>
      </div>
      <div className="position">Position (lat. ling): <span>{m.lat}</span> <span>{m.long}</span></div>
    </div>
  )
}
