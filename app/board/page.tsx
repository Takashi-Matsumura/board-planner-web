import Link from "next/link";
import {
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaHouse,
  FaRegSquarePlus,
} from "react-icons/fa6";

export default function BoardPage() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <div className="flex text-3xl w-full justify-between mt-10 mb-5">
          <FaCircleChevronLeft />
          2024年○月
          <FaCircleChevronRight />
        </div>
        <div className="flex w-full h-[80vh] space-x-1">
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl">月</p>
            <p>○日</p>
            <div className="flex flex-col border-4 rouded-md text-left p-2">
              <p>時間</p>
              <p>タイトル</p>
              <p>内容</p>
            </div>
          </div>
          <div className="border-2  w-full text-center">
            <p className="font-bold text-xl">火</p>
            <p>○日</p>
          </div>
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl">水</p>
            <p>○日</p>
          </div>
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl">木</p>
            <p>○日</p>
          </div>
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl">金</p>
            <p>○日</p>
          </div>
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl text-blue-700">土</p>
            <p>○日</p>
          </div>
          <div className="border-2 w-full text-center">
            <p className="font-bold text-xl text-red-700">日</p>
            <p>○日</p>
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
