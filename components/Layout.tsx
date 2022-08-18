import React from "react";
import styles from "../styles/Home.module.css";

export const Layout = ({ children }: React.PropsWithChildren) => (
  <>
    <main className={styles.main}>{children}</main>
    <footer className={styles.footer}>
      ƒ∆ → Francisco Caballero – © {new Date().getFullYear()}
    </footer>
  </>
);
