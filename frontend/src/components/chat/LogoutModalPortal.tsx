"use client";

import { useEffect, useState } from "react";
import Icon from "../Icon";
import { useRouter } from "next/navigation";
import { deleteToken } from "@/app/action";
import { createPortal } from "react-dom";

const LogoutModalPortal = () => {
  const router = useRouter();
  // const [isRedirecting, setIsRedirecting] = useState(false);

  async function handleSignout() {
    try {
      deleteToken();
      router.push("/sign-in");
    } catch {
      console.error("Error during sign out");
      // setIsRedirecting(false);
    }
  }

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("logout-modal-root"));
  }, []);

  return (
    <>
      <button
        className=""
        onClick={() => {
          const modal = document.getElementById(
            "logout-modal",
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
      >
        <Icon name="logout" />
        Keluar
      </button>

      {modalRoot &&
        createPortal(
          <dialog id="logout-modal" className="modal">
            <div className="modal-box">
              <div className="mb-5 h-full space-y-2">
                <div className="mb-5 flex flex-col justify-center gap-4">
                  {/* <Icon name="error" className="w-full border border-red-500 justify-center"/> */}
                  <h1 className="mt-2 w-full text-center text-2xl font-bold">
                    Anda yakin ingin keluar?
                  </h1>
                </div>
                {/* <h1>id: {id}</h1> */}
              </div>
              <div className="flex w-full justify-center gap-5">
                <form method="dialog">
                  <button className="btn h-fit w-24">Batal</button>
                </form>
                <button
                  className="btn h-fit w-24 bg-red-700 text-white hover:bg-red-600"
                  onClick={handleSignout}
                >
                  Keluar
                </button>
              </div>
            </div>
          </dialog>,
          modalRoot,
        )}
    </>
  );
};

export default LogoutModalPortal;
