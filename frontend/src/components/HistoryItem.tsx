import { HistoryType } from "@/types/HistoryType";

export default function HistoryItem({ history }: { history: HistoryType }) {
  return (
    <button className="hover:bg-tertiary-200 w-full rounded-md px-5 py-4 text-left font-medium hover:bg-opacity-45">
      {history.date}
    </button>
  );
}
