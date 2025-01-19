import { ReactNode } from "react";
import styles from "./ControlsPanel.module.css";
import React from "react";

interface ControlsPanelProps {
  children: [ReactNode, ReactNode];
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ children }) => {
  return <div className={styles.controlsPanel}>{children}</div>;
};
