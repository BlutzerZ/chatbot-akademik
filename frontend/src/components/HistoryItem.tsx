import { HistoryType } from "@/types/HistoryType";

export default function HistoryItem({ history }: { history: HistoryType }) {
  return (
    <button className="w-full rounded-md px-5 py-4 text-left font-medium hover:bg-tertiary-200 hover:bg-opacity-45">
      {history.date}
    </button>
  );
}
