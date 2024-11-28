"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="drawer h-screen md:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content h-screen overflow-x-hidden">
            <div className="h-full">{children}</div>
          </div>

          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <div className="flex h-full flex-col bg-base-100 md:bg-base-200">
              <div className="flex w-full px-5 pb-4 pt-6 md:px-10 md:pb-1 md:pt-5">
                <h1>Header</h1>
              </div>

              <div className="menu block h-4/5 w-80 space-y-2 overflow-y-auto p-4 pb-24 text-base-content md:bg-base-200">
                <Link
                  href={`/dashboard`}
                  // className={`${props.activeChatId === conversation.id ? "active font-bold" : ""}`}
                >
                  <button
                    className={`w-full rounded-md px-6 py-4 text-start hover:bg-base-200 md:hover:bg-base-100`}
                  >
                    {/* {new Date(conversation.created_at).toLocaleString()} */}
                    Home
                  </button>
                </Link>
                <Link
                  href={`/dashboard/feedbacks`}
                  // className={`${props.activeChatId === conversation.id ? "active font-bold" : ""}`}
                >
                  <button
                    className={`w-full rounded-md px-6 py-4 text-start hover:bg-base-200 md:hover:bg-base-100`}
                  >
                    {/* {new Date(conversation.created_at).toLocaleString()} */}
                    Feedback
                  </button>
                </Link>
                <Link
                  href={`/dashboard/models`}
                  // className={`${props.activeChatId === conversation.id ? "active font-bold" : ""}`}
                >
                  <button
                    className={`w-full rounded-md px-6 py-4 text-start hover:bg-base-200 md:hover:bg-base-100`}
                  >
                    {/* {new Date(conversation.created_at).toLocaleString()} */}
                    Models
                  </button>
                </Link>
                <Link
                  href={`/dashboard/logs`}
                  // className={`${props.activeChatId === conversation.id ? "active font-bold" : ""}`}
                >
                  <button
                    className={`w-full rounded-md px-6 py-4 text-start hover:bg-base-200 md:hover:bg-base-100`}
                  >
                    {/* {new Date(conversation.created_at).toLocaleString()} */}
                    logs
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
