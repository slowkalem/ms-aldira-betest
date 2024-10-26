const moment = require("moment");

class StringUtil {
  constructor() {
    this.value = 0;
  }

  formatDateToString(date, format = "YYYY-MM-DD", locale) {
    if (locale) {
      return moment(date).locale(locale).format(format);
    }
    return moment(moment(date, "DD-MM-YYYY")).format(format);
  }

  getTimestamp() {
    return moment().format("DD-MM-YYYY HH:mm:ss");
  }

  // return date ex: 10 September 2023
  formatDateNow(date) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  }

  // return 1 month before now ex: 2024-10 the return will be 2024-09
  getLastMonth() {
    const now = new Date(); // Get the current date
    const year = now.getFullYear(); // Get the current year
    let month = now.getMonth(); // Get the current month (0-11)

    // Adjust the month and year if it's January (0)
    if (month === 0) {
      month = 11; // December of the previous year
    } else {
      month -= 1; // Subtract 1 from the current month
    }

    // Format the month to be two digits
    const formattedMonth = String(month + 1).padStart(2, '0');

    return `${year}-${formattedMonth}`; // Return the formatted date
  };
}

module.exports = new StringUtil();
