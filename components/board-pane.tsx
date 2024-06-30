"use client";

import Link from "next/link";
import {
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaCircleChevronDown,
  FaRegSquarePlus,
} from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import {
  getCurrentWeekRange,
  formatDate,
  groupByDayOfWeek,
  extractTime,
  getWeekNumber,
  getWeekRangeFromWeekNumber,
} from "@/app/utils/datetime";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

export default function BoardPane() {
  const [thisMonth, setThisMonth] = useState<number>(new Date().getMonth() + 1);
  const [thisYear, setThisYear] = useState<number>(new Date().getFullYear());
  const [weekDays, setWeekDays] = useState<Date[]>([]); //週間データ
  const [schedules, setSchedules] = useState<any[]>([]);
  const [weekly, setWeekly] = useState<any[]>([]);
  const [weekNumber, setWeekNumber] = useState<number>(0);

  const fetchSchedule = async () => {
    if (weekDays.length === 0) return;

    const date = formatDate(weekDays[0]);
    const res = await fetch(`/api/schedule/week/${date}`);
    const data = await res.json();

    setSchedules(data);
  };

  const resetWeekDays = (start: Date, end: Date) => {
    const days = [];
    while (start <= end) {
      days.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    setWeekDays(days);
  };

  useEffect(() => {
    const now = new Date();
    const weekNumber = getWeekNumber(now);
    setWeekNumber(weekNumber);
    const [start, end] = getWeekRangeFromWeekNumber(
      now.getFullYear(),
      weekNumber
    );
    setThisMonth(now.getMonth() + 1);
    setThisYear(now.getFullYear());

    resetWeekDays(start, end);
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [weekDays]);

  useEffect(() => {
    const weekly = groupByDayOfWeek(schedules);
    setWeekly(weekly);
  }, [schedules]);

  const handleChangeWeekNumber = (diff: number) => () => {
    const week = weekNumber + diff;

    const [start, end] = getWeekRangeFromWeekNumber(thisYear, week);
    // console.log(start, end);
    // console.log(thisYear, week);

    setWeekNumber(week);
    setThisYear(start.getFullYear());
    setThisMonth(start.getMonth() + 1);

    resetWeekDays(start, end);
  };

  const router = useRouter();
  const handleClick = (item: any) => {
    router.push(`/schedule/${item.id}`);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <div className="flex text-3xl w-full justify-between mt-10 mb-5">
          <div className="flex space-x-5 w-1/5">
            <FaCircleChevronLeft onClick={handleChangeWeekNumber(-1)} />
            <p>{weekNumber}週</p>
            <FaCircleChevronRight onClick={handleChangeWeekNumber(1)} />
          </div>
          <p>
            {thisYear}年 {thisMonth}月
          </p>
          <div className="flex space-x-5 w-1/5 justify-end">
            <FaCircleChevronDown
              onClick={() => setWeekNumber(getWeekNumber(new Date()))}
            />
          </div>
        </div>
        <div className="flex w-full h-[80vh] space-x-1">
          <div className="border-2 w-full text-center h-[80vh] flex flex-col">
            <div className="sticky top-0 bg-white z-10">
              <p className="font-bold text-xl">月</p>
              <p>{weekDays[0]?.getDate()}</p>
            </div>
            <div className="overflow-auto h-full">
              {weekly[1]?.map((item: any) => (
                <div
                  key={item.id}
                  onDoubleClick={() => handleClick(item)}
                  className="flex flex-col border rounded-md text-left p-2"
                >
                  <p className="text-sm">
                    {extractTime(item.begin_time)} -{" "}
                    {extractTime(item.end_time)}
                  </p>
                  <p className="font-bold text-center text-sm">
                    {item.helper_name} ({item.customer_name})
                  </p>
                  {item.comment && <p>{item.comment}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="border-2 w-full text-center h-[80vh] flex flex-col">
            <div className="sticky top-0 bg-white z-10">
              <p className="font-bold text-xl">火</p>
              <p>{weekDays[1]?.getDate()}</p>
            </div>
            <div className="overflow-auto h-full">
              {weekly[2]?.map((item: any) => (
                <div
                  key={item.id}
                  onDoubleClick={() => handleClick(item)}
                  className="flex flex-col border rounded-md text-left p-2"
                >
                  <p className="text-sm">
                    {extractTime(item.begin_time)} -{" "}
                    {extractTime(item.end_time)}
                  </p>
                  <p className="font-bold text-center text-sm">
                    {item.helper_name} ({item.customer_name})
                  </p>
                  {item.comment && <p>{item.comment}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="border-2 w-full text-center h-[80vh] flex flex-col">
            <div className="sticky top-0 bg-white z-10">
              <p className="font-bold text-xl">水</p>
              <p>{weekDays[2]?.getDate()}</p>
            </div>
            <div className="overflow-auto h-full">
              {weekly[3]?.map((item: any) => (
                <div
                  key={item.id}
                  onDoubleClick={() => handleClick(item)}
                  className="flex flex-col border rounded-md text-left p-2"
                >
                  <p className="text-sm">
                    {extractTime(item.begin_time)} -{" "}
                    {extractTime(item.end_time)}
                  </p>
                  <p className="font-bold text-center text-sm">
                    {item.helper_name} ({item.customer_name})
                  </p>
                  {item.comment && <p>{item.comment}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="border-2 w-full text-center h-[80vh] flex flex-col">
            <div className="sticky top-0 bg-white z-10">
              <p className="font-bold text-xl">木</p>
              <p>{weekDays[3]?.getDate()}</p>
            </div>
            <div className="overflow-auto h-full">
              {weekly[4]?.map((item: any) => (
                <div
                  key={item.id}
                  onDoubleClick={() => handleClick(item)}
                  className="flex flex-col border rounded-md text-left p-2"
                >
                  <p className="text-sm">
                    {extractTime(item.begin_time)} -{" "}
                    {extractTime(item.end_time)}
                  </p>
                  <p className="font-bold text-center text-sm">
                    {item.helper_name} ({item.customer_name})
                  </p>
                  {item.comment && <p>{item.comment}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="border-2 w-full text-center h-[80vh] flex flex-col">
            <div className="sticky top-0 bg-white z-10">
              <p className="font-bold text-xl">金</p>
              <p>{weekDays[4]?.getDate()}</p>
            </div>
            <div className="overflow-auto h-full">
              {weekly[5]?.map((item: any) => (
                <div
                  key={item.id}
                  onDoubleClick={() => handleClick(item)}
                  className="flex flex-col border rounded-md text-left p-2"
                >
                  <p className="text-sm">
                    {extractTime(item.begin_time)} -{" "}
                    {extractTime(item.end_time)}
                  </p>
                  <p className="font-bold text-center text-sm">
                    {item.helper_name} ({item.customer_name})
                  </p>
                  {item.comment && <p>{item.comment}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="border-2 w-full text-center h-[80vh] flex flex-col">
            <div className="sticky top-0 bg-white z-10">
              <p className="font-bold text-xl text-blue-700">土</p>
              <p>{weekDays[5]?.getDate()}</p>
            </div>
            <div className="overflow-auto h-full">
              {weekly[6]?.map((item: any) => (
                <div
                  key={item.id}
                  onDoubleClick={() => handleClick(item)}
                  className="flex flex-col border rounded-md text-left p-2"
                >
                  <p className="text-sm">
                    {extractTime(item.begin_time)} -{" "}
                    {extractTime(item.end_time)}
                  </p>
                  <p className="font-bold text-center text-sm">
                    {item.helper_name} ({item.customer_name})
                  </p>
                  {item.comment && <p>{item.comment}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="border-2 w-full text-center h-[80vh] flex flex-col">
            <div className="sticky top-0 bg-white z-10">
              <p className="font-bold text-xl text-red-700">日</p>
              <p>{weekDays[6]?.getDate()}</p>
            </div>
            <div className="overflow-auto h-full">
              {weekly[0]?.map((item: any) => (
                <div
                  key={item.id}
                  onDoubleClick={() => handleClick(item)}
                  className="flex flex-col border rounded-md text-left p-2"
                >
                  <p className="text-sm">
                    {extractTime(item.begin_time)} -{" "}
                    {extractTime(item.end_time)}
                  </p>
                  <p className="font-bold text-center text-sm">
                    {item.helper_name} ({item.customer_name})
                  </p>
                  {item.comment && <p>{item.comment}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex text-3xl w-full justify-between mt-5">
          <Link href="/schedule">
            <FaRegSquarePlus />
          </Link>
          <Link href="/settings">{/* <SlSettings /> */}</Link>
        </div>
      </div>
    </div>
  );
}
