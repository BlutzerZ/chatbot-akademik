import { useDeviceDetect } from "@/hooks/useDeviceDetect";

export default function InputFooter() {
  const isMobile = useDeviceDetect();
  return (
    <>
      {/* If mobile */}
      {isMobile && (
        <div className="fixed bottom-0 h-fit w-screen bg-white py-8">
          <div className="px-3">
            <div className="bg-primary-100 flex h-fit max-h-fit w-full rounded-2xl p-2">
              <textarea
                name="message"
                id="message"
                placeholder="Tanyakan sesuatu..."
                className="placeholder-tertiary-500 h-full w-full resize-none overflow-hidden rounded-2xl bg-transparent px-5 py-3 focus:outline-none"
                rows={1}
                onInput={(e: React.FormEvent) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto"; // Reset height
                  target.style.height = `${target.scrollHeight}px`; // Set height based on content
                }}
              ></textarea>

              <button className="bg-primary-700 hover:bg-primary-800 m-2 flex h-2 max-h-fit w-2 items-center justify-center rounded-full p-5">
                <span className="material-symbols-rounded flex items-center justify-center text-white">
                  arrow_upward
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If browser */}
      {!isMobile && (
        <div
          className="fixed bottom-0 h-36 bg-white px-64 py-10"
          style={{ width: `calc(100% - 20rem)` }}
        >
          <div className="bg-secondary-100 flex h-fit max-h-fit rounded-2xl p-2">
            <textarea
              name="message"
              id="message"
              placeholder="Tanyakan sesuatu..."
              className="h-full w-full resize-none overflow-hidden rounded-2xl bg-transparent px-5 py-3 focus:outline-none"
              rows={1}
              onInput={(e: React.FormEvent) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto"; // Reset height
                target.style.height = `${target.scrollHeight}px`; // Set height based on content
              }}
            ></textarea>

            <button className="bg-primary-700 hover:bg-primary-800 m-2 flex h-2 max-h-fit w-2 items-center justify-center rounded-full p-5">
              <span className="material-symbols-rounded flex items-center justify-center text-white">
                arrow_upward
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
