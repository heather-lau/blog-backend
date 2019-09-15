import path from 'path'
import { createLogger, format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, json, splat, simple } = format
const tsformat = { format:'DD-MM-YYYY HH:mm:ss' }
const combinedFormat = combine(timestamp(tsformat), json(), splat(), simple())
const logPath = './logs'

const accessLog = createLogger({
  format: combinedFormat,
  level: 'info',
  transports: [ 
    new DailyRotateFile({
      filename: path.join(logPath, 'access-%DATE%.log'),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
})

const errorLog = createLogger({
  format: combinedFormat,
  level: 'error',
  transports: [ 
    new DailyRotateFile({
      filename: path.join(logPath, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
})

export {
  accessLog,
  errorLog
}