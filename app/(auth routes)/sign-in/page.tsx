"use client";
import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { login, LoginRequest } from "@/lib/clientApi";
import { useAuth } from "@/lib/store/authStore";
export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuth((state) => state.setUser);
  const handleLogin = async (formData: FormData) => {
    const payload = Object.fromEntries(formData) as LoginRequest;
    const res = await login(payload);
    if (res) {
      setUser(res);
      router.push("/profile");
    }
  };
  console.log(useAuth((state) => state.user));
  return (
    <main className={css.mainContent}>
      <form action={handleLogin} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {/* <p className={css.error}>{error}</p> */}
      </form>
    </main>
  );
}
