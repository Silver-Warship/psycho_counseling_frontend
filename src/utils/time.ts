import dayjs from 'dayjs';
import request from './request';

type TimeAPIResponse = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  milliSeconds: number;
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  dayOfWeek: string;
  dstActive: boolean;
};

class HSTime {
  static async getTimeAPI(): Promise<TimeAPIResponse> {
    return request.get(
      'https://www.timeapi.io/api/time/current/zone?timeZone=Asia%2FShanghai'
    );
  }

  static async getDayjs() {
    const { dateTime } = await HSTime.getTimeAPI();
    return dayjs(dateTime);
  }

  static timestamp() {
    return dayjs().unix();
  }
}

export default HSTime;
