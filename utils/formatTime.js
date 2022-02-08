const leadingZero = (num) => `0${num}`.slice(-2);

const formatTime = (date) =>
  [date.getHours(), date.getMinutes(), date.getSeconds()]
  .map(leadingZero)
  .join(':');


// Different way to add leading zeroes to minutes
// date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + date.getSeconds()

export default formatTime;