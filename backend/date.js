module.exports = { getDay }

function getDay(dateString) {
    // Delete space
    dateString = dateString.replace(/\s/g, '');
    if (dateString[dateString.length - 1] === '?') {
        dateString = dateString.slice(0, -1);
    }
    // Split date, month, year separated by non-number characters
    arrayDate = dateString.split(/\D+/);
    // Convert string to number
    for (let i = 0; i < 3; i++) {
        arrayDate[i] = Number(arrayDate[i]);
    }
    // Date validation
    if ((arrayDate[0] < 0 || arrayDate[0] > 31 || arrayDate[1] < 0 || arrayDate[1] > 12 || arrayDate[2] < 0)) {
        return "Waduh! Masukkan tanggal tidak valid.";
    }
    if ((arrayDate[1] == 4 || arrayDate[1] == 6 || arrayDate[1] == 8 || arrayDate[1] == 9 || arrayDate[1] == 11) && (arrayDate[0] > 30)) {
        return "Waduh! Masukkan tanggal tidak valid.";
    }
    if (arrayDate[1] == 2) {
        if (isKabisat(arrayDate[2]) && arrayDate[1] > 29) return "Waduh! Masukkan tanggal tidak valid.";
        else if (!isKabisat(arrayDate[2] && arrayDate[1] > 28)) return "Waduh! Masukkan tanggal tidak valid.";
    }
    // Valid date, get the day difference of that date by 01/01/0000 and find the day
    diff = getDifference(arrayDate);
    return calculateDay(diff);
}

function getDifference(array) {
    year = 0;
    for (let i = 0; i < array[2]; i++) {
        year += 365;
        if (isKabisat(i)) {
            year++;
        }
    }

    month = 0;
    switch (array[1]) {
        case 12: month += 30;
        case 11: month += 31;
        case 10: month += 30;
        case 9: month += 31;
        case 8: month += 31;
        case 7: month += 30;
        case 6: month += 31;
        case 5: month += 30;
        case 4: month += 31;
        case 3: month += 28;
        case 2: month += 31; break;
    }
    if (isKabisat(array[2]) && array[1] > 2) month++;

    day = array[0] - 1

    return year + month + day;
}

function isKabisat(year) {
    return ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) && (year > 0);
}

function calculateDay(differenceDay) {
    const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return day[differenceDay % 7];
}