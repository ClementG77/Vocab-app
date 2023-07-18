import { create } from 'zustand';

interface AddwordModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAddwordModal = create<AddwordModalStore>((set) => ({
    isOpen: false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false}),
}));

export default useAddwordModal;

