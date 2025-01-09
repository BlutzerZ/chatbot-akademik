"use client";

import Icon from "@/components/Icon";
import Link from "next/link";
import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    // Set the document title
    document.title = "Dashboard";
  }, []);

  return (
    <>
      {/* <h1>Dashboard</h1> */}
      <div className="flex h-1/5 w-full space-x-5">
        <div className="flex w-1/3 items-center justify-center rounded-xl bg-orange-600 p-10 py-24">
          <div className="flex flex-col gap-5">
            <Icon
              name="bolt"
              outlined={false}
              className="text-center text-white"
              size={36}
            />
            <div className="text-center text-white">
              <h1 className="text-2xl font-semibold">Current model</h1>
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-3xl font-extrabold">BNGKY22 v.1</h1>
                <Link href="/dashboard/models">
                  <button className="btn btn-circle btn-ghost">
                    <Icon name="edit" size={20} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-1/3 items-center justify-center rounded-xl bg-primary-800 p-10 py-24">
          <div className="flex flex-col gap-5">
            <Icon
              name="note_stack"
              outlined={false}
              className="text-center text-white"
              size={36}
            />
            <div className="text-center text-white">
              <h1 className="text-2xl font-semibold">13 new feedbacks</h1>
              <Link href="/dashboard/feedbacks">
                <button className="btn btn-ghost">Kelola</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
