import React from 'react';
import MeetingItem from './MeetingItem'

export default function MeetingsGroup(props) {
  let jsxArr = props.meetings.map((item, index) => {
    return (
      <MeetingItem key={index} meeting={item} />
    );
  });
  return (
    <div className="items-group">
      {jsxArr}
    </div>
  )
}
