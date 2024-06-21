import Link from "next/link";
import { FaRegSquarePlus, FaCirclePlus, FaCircleXmark } from "react-icons/fa6";

export default function SchedulePage() {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col border-2 rouded-md w-2/3 h-1/2">
          <div className="flex items-center justify-between bg-black w-full text-white px-4 py-2">
            <FaRegSquarePlus />
            Create a new schedule
          </div>
          <div className="flex flex-col items-center h-full justify-center">
            <h1>A Schedule</h1>
          </div>
          <div className="flex items-center justify-around py-5">
            <div className="flex items-center justify-around gap-3 border-2 rounded-full px-5 py-3 w-36">
              <FaCirclePlus className="text-3xl" />
              Add
            </div>
            <Link href="/board">
              <div className="flex items-center justify-around gap-3 border-2 rounded-full px-5 py-3 w-36">
                <FaCircleXmark className="text-3xl" />
                Cancel
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
