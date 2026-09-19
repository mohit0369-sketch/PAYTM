import { useState } from "react";
import { initialCases, activityScript } from "./data/cases.js";
import StatBar from "./components/StatBar.jsx";
import CaseTable from "./components/CaseTable.jsx";
import ActivityPanel from "./components/ActivityPanel.jsx";

const NORMAL_CASE_ID = "MCH-2065"; // low risk, single missing document
const RISKY_CASE_ID = "MCH-2044"; // high risk, repeated mismatch

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function App() {
  const [cases, setCases] = useState(initialCases);
  const [log, setLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeCaseId, setActiveCaseId] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  async function runDemo(kind) {
    if (isRunning) return;
    const caseId = kind === "normal" ? NORMAL_CASE_ID : RISKY_CASE_ID;
    const script = activityScript[kind];

    setIsRunning(true);
    setActiveCaseId(caseId);
    setLog([]);
    setStatusFilter("all");
    setQuery("");

    for (const step of script) {
      await wait(750);
      setLog((prev) => [...prev, { ...step, time: timestamp() }]);
    }

    await wait(500);

    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        if (kind === "normal") {
          return { ...c, status: "complete", missingDocs: [] };
        }
        return { ...c, status: "escalated" };
      })
    );

    setIsRunning(false);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M8.5 12.2 11 14.7l4.8-5.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h1>KYC Chase Agent</h1>
            <p>Read-only case dashboard &middot; demo data</p>
          </div>
        </div>
        <span className="env-tag">Prototype &middot; not connected to production</span>
      </header>

      <StatBar cases={cases} />

      <main className="app-main">
        <CaseTable
          cases={cases}
          activeCaseId={isRunning ? activeCaseId : null}
          query={query}
          setQuery={setQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <ActivityPanel
          log={log}
          isRunning={isRunning}
          onRunNormal={() => runDemo("normal")}
          onRunRisky={() => runDemo("risky")}
          activeCaseId={isRunning ? activeCaseId : null}
        />
      </main>
    </div>
  );
}
