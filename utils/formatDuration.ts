/**
 * Formats a range between two dates to human readable format (with time).
 *
 * - If both dates in the current year, the year is not displayed.
 * - If both dates in the same day, date only shown once.
 *
 * @example
 * formatDuration(
 *   new Date(2019, 0, 1, 0, 0),
 *   new Date(2019, 0, 1, 0, 30)
 * )
 * "1 Jan, 00:00 - 00:30"
 *
 * formatDuration(
 *   new Date(2019, 0, 1, 0, 0),
 *   new Date(2019, 0, 2, 0, 0)
 * )
 * "1 Jan, 00:00 - 2 Jan, 00:00"
 *
 * formatDuration(
 *   new Date(2019, 0, 1, 0, 0),
 *   new Date(2020, 1, 1, 0, 0)
 * )
 * "1 Jan 2019, 00:00 - 1 Feb 2020, 00:00"
 *
 * @param startDate Date of the beginning of an event.
 * @param endDate Date of the end of an event.
 */
export default function formatDuration(
  startDate: Date,
  endDate: Date,
): string {
  const currentYear = new Date().getFullYear();
  const startMinute = startDate.getMinutes().toString().padStart(2, "0");
  const startHour = startDate.getHours().toString().padStart(2, "0");
  const startDay = startDate.getDate();
  const startMonth = startDate.toLocaleString("en-US", { month: "short" });
  const startYear = startDate.getFullYear();
  const endMinute = endDate.getMinutes().toString().padStart(2, "0");
  const endHour = endDate.getHours().toString().padStart(2, "0");
  const endDay = endDate.getDate();
  const endMonth = endDate.toLocaleString("en-US", { month: "short" });
  const endYear = endDate.getFullYear();

  if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
    if (currentYear === startYear) {
      return `${startDay} ${startMonth}, ${startHour}:${startMinute} — ${endHour}:${endMinute}`;
    } else {
      return `${startDay} ${startMonth} ${startYear}, ${startHour}:${startMinute} — ${endHour}:${endMinute}`;
    }
  }

  if (currentYear === startYear && currentYear === endYear) {
    return `${startDay} ${startMonth}, ${startHour}:${startMinute} — ${endDay} ${endMonth}, ${endHour}:${endMinute}`;
  }

  return `${startDay} ${startMonth} ${startYear}, ${startHour}:${startMinute} — ${endDay} ${endMonth} ${endYear}, ${endHour}:${endMinute}`;
}
