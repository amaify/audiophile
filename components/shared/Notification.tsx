"use client";

import { Transition } from "@headlessui/react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/20/solid";

function Notification() {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{ className: "", style: { background: "transparent", boxShadow: "none", width: "100%" } }}
    >
      {(t) => (
        <ToastBar toast={t} style={{ width: "100%" }}>
          {({ icon, message }) => (
            <Transition
              appear
              show={t.visible}
              enter="transition-all duration-150"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
              className="w-full"
            >
              <span className="bg-white flex gap-2 p-5 w-full shadow-[2px_2px_12px_1px_rgba(0,0,0,0.3)] rounded-md relative sm:w-[38.4rem]">
                {icon}
                <span className="text-[1.4rem] font-medium pr-6">{message}</span>
                <XMarkIcon
                  className="absolute right-2 top-3 w-8 h-8 hover:fill-primary hover:cursor-pointer"
                  onClick={() => toast.dismiss(t.id)}
                />
              </span>
            </Transition>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default Notification;
