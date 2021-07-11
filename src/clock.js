const clock = {
  date: document.querySelector(".clock > .date"),
  time: document.querySelector(".clock > .time"),
};

const timeFormat = (datetime) => {
  return datetime < 10 ? "0" + datetime : datetime;
};

const setClock = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const hour = timeFormat(now.getHours());
  const minute = timeFormat(now.getMinutes());
  const second = timeFormat(now.getSeconds());

  clock.date.innerText = `${year}Y ${month}M ${day}D`;
  clock.time.innerText = `${hour} : ${minute} : ${second}`;
};

setInterval(setClock, 1000);
