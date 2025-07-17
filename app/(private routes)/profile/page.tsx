// "use client";
import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";
// import { useAuth } from "@/lib/store/authStore";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Profile Page",
    description: "User profile page with personal information.",
    openGraph: {
      title: "Profile Page",
      description: "User profile page with personal information.",
      url: "https://08-zustand-nu.vercel.app/profile",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Profile Page",
        },
      ],
      type: "profile",
    },
  };
}
export default async function Profile() {
  // const { user } = useAuth();
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
