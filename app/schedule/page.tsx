"use client";

import Link from "next/link";
import { FaRegSquarePlus, FaCirclePlus, FaCircleXmark } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  helper: string;
  customer: string;
  comment: string;
  beginTime: string;
  endTime: string;
};

export default function SchedulePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="container mx-auto">
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col border-2 rouded-md w-2/3 h-1/2 shadow-2xl">
          <div className="flex items-center justify-between bg-black w-full text-white px-4 py-2">
            <FaRegSquarePlus />
            Create a new schedule
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col items-center h-full mt-10 space-y-3">
              <input
                {...register("helper")}
                type="text"
                placeholder="Helper"
                className="border-2 rounded-md p-2 w-2/3"
              />
              <input
                {...register("customer")}
                type="text"
                placeholder="Customer"
                className="border-2 rounded-md p-2 w-2/3"
              />
              <textarea
                {...register("comment")}
                placeholder="Comment"
                className="border-2 rounded-md p-2 w-2/3"
              />
              <div className="flex items-center justify-between w-2/3 pt-10">
                <input
                  {...register("beginTime")}
                  type="datetime-local"
                  placeholder="Begin Time"
                  className="border-2 rounded-md p-2 w-2/3"
                />
                <input
                  {...register("endTime")}
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
                <FaCirclePlus className="text-3xl" />
                Add
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
