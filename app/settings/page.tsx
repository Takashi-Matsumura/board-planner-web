import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [isReloading, setIsReloading] = useState<boolean>(false);

  useEffect(() => {
    console.log("SettingsPage mounted");
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl my-10">Settings</h1>
        <div className="flex w-full justify-between gap-10 h-screen">
          <div className="w-1/2 flex flex-col h-2/3 border-2 rounded-lg">
            hoge
          </div>
          <div className="w-1/2 flex flex-col h-2/3 border-2 rounded-lg">
            aho
          </div>
        </div>
      </div>
    </div>
  );
}
