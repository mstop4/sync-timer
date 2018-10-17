var TIMERSTATE = {
  STOPPED: 0,
  SUSPENDED: 1,
  RUNNING: 2
}

var padDisplay = function(value, places) {
  var valueStr = value.toString();

  if (valueStr.length < places) {
    valueStr = '0' + valueStr;
  }

  return valueStr;
}