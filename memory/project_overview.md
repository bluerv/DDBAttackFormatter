---
name: project-overview
description: DDB Attack Formatter — React app for formatting D&D Beyond monster attack stat blocks into rollable DDB notation
metadata:
  type: project
---

React + PrimeReact app that formats D&D Beyond monster attack blocks into the rollable DDB link notation used in stat blocks.

Core components: MonsterAttack (form), DisplayAttackOutput (renders formatted output), Recharge sub-component.

**Why:** Reduces manual data entry when building monster stat blocks.

**How to apply:** The user's goal is reducing tedium, not perfection — partial parses that still need manual cleanup are acceptable.

Added `parseAttackText.ts` (regex-based parser) and a "Parse" button in the scratch pad to populate form fields from pasted DDB attack text. Parser handles: attack name, recharge, attack type, to-hit bonus, reach/range, target, fixed+dice damage, damage type.
