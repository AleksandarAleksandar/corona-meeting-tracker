import React from 'react'
import PropTypes from 'prop-types';
import geoUtils from '../utils/geo-utils'

export default function MeetingItem(props) {
  let m = props.meeting;
  return (
    <div className="item">
      <div className={'row'}>
        <div><b>{m.firstname} {m.lastname}</b></div>
        <div>{m.date}</div>
      </div>
      <div className="position"><a href={geoUtils.createGoogleMapsUrl(m.lat, m.long)} target="_blank" rel="noopener noreferrer">Position (lat. ling): <span>{m.lat}</span> <span>{m.long}</span></a></div>
    </div>
  )
}

MeetingItem.propTypes = {
  meeting: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    date: PropTypes.string,
    lat: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    long: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
};
