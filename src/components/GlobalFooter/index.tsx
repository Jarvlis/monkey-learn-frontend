import React from "react";
import "./index.css";

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div
      className="global-footer"
      style={{
        textAlign: "center",
        paddingBlockStart: 12,
      }}
    >
      <div>© {currentYear} 面试刷题平台</div>
      <div>by Jarvlis</div>
    </div>
  );
}