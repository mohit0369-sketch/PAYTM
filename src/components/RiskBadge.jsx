const LABELS = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
};

export default function RiskBadge({ risk }) {
  return <span className={`badge badge-risk-${risk}`}>{LABELS[risk] || risk}</span>;
}
