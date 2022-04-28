export function formatDate(rawDate) {
  rawDate = rawDate.split("/");
  rawDate = rawDate.reverse();

  const date = new Date(rawDate[0], rawDate[1] - 1, rawDate[2]);
  return date;
}
