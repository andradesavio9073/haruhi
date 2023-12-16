"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Fragment, ReactNode, RefObject, useEffect } from "react";
import { Transition } from "@headlessui/react";
import cx from "classix";

export type Props = {
  open?: boolean;
  modal?: boolean;
  onOpenChange?: (open: boolean) => void;
  content?: ReactNode;
  contentRef?: RefObject<HTMLDivElement>;
};

export default (props: Props) => {
  return (
    <DialogPrimitive.Root
      open={props.open}
      onOpenChange={props.onOpenChange}
      modal={props.modal}
    >
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={props.open}>
          <Transition.Child
            className={"relative"}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 isolate z-20 flex  justify-center overflow-y-auto bg-white/75 dark:bg-black/75"
            >
              <DialogPrimitive.Content
                ref={props.contentRef}
                forceMount
                className={cx(
                  "w-[95vw] max-w-7xl rounded-lg p-4 md:w-full",
                  "min-h-screen",
                )}
              >
                {props.content}
                <DialogPrimitive.Close />
              </DialogPrimitive.Content>
            </DialogPrimitive.Overlay>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
