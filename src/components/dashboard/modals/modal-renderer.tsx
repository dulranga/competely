import { Suspense } from "react";
import { Dialog } from "~/components/ui/dialog";
import { type ModalContextType, type ModalName, modalRegistry } from "./modal-registry";
import { Loader2 } from "lucide-react";

type ModalRendererProps = {
    modal: ModalContextType<ModalName>;
    modalId: string;
    closeModal: (modalId: string) => void;
};

export function ModalRenderer({ modal, modalId, closeModal }: ModalRendererProps) {
    if (!modal.name) return null;

    const ModalContent = modalRegistry[modal.name];

    return (
        <Suspense
            fallback={
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none">
                    <Loader2 className="animate-spin size-6 text-primary" />
                </div>
            }
        >
            <Dialog open={true} onOpenChange={() => closeModal(modalId)}>
                <ModalContent
                    closeModal={() => closeModal(modalId)}
                    //  eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data={modal.data as any}
                />
            </Dialog>
        </Suspense>
    );
}
