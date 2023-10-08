const dateTimeFormat = require('date-and-time');

class DateTimeExtensions {
    ParseDateTime(datetime) {
        return dateTimeFormat.format(
            new Date(datetime * 1000), 'YYYY-MM-DD HH:mm:ss'
        )
    }
}

module.exports = DateTimeExtensions;
