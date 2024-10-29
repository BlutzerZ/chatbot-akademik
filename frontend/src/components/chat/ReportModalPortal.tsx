"use client";

import { FC, useEffect, useState } from "react";
import Icon from "../Icon";
import { createPortal } from "react-dom";

type Props = {
  id: string;
  reported?: boolean;
};

const ReportModalPortal: FC<Props> = ({ reported, id }) => {
  // const [showModal, setShowModal] = useState(false);
  const [isReported, setIsReported] = useState(reported);
  const [isReportDisabled, setIsReportDisabled] = useState(false);
  // console.log(reported);

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"));
  }, []);

  return (
    <>
      <div className="tooltip tooltip-bottom" data-tip="Laporkan pesan ini">
        <button
          className="btn btn-circle btn-ghost"
          disabled={isReportDisabled}
          onClick={() => {
            // setShowModal(true);
            const modal = document.getElementById(
              "report-modal",
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
        >
          <Icon name="flag" outlined={!isReported} />
        </button>
      </div>

      {modalRoot &&
        createPortal(
          <dialog id="report-modal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="mb-5 h-full space-y-2">
                <div className="mb-5 flex gap-4">
                  <Icon name="flag" />
                  <h1 className="text-2xl font-bold">Laporkan</h1>
                </div>
                {/* <h1>id: {id}</h1> */}
                <p>Berikan kritik dan saran anda mengenai respon ini</p>
              </div>
              <form action="">
                <textarea
                  name="report-message"
                  id="report-message"
                  className="textarea textarea-primary mb-5 h-40 w-full focus:outline-none"
                  placeholder="Tulis pesan anda..."
                ></textarea>
                <input
                  type="hidden"
                  name="report-message-id"
                  defaultValue={id}
                />
                <div className="flex justify-end gap-6">
                  {/* <button className="btn btn-ghost"
                                                onClick={() => {
                                                      const modal = document.getElementById("report-modal") as HTMLDialogElement;
                                                      modal?.close();
                                                }}>
                                                      Batal
                                                </button> */}
                  <button
                    type="submit"
                    className="btn btn-primary w-fit"
                    onClick={() => {
                      // setShowModal(false);
                      setIsReported(true);
                      setIsReportDisabled(true);
                    }}
                  >
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </dialog>,
          modalRoot,
        )}
    </>
  );
};

export default ReportModalPortal;
