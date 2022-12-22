const getSeason = () => {
  let currentTime = new Date();
  let currentYear = currentTime.getUTCFullYear();

  var seasonArray = [
    {
      name: "SPRING",
      date: new Date(
        currentTime.getFullYear(),
        2,
        currentTime.getFullYear() % 4 === 0 ? 19 : 20
      ).getTime(),
    },
    {
      name: "SUMMER",
      date: new Date(
        currentTime.getFullYear(),
        5,
        currentTime.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime(),
    },
    {
      name: "FALL",
      date: new Date(
        currentTime.getFullYear(),
        8,
        currentTime.getFullYear() % 4 === 0 ? 22 : 23
      ).getTime(),
    },
    {
      name: "WINTER",
      date: new Date(
        currentTime.getFullYear(),
        11,
        currentTime.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime(),
    },
  ];
  let season = seasonArray
    .filter(({ date }) => date <= currentTime.getTime())
    .slice(-1)[0] || { name: "WINTER" };
  return {
    season: season.name,
    year: season.name === "WINTER" ? currentYear + 1 : currentYear,
  };
};

export default getSeason;
