# Merchant KYC Onboarding Policy

## 1. Purpose

This policy defines the basic document requirements and review rules for the simulated merchant onboarding system.

The AI agent uses this policy to identify missing documents, prepare follow-up requests, and decide whether a case requires human review.

This is a simulated hackathon policy and is not a substitute for actual legal, regulatory, or company compliance procedures.

## 2. Required Documents

For this prototype, every merchant onboarding case requires:

- PAN
- Business Proof
- Address Proof

A case is considered document-complete only when all required documents are present and pass the applicable verification checks.

## 3. Incomplete Cases

A case is incomplete when one or more required documents are missing.

The agent should:

1. Identify the missing document or documents.
2. Prepare a specific follow-up request.
3. Avoid marking the case as complete.
4. Re-check the case after a resubmission.

Example:

- Submitted: PAN, Business Proof
- Missing: Address Proof
- Action: Request Address Proof from the merchant.

## 4. Low-Risk Cases

A case may be treated as low-risk for follow-up purposes when:

- A required document is clearly missing.
- No risk flag is present.
- There is no identity mismatch.
- There is no suspicious or repeated failure pattern.

For these cases, the agent may prepare or send a follow-up requesting the missing document, subject to the workflow's controls.

## 5. Cases Requiring Human Review

The agent must not automatically approve or close a case when any of the following is present:

- Name or identity mismatch
- Suspicious activity or pattern
- Repeated failed resubmissions
- Conflicting or ambiguous information
- Any case where the available information is insufficient for a reliable decision

These cases must be marked for human review or escalated to a designated reviewer.

## 6. Verification Rules

After a merchant submits a missing document:

1. Confirm that the required document is present.
2. Check whether the document satisfies the relevant requirement.
3. Check for identity or information mismatches.
4. Check whether any risk flag remains.
5. Do not mark the case complete merely because a file was uploaded.

If the requirement is satisfied and no escalation condition exists, the case may proceed to completion according to the workflow's configured review controls.

## 7. Status Definitions

- **Pending:** The case is incomplete or awaiting required action.
- **Complete:** All required documents have been received and the configured verification checks have passed.
- **Escalated:** The case requires human review because of risk, ambiguity, or failed verification.

## 8. Agent Safety Rules

- Do not invent missing documents or verification results.
- Do not ignore risk flags.
- Do not automatically approve high-risk or ambiguous cases.
- Do not expose sensitive merchant information in notifications.
- When uncertain, escalate to a human reviewer.
- Record the reason for each status change.

## 9. Example Decisions

### Example A — Normal Incomplete Case

Case: Merchant has submitted PAN and Business Proof.

Missing: Address Proof.

Decision: Request Address Proof. Keep the case Pending until verification is completed.

### Example B — Identity Mismatch

Case: Required documents are present, but the merchant name does not match across submitted information.

Decision: Escalate for human review. Do not automatically approve.

### Example C — Repeated Failed Resubmission

Case: Merchant repeatedly submits documents that fail the required checks.

Decision: Escalate for human review. Do not continue automatic approval attempts.

### Example D — Complete Case

Case: All required documents are present, verification checks pass, and no escalation condition exists.

Decision: The case may be marked Complete according to the configured workflow controls.
