"use client";

import Link from "next/link";
import {
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaHouse,
  FaRegSquarePlus,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  getCurrentWeekRange,
  formatDate,
  groupByDayOfWeek,
  extractTime,
} from "@/app/utils/datetime";
import { useRouter } from "next/navigation";

export default function BoardPane() {
  const [thisMonth, setThisMonth] = useState<number>(new Date().getMonth() + 1);
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [isReloading, setIsReloading] = useState<boolean>(false);
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

  useEffect(() => {
    const [start, end, weekNumber] = getCurrentWeekRange();
    const days = [];
    let currentDate = start;

    while (currentDate <= end) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setWeekDays(days);
    setWeekNumber(weekNumber);
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [isReloading, weekDays]);

  useEffect(() => {
    const weekly = groupByDayOfWeek(schedules);
    setWeekly(weekly);
  }, [schedules]);

  const router = useRouter();
  const handleClick = (item: any) => {
    router.push(`/schedule/${item.id}`);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <div className="flex text-3xl w-full justify-between mt-10 mb-5">
          <div className="flex space-x-5 w-1/5">
            <FaCircleChevronLeft />
            <p>{weekNumber}週</p>
            <FaCircleChevronRight />
          </div>
          <p>2024年 {thisMonth}月</p>
          <div className="flex space-x-5 w-1/5 justify-end"></div>
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
                  className="flex flex-col border-2 rounded-md text-left p-2"
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
                  className="flex flex-col border-2 rounded-md text-left p-2"
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
                  className="flex flex-col border-2 rounded-md text-left p-2"
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
                  className="flex flex-col border-2 rounded-md text-left p-2"
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
                  className="flex flex-col border-2 rounded-md text-left p-2"
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
                  className="flex flex-col border-2 rounded-md text-left p-2"
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
                  className="flex flex-col border-2 rounded-md text-left p-2"
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
