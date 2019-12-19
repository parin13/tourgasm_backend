const winston = require('winston');
const { combine, timestamp, label, prettyPrint } = winston.format;

const tourgasmLogger = {
      format: combine(
          timestamp(),
          prettyPrint()
          ),
      defaultMeta: { service: 'tourgasm' },
      transports: [
        new winston.transports.File({ filename: process.env.INFO, level: 'info' }),
        new winston.transports.File({ filename: process.env.ERROR , level: 'error' }),
        new winston.transports.File({ filename: process.env.COMMON}),
      ]

  }
  

module.exports = {
    tourgasmLogger
}