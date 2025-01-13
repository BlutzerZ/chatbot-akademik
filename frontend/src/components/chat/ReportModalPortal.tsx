"use client";

import { FC, useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import { createPortal } from "react-dom";
import client from "@/api/backend-client";

type Props = {
  id: string;
  reported?: boolean;
};

const ReportModalPortal: FC<Props> = ({ reported, id }) => {
  // const [showModal, setShowModal] = useState(false);
  const [isReported, setIsReported] = useState(reported);
  const [isReportDisabled, setIsReportDisabled] = useState(false);
  // console.log(reported);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("report-modal-root"));
  }, []);

  const handleSendFeedback = async (feedback: string) => {
    setIsReportDisabled(true);

    try {
      const response = await client.PUT(`/messages/${id}/feedback`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          score: 0,
          content: feedback,
        },
        params: {
          query: {
            message_id: id,
          },
        },
      });

      if (response.data.code === 200) {
        setIsReported(true);
        setShowSuccessMessage(true);
        setTimeout(() => {
          modalRef.current?.close();
          setShowSuccessMessage(false);
        }, 2000);
      }
    } catch {
      // console.error("Error sending feedback: ", error);
      return new Error("Error sending feedback: ");
    } finally {
      setIsReportDisabled(false);
    }
  };

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
              {showSuccessMessage ? (
                <div className="flex flex-col items-center">
                  <Icon name="check_circle" className="text-green-500" />
                  <p className="text-lg font-bold">
                    Terima kasih atas masukannya!
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-5 h-full space-y-2">
                    <div className="mb-5 flex gap-4">
                      <Icon name="flag" />
                      <h1 className="text-2xl font-bold">Laporkan</h1>
                    </div>
                    <p>Berikan kritik dan saran anda mengenai respon ini</p>
                  </div>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      const feedback =
                        event.currentTarget.elements["report-message"].value;
                      handleSendFeedback(feedback);
                    }}
                  >
                    <textarea
                      name="report-message"
                      id="report-message"
                      className="textarea textarea-primary mb-5 h-40 w-full focus:outline-none"
                      placeholder="Tulis pesan anda..."
                    ></textarea>
                    <div className="flex justify-end gap-6">
                      <button
                        type="submit"
                        className={`btn btn-primary w-fit ${
                          isReportDisabled ? "loading" : ""
                        }`}
                        disabled={isReportDisabled}
                      >
                        Kirim
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </dialog>,
          modalRoot,
        )}
    </>
  );
};

export default ReportModalPortal;
