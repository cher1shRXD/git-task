"use client"

import { SaveButtonProps } from "@/types/props/SaveButtonProps";
import { Save } from "lucide-react"
import { useEffect } from "react"

const SaveButton = ({ saveData, canSave }: SaveButtonProps) => {
  const handler = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      saveData();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [saveData]);

  return (
    <button className="flex items-center gap-1 px-3 p-1 rounded bg-blue-400 text-white cursor-pointer disabled:bg-gray-400" onClick={saveData} disabled={!canSave}>
      <Save size={20} />
      <p>저장</p>
    </button>
  )
}

export default SaveButton