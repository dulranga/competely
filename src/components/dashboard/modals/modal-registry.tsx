import dynamic from "next/dynamic";
import { FC } from "react";
import { DialogContent } from "~/components/ui/dialog";

export type ModalComponentProps<Data> = {
    data: Data;
    closeModal: () => void;
};

export const modalRegistry = {
    // viewChatDetails: dynamic(() => import("./modals/ViewChatDetails")),
    // inquiryDetails: dynamic(() => import("./modals/InquiryDetailsModal")),
    confirm: dynamic(() => import("./modals/ConfirmModal")),

    placeholder: (() => <DialogContent></DialogContent>) as FC<ModalComponentProps<Record<string, unknown>>>,
} as const;

// Helper types
export type ModalRegistry = typeof modalRegistry;
export type ModalName = keyof ModalRegistry;
export type ModalProps<T extends ModalName> = React.ComponentProps<ModalRegistry[T]>;
export type ModalContextType<K extends ModalName> =
    | {
          name: K;
          data: ModalProps<K>["data"];
      }
    | { name: null };
export type OpenModalFunction = <K extends ModalName>(name: K, data: ModalProps<K>["data"]) => void;
