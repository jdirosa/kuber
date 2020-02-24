/**
 * Returns a date formated nicely for the Email Table
 * @param date
 */
export function getDisplayDate(date: Date) {
  const d = new Date(date);
  if (isToday(d)) {
    console.log({ date, d });
    const time = d.toLocaleTimeString();
    return (
      time.substr(0, time.lastIndexOf(":")) +
      time.substr(time.lastIndexOf(":") + 3) // This is not world safe
    );
  }
  return d.toLocaleDateString();
}

/**
 * Determines if a given date is today
 * @param date
 */
export function isToday(date: Date) {
  const today = new Date();
  if (today.getDate() !== date.getDate()) {
    return false;
  }
  if (today.getMonth() !== date.getMonth()) {
    return false;
  }
  if (today.getFullYear() !== date.getFullYear()) {
    return false;
  }
  return true;
}
