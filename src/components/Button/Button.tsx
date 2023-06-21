import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

export default function Button({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const className = classNames({
    [styles.button]: true,
    [styles.buttonDisabled]: disabled,
  });

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}
