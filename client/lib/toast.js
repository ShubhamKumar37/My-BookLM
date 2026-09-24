import { toast } from "sonner";

export const appToast = {
    loading: (message) => {
        return toast.loading(message);
    },

    success: (message) => {
        toast.success(message);
    },

    error: (message) => {
        toast.error(message);
    },

    dismiss: (toastId) => {
        toast.dismiss(toastId);
    },

    promise: (promise, messages) => {
        return toast.promise(promise, messages);
    },
};