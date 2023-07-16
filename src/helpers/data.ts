const now = new Date();
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const seconds = String(now.getSeconds()).padStart(2, "0");
export const currentTime = `${hours}:${minutes}:${seconds}`;

const today = new Date();
export const formattedDateStart = today.toISOString().substr(0, 10);
const nextYear = new Date(
  today.getFullYear() + 1,
  today.getMonth(),
  today.getDate()
);
export const formattedDateEnd = nextYear.toISOString().substr(0, 10);
