"use client";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const handleRegister = async (formData: FormData) => {
    const payload = Object.fromEntries(formData) as RegisterRequest;
    const res = await register(payload);

    if (res) {
      setUser(res);
      router.push("/profile");
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleRegister} className={css.form}>
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
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
}
