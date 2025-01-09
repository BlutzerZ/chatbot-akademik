"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const queryClient = new QueryClient();

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];

  console.log(currentPath);

  useEffect(() => {
    // Add the DaisyUI class to the body
    document.body.classList.add("bg-base-300");

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("bg-base-300");
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div id="logout-modal-root"></div>
        <div className="drawer h-screen md:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content h-screen overflow-x-hidden">
            {/* <ToggleDrawer /> */}
            <div className="flex h-screen flex-col">
              <DashboardHeader />
              <div className="h-full w-full p-10">{children}</div>
            </div>
          </div>

          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <div className="flex h-full flex-col bg-base-100 md:bg-base-200">
              <div className="flex w-full justify-center px-5 pb-4 pt-6 md:px-10 md:pb-1 md:pt-5">
                {/* <h1>Header</h1> */}
                <Logo width={100} />
              </div>

              <div className="menu block h-4/5 w-80 space-y-2 overflow-y-auto p-4 pb-24 text-base-content">
                <Link
                  href={`/dashboard`}
                  className={`${currentPath === undefined ? "active font-bold" : ""}`}
                >
                  <button
                    className={`flex w-full items-center gap-5 rounded-md px-6 py-4 text-start hover:bg-base-200 md:hover:bg-base-100 ${currentPath === undefined ? "bg-base-200 md:bg-base-300" : ""}`}
                  >
                    {/* {new Date(conversation.created_at).toLocaleString()} */}
                    <Icon
                      name="home"
                      outlined={currentPath === undefined ? false : true}
                    />
                    Home
                  </button>
                </Link>
                <Link
                  href={`/dashboard/feedbacks`}
                  className={`${currentPath === "feedbacks" ? "active font-bold" : ""}`}
                >
                  <button
                    className={`flex w-full items-center gap-5 rounded-md px-6 py-4 text-start hover:bg-base-200 md:hover:bg-base-100 ${currentPath === "feedbacks" ? "bg-base-200 md:bg-base-300" : ""}`}
                  >
                    {/* {new Date(conversation.created_at).toLocaleString()} */}
                    <Icon
                      name="note_stack"
                      outlined={currentPath === "feedbacks" ? false : true}
                    />
                    Feedback
                  </button>
                </Link>
                <Link
                  href={`/dashboard/models`}
                  className={`${currentPath === "models" ? "active font-bold" : ""}`}
                >
                  <button
                    className={`flex w-full items-center gap-5 rounded-md px-6 py-4 text-start hover:bg-base-200 md:hover:bg-base-100 ${currentPath === "models" ? "bg-base-200 md:bg-base-300" : ""}`}
                  >
                    {/* {new Date(conversation.created_at).toLocaleString()} */}
                    <Icon
                      name="bolt"
                      outlined={currentPath === "models" ? false : true}
                    />
                    Models
                  </button>
                </Link>
                <Link
                  href={`/dashboard/logs`}
                  className={`${currentPath === "logs" ? "active font-bold" : ""}`}
                >
                  <button
                    className={`flex w-full items-center gap-5 rounded-md px-6 py-4 text-start hover:bg-base-200 md:hover:bg-base-100 ${currentPath === "logs" ? "bg-base-200 md:bg-base-300" : ""}`}
                  >
                    {/* {new Date(conversation.created_at).toLocaleString()} */}
                    <Icon
                      name="history"
                      outlined={currentPath === "logs" ? false : true}
                    />
                    Logs
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default DashboardLayout;
