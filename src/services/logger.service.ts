import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();
// data + logger level + message

const dataFormate = () => {
  return new Date(Date.now()).toLocaleString();
};

class loggerService {
  route;
  logger: any;
  constructor(route: any) {
    this.route = route;
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.printf((info) => {
        return `${dataFormate()} | ${info.level.toUpperCase()} | ${
          this.route
        } | ${info.message} | ${JSON.stringify(info.meta)}`;
      }),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `${process.env.LOG_FILE_PATH} / ${route}.log`,
        }),
      ],
    });
    this.logger = logger;
    }
    
    //typescript not support method overloading like js
  //   async info(message) {
  //     this.logger.log(message);
  //   }
  //   async info(message, obj) {
  //     this.logger.log('info', message);
  //   }
  async info(message: string, obj?: any) {
    if (obj) {
      this.logger.log('info', message, { obj });
    } else {
      this.logger.log('info', message);
    }
  }

  async error(message: string, obj?: any) {
    if (obj) {
      this.logger.log('error', message, { obj });
    } else {
      this.logger.log('error', message);
    }
  }
  async debug(message: string, obj?: any) {
    if (obj) {
      this.logger.log('debug', message, { obj });
    } else {
      this.logger.log('debug', message);
    }
    }
    
}

export default loggerService;



// first make new class
// const logger = new Logger
// in method 
//logger.info("return Book List" , result.rows)