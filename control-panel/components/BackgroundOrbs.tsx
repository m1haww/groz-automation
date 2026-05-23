export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="orb animate-float-slow"
        style={{
          width: 500,
          height: 500,
          top: "-10%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(239, 68, 68, 0.32) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb animate-float-slower"
        style={{
          width: 420,
          height: 420,
          top: "25%",
          right: "-8%",
          background:
            "radial-gradient(circle, rgba(153, 27, 27, 0.40) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb animate-float-slow"
        style={{
          width: 460,
          height: 460,
          bottom: "-12%",
          left: "30%",
          background:
            "radial-gradient(circle, rgba(185, 28, 28, 0.25) 0%, transparent 70%)",
          animationDelay: "5s",
        }}
      />
    </div>
  );
}
