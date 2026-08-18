import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-6 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#080806]/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-xl bg-[#0D0C09] border border-[rgba(198,148,59,0.2)] rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.8)] z-10 animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6943B] to-transparent rounded-t-xl" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-[var(--color-muted-text)] hover:text-[var(--color-gold-primary)] transition-colors rounded-full hover:bg-white/5 focus:outline-none z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
