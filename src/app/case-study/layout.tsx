import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ position: "relative", height: "100vh"}}>
      <div style={{ height: "100%", overflowY: "auto", padding: "6rem 2rem" }}>
        {children}
      </div>
    </section>
  );
}

export default layout;
