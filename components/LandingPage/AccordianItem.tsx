"use client"

import { useState } from "react";

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-5">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-gray-900 focus-visible:outline-none"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{title}</span>
        <span className="ml-4 text-xl leading-none cursor-pointer">{open ? "−" : "+"}</span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-60"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-sm text-gray-600">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default AccordionItem;