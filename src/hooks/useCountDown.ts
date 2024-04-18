import dayjs from "dayjs";
import { useRef, useState } from "react";
import { useInterVal } from "./useInterVal";

// 时间补位方法
const supplement = (n: number) => {
  return n > 9 ? n : "0" + n;
};

const time = (targetTime: DataType) => {
  // 未来时间
  const future = +new Date(targetTime);
  // 现在时间
  const nowDate = +new Date();

  const s = parseInt((future - nowDate) / 1000 + ""); //转化为秒

  // * 天
  const d = parseInt(s / 86400 + "");

  // # 小时
  const h = parseInt((s % 86400) / 3600 + "");

  // todo 分钟
  const ms = parseInt((s % 3600) / 60 + "");

  // ? 秒
  const sc = parseInt((s % 60) + "");

  const expried = s > 0 ? false : true;
  const days = d < 0 ? -d : d;
  const hours = h < 0 ? -h : h;
  const minutes = ms < 0 ? -ms : ms;
  const seconds = sc < 0 ? -sc : sc;

  const isMoreText = expried ? "过去" : "还剩";

  let target = "";
  if (Object.prototype.toString.call(targetTime) === "[object Date]") {
    target = dayjs(targetTime).format("YYYY-MM-DD HH:mm:ss");
  } else {
    target = targetTime as string;
  }
  const timeStr = `距离${target}${isMoreText}:${supplement(d)}天-${supplement(
    h
  )}小时-${supplement(ms)}分钟-${supplement(sc)}秒`;

  return {
    timeStr,
    expried,
    days,
    hours,
    minutes,
    seconds,
  };
};

const INITTIMES = {
  expried: false,
  timeStr: "",
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

interface CountDown {
  expried: boolean;
  timeStr: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type DataType = string | number | Date;
type DatesType = (string | number | Date)[];
type TargetType = DataType | DatesType;
type Speed = number | undefined | null;

/**
 * Output the hours, minutes and seconds from the target time and the assembled time information
 * 
 * Can accept an array
 * 
 * @param targetTime  
 * 
 * @returns 
 * 
  {
    timeStr,
    expried,
    days,
    hours,
    minutes,
    seconds
  }

    | 

  {
    timeStr,
    expried,
    days,
    hours,
    minutes,
    seconds
  }[]
 */
export const useCountDown = (targetTime: TargetType, speed?: number | null) => {
  const [timeDiff, setTimeDiff] = useState<CountDown>(INITTIMES);
  const [timesDiff, setTimesDiff] = useState<CountDown[]>([]);

  const speedCopy = useRef<Speed>(speed || 1000);
  const speedsCopy = useRef<Speed>(speed || 1000);

  if (targetTime instanceof Array) {
    speedCopy.current = null;
  } else {
    speedsCopy.current = null;
  }

  useInterVal(() => {
    setTimeDiff(time(targetTime as DataType));
  }, speedCopy.current);
  useInterVal(() => {
    setTimesDiff(
      (targetTime as DatesType).map((ele) => {
        return time(ele);
      })
    );
  }, speedsCopy.current);

  return { timeDiff, timesDiff } as const;
};
