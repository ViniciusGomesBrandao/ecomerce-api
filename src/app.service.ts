import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      success: true,
      message: `Welcome to ${process.env.PROJECT_NAME} API`
    };
  }
}
