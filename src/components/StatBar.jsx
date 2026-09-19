export default function StatBar({ cases }) {
  const total = cases.length;
  const pending = cases.filter((c) => c.status === "pending").length;
  const complete = cases.filter((c) => c.status === "complete").length;
  const escalated = cases.filter((c) => c.status === "escalated").length;

  const stats = [
    { label: "Total cases", value: total },
    { label: "Pending", value: pending, tone: "pending" },
    { label: "Complete", value: complete, tone: "complete" },
    { label: "Escalated", value: escalated, tone: "escalated" },
  ];

  return (
    <div className="stat-bar">
      {stats.map((s, i) => (
        <div className="stat-cell" key={s.label}>
          <span className={`stat-value${s.tone ? ` stat-value-${s.tone}` : ""}`}>{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
