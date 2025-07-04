import { create } from "zustand";
import { persist } from "zustand/middleware";
type draftNote = {
  draft: {
    title: string;
    content: string;
    tag: string;
  };
  setDraft: (draft: { title: string; content: string; tag: string }) => void;
  clearDraft: () => void;
};
const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<draftNote>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) => set({ draft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
