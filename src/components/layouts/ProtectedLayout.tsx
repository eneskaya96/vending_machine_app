import React, { ReactNode } from "react";

import styles from "@/styles/components/layouts/Layout.module.scss";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export const ProtectedLayout = ({ children }: Props) => (
  <>
    <Navbar />
    <div className={styles.container}>{children}</div>
    <Footer />
  </>
);
