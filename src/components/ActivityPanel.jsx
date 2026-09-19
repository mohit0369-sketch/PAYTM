export default function ActivityPanel({ log, isRunning, onRunNormal, onRunRisky, activeCaseId }) {
  return (
    <div className="panel activity-panel">
      <div className="panel-head">
        <div>
          <h2>AI activity</h2>
          <p className="panel-sub">Cognee retrieval and n8n execution trace</p>
        </div>
      </div>

      <div className="demo-buttons">
        <button className="btn btn-primary" onClick={onRunNormal} disabled={isRunning}>
          Run normal-case demo
        </button>
        <button className="btn btn-danger" onClick={onRunRisky} disabled={isRunning}>
          Run risky-case demo
        </button>
      </div>

      {activeCaseId && (
        <div className="active-case-tag">
          Acting on <strong>{activeCaseId}</strong>
        </div>
      )}

      <ul className="activity-log">
        {log.length === 0 && (
          <li className="activity-empty">
            Run a demo to see the agent detect, reason, act, and verify in real time.
          </li>
        )}
        {log.map((entry, i) => (
          <li className="activity-entry" key={i}>
            <span className="activity-dot" />
            <div>
              <div className="activity-label">{entry.label}</div>
              <div className="activity-detail">{entry.detail}</div>
              <div className="activity-time">{entry.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
