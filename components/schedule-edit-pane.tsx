"use client";

import Link from "next/link";
import { FaCircleArrowUp, FaCircleXmark, FaPenToSquare } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Inputs = {
  helper_name: string;
  customer_name: string;
  comment: string;
  begin_time: string;
  end_time: string;
};

export default function ScheduleEditPane() {
  const id = useParams<{ id: string }>().id;
  const [schedule, setSchedule] = useState<any>({});

  const addTimeZone = (date: string) => {
    const timeZoneOffset = ":00+09:00";
    return `${date}${timeZoneOffset}`;
  };

  function formatDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/schedule/${parseInt(id)}`);
      const schedule = await res.json();
      setSchedule(schedule);
    };
    fetchUser();
  }, []);

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { begin_time, end_time } = data;
    const updatedBeginTime = addTimeZone(begin_time);
    const updatedEndTime = addTimeZone(end_time);
    data.begin_time = updatedBeginTime;
    data.end_time = updatedEndTime;

    const res = await fetch(`/api/schedule/${parseInt(id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // ステータスコードのチェック
    if (!res.ok) {
      // エラーハンドリング
      console.error("Failed to update schedule", res.status);
      return;
    }

    // レスポンスボディが存在するかの確認
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Invalid response from server");
      return;
    }

    try {
      const edit_schedule = await res.json();
      router.push("/board");
      router.refresh();
    } catch (error) {
      console.error("Error parsing JSON", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col border-2 rouded-md w-2/3 h-1/2 shadow-2xl">
          <div className="flex items-center justify-between bg-black w-full text-white px-4 py-2">
            <FaPenToSquare />
            Edit a schedule
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col items-center h-full mt-10 space-y-3">
              <input
                defaultValue={schedule.helper_name}
                {...register("helper_name")}
                type="text"
                placeholder="Helper"
                className="border-2 rounded-md p-2 w-2/3"
              />
              <input
                defaultValue={schedule.customer_name}
                {...register("customer_name")}
                type="text"
                placeholder="Customer"
                className="border-2 rounded-md p-2 w-2/3"
              />
              <textarea
                defaultValue={schedule.comment}
                {...register("comment")}
                placeholder="Comment"
                className="border-2 rounded-md p-2 w-2/3"
              />
              <div className="flex items-center justify-between w-2/3 pt-10">
                <input
                  value={formatDateTime(schedule.begin_time)}
                  {...register("begin_time", {
                    onChange: (e) => {
                      // カスタム onChange ロジック
                      setSchedule({ ...schedule, begin_time: e.target.value });
                    },
                  })}
                  type="datetime-local"
                  placeholder="Begin Time"
                  className="border-2 rounded-md p-2 w-2/3"
                />
                <input
                  value={formatDateTime(schedule.end_time)}
                  {...register("end_time", {
                    onChange: (e) => {
                      // カスタム onChange ロジック
                      setSchedule({ ...schedule, end_time: e.target.value });
                    },
                  })}
                  type="datetime-local"
                  placeholder="End Time"
                  className="border-2 rounded-md p-2 w-2/3"
                />
              </div>
            </div>
            <div className="flex items-center justify-around mt-10">
              <button
                type="submit"
                className="flex items-center justify-around gap-3 border-2 rounded-full px-5 py-3 w-36"
              >
                <FaCircleArrowUp className="text-3xl" />
                Update
              </button>
              <Link href="/board">
                <div className="flex items-center justify-around gap-3 border-2 rounded-full px-5 py-3 w-36">
                  <FaCircleXmark className="text-3xl" />
                  Cancel
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
