"use client"

import { Save } from "lucide-react"
import { useEffect } from "react"

const SaveButton = () => {

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        console.log('저장');
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <button className="flex items-center gap-1 px-3 p-1 rounded bg-blue-400 text-white cursor-pointer">
      <Save size={20} />
      <p>저장</p>
    </button>
  )
}

export default SaveButton