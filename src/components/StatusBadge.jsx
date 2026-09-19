const LABELS = {
  pending: "Pending",
  complete: "Complete",
  escalated: "Escalated",
};

export default function StatusBadge({ status }) {
  return <span className={`badge badge-status-${status}`}>{LABELS[status] || status}</span>;
}
