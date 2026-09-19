import { Fragment, useMemo, useState } from "react";
import StatusBadge from "./StatusBadge.jsx";
import RiskBadge from "./RiskBadge.jsx";

export default function CaseTable({ cases, activeCaseId, query, setQuery, statusFilter, setStatusFilter }) {
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      const matchesQuery =
        query.trim() === "" ||
        c.merchant.toLowerCase().includes(query.toLowerCase()) ||
        c.id.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [cases, query, statusFilter]);

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Merchant cases</h2>
          <p className="panel-sub">Onboarding and KYC completeness queue</p>
        </div>
        <div className="table-controls">
          <input
            type="text"
            placeholder="Search merchant or case ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-select"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
            <option value="escalated">Escalated</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table className="case-table">
          <thead>
            <tr>
              <th>Case</th>
              <th>Merchant</th>
              <th>Status</th>
              <th>Risk</th>
              <th>Missing documents</th>
              <th>SLA deadline</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const isActive = c.id === activeCaseId;
              const isExpanded = expandedId === c.id;
              return (
                <Fragment key={c.id}>
                  <tr
                    className={`case-row${isActive ? " case-row-active" : ""}`}
                    onClick={() => setExpandedId(isExpanded ? null : c.id)}
                  >
                    <td className="case-id">{c.id}</td>
                    <td>
                      <div className="merchant-name">{c.merchant}</div>
                      <div className="merchant-category">{c.category}</div>
                    </td>
                    <td>
                      <StatusBadge status={c.status} />
                    </td>
                    <td>
                      <RiskBadge risk={c.risk} />
                    </td>
                    <td className="missing-docs">
                      {c.missingDocs.length === 0 ? (
                        <span className="muted">None</span>
                      ) : (
                        c.missingDocs.join(", ")
                      )}
                    </td>
                    <td className="sla">{c.slaDeadline}</td>
                  </tr>
                  {isExpanded && (
                    <tr className="case-detail-row">
                      <td colSpan={6}>
                        <div className="case-detail">
                          <span className="detail-label">Agent note</span>
                          <span>{c.note}</span>
                          <span className="detail-label">Submitted</span>
                          <span>{c.submitted}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-row">
                  No cases match this search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
