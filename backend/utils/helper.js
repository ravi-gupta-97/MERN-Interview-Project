export const getDateDifference = (date1, date2) => {
    const timeDifference = Math.abs(date2.getTime() - date1.getTime());
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return days;
}
