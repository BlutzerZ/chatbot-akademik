import { useDeviceDetect } from "@/hooks/useDeviceDetect";

export default function InputFooter() {
  const isMobile = useDeviceDetect();
  return (
    <>
      {/* If mobile */}
      {isMobile && (
        <div className="bg-white py-8 h-fit fixed bottom-0 w-screen">
          <div className="px-3">
            <div className="flex p-2 w-full h-fit max-h-fit bg-primary-100 rounded-2xl">
              <textarea
                name="message"
                id="message"
                placeholder="Tanyakan sesuatu..."
                className="placeholder-tertiary-500 h-full px-5 py-3 focus:outline-none bg-transparent w-full rounded-2xl resize-none overflow-hidden"
                rows={1}
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto"; // Reset height
                  target.style.height = `${target.scrollHeight}px`; // Set height based on content
                }}
              ></textarea>

              <button className="flex items-center justify-center rounded-full bg-primary-700 hover:bg-primary-800 m-2 p-5 w-2 h-2 max-h-fit">
                <span className="material-symbols-outlined text-white flex items-center justify-center">
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
          <div className="flex p-2 h-fit max-h-fit bg-secondary-100 rounded-2xl">
            <textarea
              name="message"
              id="message"
              placeholder="Tanyakan sesuatu..."
              className="h-full px-5 py-3 focus:outline-none bg-transparent rounded-2xl resize-none overflow-hidden w-full"
              rows={1}
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto"; // Reset height
                target.style.height = `${target.scrollHeight}px`; // Set height based on content
              }}
            ></textarea>

            <button className="flex items-center justify-center rounded-full bg-primary-700 hover:bg-primary-800 m-2 p-5 w-2 h-2 max-h-fit">
              <span className="material-symbols-outlined text-white flex items-center justify-center">
                arrow_upward
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
