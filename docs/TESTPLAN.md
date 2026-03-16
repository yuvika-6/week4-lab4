# Test Plan for Legacy COBOL Student Account Management App

This test plan validates the key business logic for the COBOL app: view balance, credit, debit, and error handling.

> Note: Added an extra comment to retrigger Step 3 workflow based on path filtering.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|------------------------|----------------|------------|-----------------|----------------|--------------------|----------|
| TC-01 | View initial balance | App has initial balance 1000.00 | Start app, choose option 1, exit | Display 1000.00 | | | |
| TC-02 | Credit small amount | 1000.00 | Option 2, credit 5.00, option 1, exit | New balance 1005.00 | | | |
| TC-03 | Credit large amount | 1000.00 | Option 2, credit 500000.00, option 1 | New balance 501000.00 | | | |
| TC-04 | Debit small amount | 1000.00 | Option 3, debit 5.00, option 1 | New balance 995.00 | | | |
| TC-05 | Debit exact balance | 1000.00 | Option 3, debit 1000.00, option 1 | New balance 0.00 | | | |
| TC-06 | Debit insufficient funds | 1000.00 | Option 3, debit 1500.00, option 1 | Insufficient funds + unchanged | | | |
| TC-07 | Invalid menu value zero | 1000.00 | Enter 0, then 4 | Invalid choice prompt | | | |
| TC-08 | Invalid menu value five | 1000.00 | Enter 5, then 4 | Invalid choice prompt | | | |
| TC-09 | Non-numeric menu input | 1000.00 | Enter 'A', then 4 | Invalid choice prompt | | | |
| TC-10 | Chain: credit then debit valid | 1000.00 | Credit 100, debit 50, query | Balance 1050 then 1000 | | | |
| TC-11 | Chain: debit then credit | 1000.00 | Debit 100, credit 200, query | Balance 1100 | | | |
| TC-12 | Zero credit amount | 1000.00 | Credit 0, query | Balance 1000 | | | |
| TC-13 | Zero debit amount | 1000.00 | Debit 0, query | Balance 1000 | | | |
| TC-14 | Negative credit value (unexpected) | 1000.00 | Credit -100 | Runtime behavior (likely error) | | | |
| TC-15 | Negative debit value (unexpected) | 1000.00 | Debit -100 | Behavior depends runtime | | | |
| TC-16 | Sequential read consistency | 1000.00 | View 1, view again | Always 1000 until mutation | | | |
| TC-17 | Read after credit | 1000.00 | Credit 120, view | 1120 | | | |
| TC-18 | Read after debit | 1000.00 | Debit 120, view | 880 | | | |
| TC-19 | Multiple credits sums | 1000.00 | Credit 100, credit 200, view | 1300 | | | |
| TC-20 | Multiple debits sums | 1000.00 | Debit 100, debit 200, view | 700 | | | |
| TC-21 | Credit then insufficient debit | 1000.00 | Credit 50, debit 1200 | Insufficient, balance 1050 | | | |
| TC-22 | Debit then credit | 1000.00 | Debit 1000, credit 50 | 50 | | | |
| TC-23 | Exit path not mutate | 1000.00 | Option 4 only | state remains 1000 internal | | | |
| TC-24 | Multiple invalid operations then credit | 1000.00 | invalid 7, invalid 8, credit 100 | 1100 | | | |
| TC-25 | Whitespace menu input | 1000.00 | input ' ' then 4 | invalid choice | | | |
| TC-26 | Call chain sanity | n/a | Main->Operations->DataProgram operations | no crash, correct responses | | | |
| TC-27 | DataProgram read-only check | 1000.00 | call READ | returns 1000 | | | |
| TC-28 | DataProgram write update check | 1000.00 | write 1500 then read | returns 1500 | | | |
| TC-29 | Storage persistence within run | 1000.00 | credit 100, read | 1100 | | | |
| TC-30 | Invalid operation safe by main | 1000.00 |  option 1-3 run normally | always stable | | | |
| TC-31 | Large value handling | 1000.00 | credit 999999.99, read | 1000999.99 | | | |
| TC-32 | Decimal precision preserved | 1000.00 | debit 12.34, read | 987.66 | | | |
| TC-33 | Debit reject preserves state | 1000.00 | debit 2000 | rejects, remains 1000 | | | |
| TC-34 | Zero balance reject debit | 0.00 | debit 1.00 | reject insufficient | | | |
| TC-35 | Rapid repeated operations | 1000.00 | run credit 10x, debit 10x | expected final balance | | | |
| TC-36 | Unknown operation in operations.cob | n/a | simulate impossible op code | no action/no crash | | | |
