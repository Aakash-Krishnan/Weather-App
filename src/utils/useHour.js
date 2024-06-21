export function getHour(data) {
  if (!data) return;
  const localTime = data.location?.localtime;
  const hour = new Date(localTime).getHours();
  let type;
  if (hour < 4 || hour >= 18) {
    type = "day";
  } else if (hour >= 4 || hour < 18) {
    type = "night";
  }

  return [hour, type];
}
