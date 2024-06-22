"use client";

import Link from "next/link";
import {
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaHouse,
  FaRegSquarePlus,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getCurrentWeekRange, formatDate } from "@/app/utils/datetime";

export default function BoardPage() {
  const [thisMonth, setThisMonth] = useState<number>(new Date().getMonth() + 1);
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [isReloading, setIsReloading] = useState<boolean>(false);

  const fetchSchedule = async () => {
    const date = formatDate(weekDays[0]);
    const res = await fetch(`/api/schedule/${date}`);
    const data = await res.json();
  };

  useEffect(() => {
    const [start, end] = getCurrentWeekRange();
    const days = [];
    let currentDate = start;

    while (currentDate <= end) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setWeekDays(days);
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [isReloading, weekDays]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <div className="flex text-3xl w-full justify-between mt-10 mb-5">
          <FaCircleChevronLeft />
          2024年 {thisMonth}月
          <FaCircleChevronRight />
        </div>
        <div className="flex w-full h-[80vh] space-x-1">
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl">月</p>
            <p>{weekDays[0]?.getDate()}</p>
            <div className="flex flex-col border-4 rouded-md text-left p-2">
              <p>時間</p>
              <p>タイトル</p>
              <p>内容</p>
            </div>
          </div>
          <div className="border-2  w-full text-center">
            <p className="font-bold text-xl">火</p>
            <p>{weekDays[1]?.getDate()}</p>
          </div>
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl">水</p>
            <p>{weekDays[2]?.getDate()}</p>
          </div>
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl">木</p>
            <p>{weekDays[3]?.getDate()}</p>
          </div>
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl">金</p>
            <p>{weekDays[4]?.getDate()}</p>
          </div>
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl text-blue-700">土</p>
            <p>{weekDays[5]?.getDate()}</p>
          </div>
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl text-red-700">日</p>
            <p>{weekDays[6]?.getDate()}</p>
          </div>
        </div>
        <div className="flex text-3xl w-full justify-between mt-5">
          <Link href="/schedule">
            <FaRegSquarePlus />
          </Link>
          <Link href="/">
            <FaHouse />
          </Link>
        </div>
      </div>
    </div>
  );
}
