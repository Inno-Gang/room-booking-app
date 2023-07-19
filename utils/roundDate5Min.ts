/**
 * Returns a new Date object with time rounded to nearest 5 minutes (forward).
 *
 * @param date Date to round.
 */
export default function roundDate5MinForward(date: Date): Date {
  const time = Math.round(date.getTime());
  const remainder = time % (FIVE_MIN_IN_MS);
  if (remainder === 0) {
    return date;
  }
  return new Date(time + (FIVE_MIN_IN_MS - remainder));
}

const FIVE_MIN_IN_MS = 5 * 60 * 1000;
