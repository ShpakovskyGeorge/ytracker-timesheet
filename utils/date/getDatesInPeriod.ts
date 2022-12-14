export function getDatesInPeriod(startDate: Date, endDate: Date) {
  const date = new Date(startDate);

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
