#!/usr/bin/env node
import { spawn } from 'node:child_process';

const ISSUE_NUMBER = process.env.ISSUE_NUMBER;
const ISSUE_TITLE = process.env.ISSUE_TITLE || '';
const ISSUE_LABELS = (process.env.ISSUE_LABELS || '').split(',').map((s) => s.trim());
const REPO = process.env.GITHUB_REPOSITORY; // e.g. horvat-ivan/meetup-cms-design
const PRODUCT_REPO = 'horvat-ivan/meetup-cms-product';

if (!ISSUE_NUMBER || !REPO) {
  console.error('ISSUE_NUMBER and GITHUB_REPOSITORY env vars required');
  process.exit(1);
}

const featureLabel = ISSUE_LABELS.find((l) => l.startsWith('feature:'));
if (!featureLabel) {
  console.log('[pr-link] no feature: label, skipping');
  process.exit(0);
}

// Seeds are auto-created by dispatch and ARE the parent's children;
// commenting on the parent about its own seed would be noise.
if (ISSUE_LABELS.includes('seed')) {
  console.log('[pr-link] seed issue, skipping (parent is already linked via dispatch)');
  process.exit(0);
}

// We need to find the parent issue in product. Cheapest: list issues in product
// with the same feature: label and role:product, then comment on the first match.

async function gh(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('gh', args, { stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    proc.stdout.on('data', (d) => { out += d.toString(); });
    proc.stderr.on('data', (d) => { err += d.toString(); });
    proc.on('close', (code) => {
      if (code === 0) resolve(out.trim());
      else reject(new Error(`gh ${args.join(' ')} -> ${code}\n${err}`));
    });
  });
}

const parentJson = await gh([
  'issue', 'list',
  '--repo', PRODUCT_REPO,
  '--label', `${featureLabel},role:product`,
  '--state', 'all',
  '--json', 'number,comments',
  '--limit', '5',
]);
const parents = JSON.parse(parentJson);
if (parents.length === 0) {
  console.log('[pr-link] no parent issue found, skipping');
  process.exit(0);
}
const parent = parents[0];

// Idempotency: skip if a comment already mentions this sub-issue.
const subRef = `${REPO}#${ISSUE_NUMBER}`;
const dupe = (parent.comments || []).some((c) => c.body && c.body.includes(subRef));
if (dupe) {
  console.log(`[pr-link] comment for ${subRef} already exists, skipping`);
  process.exit(0);
}

const repoShort = REPO.split('/')[1];
const role = repoShort.includes('design') ? 'design' : 'app';
const commentBody = `📨 New ${role} sub-issue created: ${REPO}#${ISSUE_NUMBER} — "${ISSUE_TITLE}"`;

await gh([
  'issue', 'comment', String(parent.number),
  '--repo', PRODUCT_REPO,
  '--body', commentBody,
]);
console.log(`[pr-link] commented on ${PRODUCT_REPO}#${parent.number}`);
