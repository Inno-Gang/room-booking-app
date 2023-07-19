/**
 * Converts a duration in milliseconds to a human-readable text (w/o seconds).
 *
 * @param durationMs Duration in milliseconds.
 */
export default function durationText(durationMs: number) {
  const duration = Math.floor(durationMs / 1000);
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}
