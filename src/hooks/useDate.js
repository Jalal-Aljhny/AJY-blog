const useDate = (d) => {
  const date = new Date(d);
  return `${date.getDate()} ${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getFullYear()} on ${date.getHours()}:${date.getMinutes()} ${
    date.getHours() > 12 ? "AM" : "PM"
  }`;
};
export default useDate;
