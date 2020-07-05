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

geoUtils.createGoogleMapsUrl = (lat,long) => {
  return 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + long;
}

export default geoUtils;