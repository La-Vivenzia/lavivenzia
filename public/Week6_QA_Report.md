# Week 6 QA Report — Credent Internship Program
**Prepared by:** Sarvesh Gajakosh (QA Intern)
**Date:** August 8, 2026
**Project:** Credent (Asenra)

---

## 1. Summary

This week covered my own two tickets (ASE-51, ASE-42) plus review of three others' work (ASE-46, ASE-50, ASE-48). One genuinely significant finding this week: **ASE-50's own test suite is completely circular and verifies nothing**, despite showing "10/10 passing." Everything else is solid.

---

## 2. My Own Tickets

### ✅ ASE-51 — Test Data Invariance, UI Filters & Concurrent Uploads (2 PRs, both merged)

**Backend PR (Credent-api):** `tests/test_concurrent_uploads_wal.py`
- Fired 25 real concurrent threads writing to SQLite simultaneously — 0 lock errors, all 25 persisted correctly
- Directly verified WAL mode + busy_timeout PRAGMAs are actually set (builds on ASE-46)
- Result: 3/3 passed — **merged**

**Frontend PR (Credent-web):** New Vitest + React Testing Library setup (none existed before) + 2 test files
- `ManagerDashboard.filter.test.jsx` — 7 tests against the real search/filter component (real typing, real clicking, combined AND-logic filters)
- `generatePdf.dataInvariance.test.js` — 9 tests proving PDF export data matches dashboard data exactly, by capturing real output from the real `downloadPDF()` function
- Result: 16/16 passed

**Important side-finding:** while opening this PR, discovered the production build itself was broken on `main` — traced to Karan's own commit (`5577dd7`) from Aug 1, an unmatched brace left behind after a refactor. Confirmed this was **pre-existing and unrelated to my PR** by building `main` directly with zero other changes — same exact failure. Flagged directly to Karan as a P0 issue separate from this ticket.

### ✅ ASE-42 — Integration Tests for Traceability & Dynamic Thresholds
- Built tests proving a real bug (dynamic bank policy never reaches the CAM decision logic, from ASE-43)
- Initially caused a CI red-X since the bug-proving test failed by design — fixed by converting it to `pytest.mark.xfail(strict=True)`, so CI now passes green while the test still actively proves the bug exists (and will alert us if the bug is ever silently reintroduced or fixed)
- Result: 3 passed, 1 xfailed — **merged**

---

## 3. Other Tickets Reviewed

### ✅ ASE-46 — Optimize SQLite, API Tracing & Production Hardening (Shlok)
- 4/5 deliverables verified working: WAL mode, UUID-prefixed filenames, correlation IDs (live-verified the `X-Correlation-ID` header myself), startup cleanup of orphaned files
- Initially flagged a gap: acceptance criteria asked for indexes on `company_name`/`decision`, only `created_at` was added
- **Resolved this week:** Shlok did a repository-wide workload analysis and confirmed with Karan that `company_name` isn't a real column, and no current query workload justifies indexing `company_id`/`decision` yet — confirmed this reasoning is sound (unused indexes only add write overhead with no benefit). Scope was legitimately narrowed, not skipped.
- **Verdict: Fully resolved, no outstanding gaps**

### 🔴 ASE-50 — Validate Sector Classifier Prompt Mapping (Siddhi) — Needs rework
**Critical finding: the test suite proves nothing.** `tests/test_sector_classifier.py` shows "10/10 passed," satisfying the letter of the ticket (10 test documents, assertions on returned values), but the test is circular:
```python
fake_result["sector"] = expected_sector   # hardcodes the answer
fake_chain.ainvoke.return_value = fake_model  # mocks the LLM to return that exact answer
...
assert result["sector"] == expected_sector   # then asserts it got back what it was given
```
This test would pass identically even if the real sector-classification prompt were completely broken or removed — it never actually exercises the real prompt/model logic. The acceptance criteria (*"accuracy of sector classification remains above 90%"*) is **not actually verified** by anything currently in the repo.

**Recommendation:** Needs a real test — either an actual (even minimal/cheap) LLM call against the 10 sample documents with real assertions on the output, or at minimum mock only the LLM's raw text response and let the real parsing/classification logic run on top of it, rather than mocking the final answer directly.

### ✅ ASE-48 — Fine-tune DSCR Extraction Edge-Cases (Yachna) — Genuinely solid
`tests/test_dscr_extraction.py` — 77 real tests, high quality:
- `normalize_to_inr()` tested with real parametrized inputs (Cr/Crore/Lakh notation, OCR artifacts like stray spaces and pipe separators, multi-currency, dead-code bug fix verified)
- Real DSCR/current ratio/D/E calculations tested with real numbers
- Edge cases: empty text, whitespace-only, all-LLM-attempts-fail fallback
- **Verdict: Tested & Approved, no issues found**

---

## 4. Minor Finding (Not Blocking)

`tests/test_sector_context.py::test_get_sector_outlook_mocked_success` now fails on latest `main` — it's stale test debt from before ASE-35 (weeks ago), which intentionally changed `risk_factors` to always come from the local CSV instead of the AI response. The test was never updated to match. Not a functional bug, just an outdated assertion — worth a quick cleanup pass.

---

## 5. Full Regression Status
Ran the complete backend suite on latest `main`: **339 passed, 1 xfailed (intentional), 1 failed (the stale ASE-35-era test above)** — no new regressions caused by this week's merges.

---

## 6. Recommendations

1. **ASE-50 should not be marked Done as-is** — the test suite needs to actually exercise real classification logic before the 90% accuracy claim can be trusted.
2. Quick cleanup ticket for the stale `test_sector_context.py` assertion.
3. Confirm with Karan that the `main` production build issue (found during ASE-51) has been fixed, since it's unrelated to any ticket and could otherwise sit unnoticed.
