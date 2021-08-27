import { LogLevel } from "@nestjs/common";
const logLevel = +process.env.LOG_LEVEL || 5;
let logOptions: LogLevel[];

switch ( logLevel ) {
  case 1:
    logOptions = [ 'error' ];
    break;
  case 2:
    logOptions = [ 'error', 'warn' ];
    break;
  case 3:
  default:
    logOptions = [ 'error', 'warn', 'log' ];
    break;
  case 4:
    logOptions = [ 'error', 'warn', 'log', 'verbose' ];
    break;
  case 5:
    logOptions = [ 'error', 'warn', 'log', 'verbose', 'debug' ];
    break;
}
export default logOptions;