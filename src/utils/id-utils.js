const idUtils = {};

idUtils.counter = 0;

idUtils.getNewId = function() {
  this.counter++;
  return this.counter;
};

export default idUtils;