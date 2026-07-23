#!/usr/bin/env bash
# Post-deploy smoke checks. The repo has no test framework by design (see
# TODOS.md) — this is the regression net, runnable against preview or prod:
#   ./scripts/smoke.sh https://<deployment-url> [published-page-id] [draft-page-id]
set -u

BASE="${1:?usage: smoke.sh <base-url> [published-page-id] [draft-page-id]}"
PUBLISHED_ID="${2:-}"
DRAFT_ID="${3:-}"
FAIL=0

check() { # name, expected, actual
  if [ "$2" = "$3" ]; then
    echo "ok   $1 ($3)"
  else
    echo "FAIL $1 — expected $2, got $3"
    FAIL=1
  fi
}

status() { curl -s -o /dev/null -w "%{http_code}" "$1"; }

# Pages render
check "GET /"          200 "$(status "$BASE/")"
check "GET /writing"   200 "$(status "$BASE/writing")"
check "GET /books"     200 "$(status "$BASE/books")"
check "GET /thoughts"  200 "$(status "$BASE/thoughts")"
check "GET /projects"  200 "$(status "$BASE/projects")"
check "GET /nope-404"  404 "$(status "$BASE/definitely-not-a-page")"

# Redirects: permanent:true emits 308, and Location must point at /writing
check "/posts redirect code" 308 "$(status_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/posts"); echo "$status_code")"
LOC=$(curl -s -o /dev/null -w "%{redirect_url}" "$BASE/posts")
case "$LOC" in *"/writing") echo "ok   /posts Location ($LOC)";; *) echo "FAIL /posts Location — got $LOC"; FAIL=1;; esac
check "/posts/x redirect code" 308 "$(status "$BASE/posts/some-slug")"

# Feed: 200, XML parses, correct content type
FEED_CODE=$(status "$BASE/feed.xml")
check "GET /feed.xml" 200 "$FEED_CODE"
if [ "$FEED_CODE" = "200" ] && command -v xmllint >/dev/null 2>&1; then
  if curl -s "$BASE/feed.xml" | xmllint --noout - 2>/dev/null; then
    echo "ok   feed.xml parses as XML"
  else
    echo "FAIL feed.xml is not valid XML"; FAIL=1
  fi
fi
check "GET /sitemap.xml" 200 "$(status "$BASE/sitemap.xml")"

# Revalidate endpoint: unauthorized without header
check "POST /api/revalidate (no auth)" 401 "$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/revalidate")"

# Image proxy semantics (needs fixture IDs)
if [ -n "$PUBLISHED_ID" ]; then
  CODE=$(status "$BASE/api/notion-image/$PUBLISHED_ID")
  CTYPE=$(curl -s -o /dev/null -w "%{content_type}" "$BASE/api/notion-image/$PUBLISHED_ID")
  check "proxy published cover code" 200 "$CODE"
  case "$CTYPE" in image/*) echo "ok   proxy content-type ($CTYPE)";; *) echo "FAIL proxy content-type — got $CTYPE"; FAIL=1;; esac
fi
if [ -n "$DRAFT_ID" ]; then
  check "proxy draft/unknown id" 404 "$(status "$BASE/api/notion-image/$DRAFT_ID")"
fi

exit $FAIL
