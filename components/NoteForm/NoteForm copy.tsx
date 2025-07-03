"use client";
import css from "./NoteForm.module.css";
// import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
// import * as Yup from "yup";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
// const FormSchema = Yup.object().shape({
//   title: Yup.string()
//     .required("Title is required")
//     .min(3, "Too short")
//     .max(50, "Too long"),
//   content: Yup.string().max(500, "Too long"),
//   tag: Yup.string()
//     .required("Tag is required")
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]),
// });
interface CreateNoteValues {
  title: string;
  content: string;
  tag: string;
}
// const initialValues: CreateNoteValues = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };
// interface NoteFormProps {
//   onClose: () => void;
// }
export default function NoteForm() {
  const route = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      route.push("/notes/filter/All");
      // onClose();
    },
  });
  const handleSubmit = (
    values: CreateNoteValues
    // { resetForm }: FormikHelpers<CreateNoteValues>
  ) => {
    mutation.mutate(values);
    // console.log(values);
    // resetForm();
    // onClose();
  };
  const handle = (formData: FormData) => {
    const values: CreateNoteValues = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as string,
    };
    handleSubmit(values);
  };
  const handleCancel = () => route.back();
  return (
    <form action={handle} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          required
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error} />
      </div>

      <div className={css.actions}>
        <button
          onClick={handleCancel}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          // disabled=false
        >
          Create note
        </button>
      </div>
    </form>
  );
}
