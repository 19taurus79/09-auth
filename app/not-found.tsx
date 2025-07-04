import { Metadata } from "next";
import css from "./Not-found.module.css";
export const metadata: Metadata = {
  title: "Notes Hub | Page Not Found",
  description: "The page you are looking for does not exist.",
  openGraph: {
    title: "Notes Hub | Page Not Found",
    description: "The page you are looking for does not exist.",
    url: `https://08-zustand-nu.vercel.app/not-found`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found in Notes Hub",
      },
    ],
    type: "article",
  },
};
const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};
export default NotFound;
