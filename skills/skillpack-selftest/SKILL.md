---
name: Skillpack Self-test
description: Verify that the skillpack plugin is installed and its skills are loading correctly. Use when the user asks whether skillpack works, whether it is installed, or wants to diagnose missing or skipped skills.
---

# Skillpack self-test

Confirm the pack is wired correctly. Work through the checks in order; stop and report at the
first failure.

## 1. The skill itself loaded

You are reading this, so the skill body resolved. That proves discovery, the skill index entry,
and content delivery all work.

## 2. Supporting files resolve

Read `reference/expected.md` relative to this skill's base directory. If the read fails, the pack
is being served without a real filesystem path and relative references are broken.

## 3. Neighbours are present

List the skills whose IDs the user has available. Report which of them came from skillpack and
which were already installed. A skill that exists in the catalog but not in the list was skipped
because the user already had an ID by that name.

## Report

Return a short table: check, result, and one line of detail. No prose beyond the table.
