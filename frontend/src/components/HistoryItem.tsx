import { HistoryType } from "@/types/HistoryType";

export default function HistoryItem({ history }: { history: HistoryType }) {
  return (
    <button className="w-full text-left py-4 hover:bg-tertiary-200 hover:bg-opacity-45 px-5 rounded-md font-medium">
      {history.date}
    </button>
  );
}
