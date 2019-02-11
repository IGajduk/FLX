function formatTime(value) {
    let minutes = value % 60;
    let totalHours = (value - minutes) / 60;
    let hours = totalHours % 24;
    let days = (totalHours - hours) / 24;
    return days + ' day(s) ' + hours + ' hour(s) ' + minutes + ' minute(s)';
}
formatTime(120);
formatTime(59);
formatTime(3601);
