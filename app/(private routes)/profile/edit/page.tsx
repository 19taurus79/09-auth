"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useAuth } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
export default function EditProfile() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="../../../public/file.svg"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              defaultValue={user?.username}
              id="username"
              type="text"
              className={css.input}
            />
          </div>

          <p>{user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={() => router.back()}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
