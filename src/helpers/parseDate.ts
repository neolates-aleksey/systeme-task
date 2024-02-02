export const parseDate = (dateStr: string) => {
  if (!isNaN(Date.parse(dateStr))) {
    const newDate = new Date(dateStr);

    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}, ${newDate.getHours()}:${newDate.getMinutes()}`;
  } else {
    return dateStr;
  }
};
