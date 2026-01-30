"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { toast } from "sonner";
import {
  type ModalContextType,
  type ModalName,
  modalRegistry,
  type OpenModalFunction,
} from "./modal-registry";
import { ModalRenderer } from "./modal-renderer";

interface ModalContextProps {
  modals: ModalContextType<ModalName>[];
  openModal: OpenModalFunction;
  currentModalId: string | null;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<
    (ModalContextType<ModalName> & { id: string })[]
  >([]);

  const openModal = useCallback<OpenModalFunction>((name, data) => {
    // we use an animation frame to avoid tanstack tables from being rerender
    // when the modal is opened from inside a table
    requestAnimationFrame(() => {
      const isAvailableAction = Object.hasOwn(modalRegistry, name);

      if (!isAvailableAction) {
        toast.warning(`Modal action "${name}" is not registered.`);
        return;
      }

      const modalId = Math.random().toString(36).substring(2, 11);

      setModals((prev) => {
        // If there are no modals open (called from dashboard), replace
        if (prev.length === 0) {
          return [{ id: modalId, name, data }];
        }
        // If modals are already open (called from within a modal), stack
        return [...prev, { id: modalId, name, data }];
      });
    });
  }, []);

  const closeModal = (modalId: string) => {
    setModals((prev) => {
      // Only close if the modal is the last one (the one calling closeModal)
      if (prev.length > 0 && prev[prev.length - 1].id === modalId) {
        return prev.slice(0, -1);
      }
      // Safety: don't close if it's not the topmost modal
      return prev;
    });
  };
  const closeAllModals = () => {
    setModals([]);
  };

  const currentModalId =
    modals.length > 0 ? modals[modals.length - 1].id : null;

  return (
    <ModalContext.Provider
      value={{ modals, openModal, closeModal, currentModalId, closeAllModals }}
    >
      {children}
      {modals.map((modal) => (
        <ModalRenderer
          key={modal.id}
          modal={modal}
          modalId={modal.id}
          closeModal={closeModal}
        />
      ))}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
