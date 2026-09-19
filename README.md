# KYC Chase AI — AI Teammate for Merchant KYC Operations

An AI-powered merchant KYC operations prototype that detects incomplete onboarding cases, retrieves relevant policy using Cognee, decides the next action using a pre-trained LLM, automatically follows up on normal cases, verifies completion, and escalates risky or ambiguous cases to a human reviewer.

**Detect → Decide → Follow Up → Verify → Escalate**

## Problem

Merchant onboarding teams deal with repetitive operational cases:

* Missing KYC documents
* Repeated follow-ups
* Cases that remain pending
* Risk flags and document mismatches
* Cases requiring human review

Manually checking every pending case is time-consuming and difficult to scale.

## Solution

KYC Chase AI acts as an AI teammate for the operations team.

```text
Merchant Case
     ↓
Google Sheets
     ↓
Detect Pending Cases
     ↓
Cognee Policy Retrieval
     ↓
Pre-trained LLM
     ↓
┌───────────┬───────────┬─────────┐
│ FOLLOW_UP │ ESCALATE  │ CLOSE   │
└───────────┴───────────┴─────────┘
      ↓          ↓
  Merchant     Human
  Follow-up    Review
      ↓
  Verification
      ↓
    CLOSE
```

## How It Works

### 1. Detect

n8n reads the merchant case queue and identifies pending cases.

### 2. Policy Retrieval

Cognee retrieves the relevant KYC policy context.

The LLM does not invent the KYC requirements; it receives the policy context before making its decision.

### 3. AI Decision

A pre-trained LLM evaluates the merchant case against the retrieved policy and returns one of three actions:

* **FOLLOW_UP** — documents are missing and there is no risk issue.
* **ESCALATE** — a risk flag, mismatch, ambiguity, or other high-risk condition requires human review.
* **CLOSE** — all required documents are present and there is no risk issue.

### 4. Automated Action

For a normal incomplete case, n8n generates a personalized follow-up message and updates the case.

### 5. Verification

After the merchant submits the missing documents, the verification workflow checks the case again.

If all required documents are present and there is no risk issue, the case is closed.

### 6. Human Escalation

Risky or ambiguous cases are not automatically approved or closed.

They are routed to a human reviewer with the relevant risk information.

## Example Demo Cases

### Normal Case

```text
Missing document: Address Proof
Risk flag: None

        ↓

AI Decision: FOLLOW_UP

        ↓

Merchant receives follow-up

        ↓

Missing document submitted

        ↓

Verification

        ↓

CLOSED
```

### Risky Case

```text
Risk flag: Repeated failed resubmission

        ↓

AI Decision: ESCALATE

        ↓

Human Review
```

## Technology Stack

* **React + Vite** — thin operations dashboard
* **n8n** — workflow orchestration and automation
* **Cognee** — policy/knowledge retrieval
* **Pre-trained LLM** — case reasoning and action selection
* **Google Sheets** — prototype merchant case queue
* **GitHub** — source code and workflow versioning

## Repository Structure

```text
kyc-dashboard/
├── src/
│   ├── components/
│   ├── data/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── policy/
│   ├── KYC_SOP_Policy.txt
│   └── kyc_policy.md
├── kyc-chase-agent-workflow.json
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Run the React Dashboard

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

The dashboard uses mock data for the frontend demonstration.

## n8n Workflow

The exported workflow is available at:

```text
kyc-chase-agent-workflow.json
```

The workflow contains the main KYC decision and automation logic, including policy retrieval, AI decision-making, follow-up, escalation, verification, and Google Sheets updates.

## Policy

The KYC policy used by the prototype is available in:

```text
policy/kyc_policy.md
```

The policy defines required documents, normal incomplete cases, high-risk conditions, follow-up rules, escalation rules, and verification behavior.

## Human-in-the-Loop

The system is designed to assist—not replace—the operations team.

Routine and well-defined cases can be automated, while risky, conflicting, or ambiguous cases are routed to humans for review.

## Why This Architecture?

Instead of training a new AI model for every company policy, the prototype separates:

**Reasoning** → pre-trained LLM

**Company policy** → Cognee

**Execution** → n8n

This allows policies to be updated independently from the model and keeps the workflow focused on operational automation.

## Future Extensions

The same architecture can be extended beyond KYC to other operational workflows such as:

* Refund policy handling
* Merchant disputes
* Payment issues
* Compliance workflows
* Account verification

The core pattern remains:

**Retrieve policy → Reason → Act → Verify → Escalate when necessary**

## Project Goal

KYC Chase AI demonstrates how an AI teammate can continuously monitor operational cases, handle repetitive follow-ups, verify progress, and bring the right exceptions to human reviewers at the right time.
