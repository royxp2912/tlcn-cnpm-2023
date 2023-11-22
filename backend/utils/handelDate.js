export const getStartAndEndOfMonth = (month, year) => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstDayOfNextMonth = new Date(year, month, 1);
    firstDayOfMonth.setHours(0, 0, 0, 0);
    firstDayOfNextMonth.setHours(0, 0, 0, 0);

    return {
        start: firstDayOfMonth,
        end: firstDayOfNextMonth,
    }
}

export const getStartAndEndOfWeek = (day, month, year) => {
    const today = new Date(year, month, day);
    let startOfWeek = new Date(today);
    let endOfWeek = new Date(today);;

    if (today.getDay() === 0) {
        startOfWeek.setDate(today.getDate() - 5);
        endOfWeek.setDate(today.getDate() + 1);
    } else {
        startOfWeek.setDate(today.getDate() - today.getDay() + 2);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
    }

    startOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setHours(0, 0, 0, 0);

    return {
        start: startOfWeek,
        end: endOfWeek,
    }
}

export const getStartAndEndOfDay = (day, month, year) => {
    const today = new Date(year, month, day);
    const tomorrow = new Date(year, month, day + 1);
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);

    return {
        start: today,
        end: tomorrow,
    }
}