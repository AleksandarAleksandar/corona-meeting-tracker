const geoUtils = {};

geoUtils.getMyLocation = (cb) => {
  if ("geolocation" in window.navigator) {
    window.navigator.geolocation.getCurrentPosition(function (position) {
      if (typeof cb === 'function') {
        cb(position);
      }
    });
  } else {
    if (typeof cb === 'function') {
      cb(false);
    }
  }
}

export default geoUtils;