"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCircleArrowUp, FaCircleXmark, FaCirclePlus } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  id: number;
  name: string;
  active: boolean;
};

export default function SettingsPane() {
  const [isReloading, setIsReloading] = useState<boolean>(false);
  const [helpers, setHelpers] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedHelper, setSelectedHelper] = useState<any | null>(null);

  const fetchHelpers = async () => {
    const res = await fetch("/api/helper/");
    const helpers = await res.json();
    setHelpers(helpers);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    fetchHelpers();
  }, [isReloading]);

  const handleSelected = async (id: number) => {
    setSelectedId(id);

    const res = await fetch(`/api/helper/${id}`);
    try {
      const target = await res.json();
      setSelectedHelper(target);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setSelectedId(null);
    setSelectedHelper(null);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="font-bold text-3xl my-10">Master Records</h1>
        <div className="flex w-full justify-between gap-10 h-screen">
          <div className="w-1/2 flex flex-col h-2/3 ">
            <div className="flex items-center justify-around bg-gray-700 text-white">
              <p className="border w-full text-center">id</p>
              <p className="border w-full text-center">name</p>
              <p className="border w-full text-center">active</p>
            </div>
            {helpers.map((helper) => (
              <div
                onClick={() => handleSelected(helper.id)}
                key={helper.id}
                className="flex items-center justify-around"
              >
                <p className="border w-full text-center">{helper.id}</p>
                <p className="border w-full text-center">{helper.name}</p>
                <p className="border w-full text-center">
                  {helper.active ? "true" : "false"}
                </p>
              </div>
            ))}
          </div>
          <div className="w-1/2 flex flex-col h-2/3 border-2 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="flex flex-col items-center h-full mt-10 space-y-3">
                <input
                  defaultValue={selectedHelper ? selectedHelper.id : undefined}
                  {...register("id")}
                  type="number"
                  placeholder="ID (autoincrement)"
                  className="border-2 rounded-md p-2 w-2/3"
                  readOnly
                />
                <input
                  defaultValue={selectedHelper ? selectedHelper.name : ""}
                  {...register("name")}
                  type="text"
                  placeholder="Name"
                  className="border-2 rounded-md p-2 w-2/3"
                />
                <select
                  {...register("active")}
                  className="border-2 rounded-md p-2 w-2/3"
                >
                  <option
                    value="true"
                    selected={
                      selectedHelper ? selectedHelper.active === "true" : true
                    }
                  >
                    true
                  </option>
                  <option
                    value="false"
                    selected={
                      selectedHelper ? selectedHelper.active === "false" : false
                    }
                  >
                    false
                  </option>
                </select>
              </div>
              <div className="flex items-center justify-around mt-10">
                {selectedHelper ? (
                  <button
                    type="submit"
                    className="flex items-center justify-around gap-3 border-2 rounded-full px-5 py-3 w-36"
                  >
                    <FaCircleArrowUp className="text-3xl" />
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center justify-around gap-3 border-2 rounded-full px-5 py-3 w-36"
                  >
                    <FaCirclePlus className="text-3xl" />
                    Create
                  </button>
                )}
                <button
                  onClick={handleCancel}
                  className="flex items-center justify-around gap-3 border-2 rounded-full px-5 py-3 w-36"
                >
                  <FaCircleXmark className="text-3xl" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
