#!/usr/bin/env bash
# review-prep.sh — собирает артефакт для ревью: что изменилось + прошли ли тесты.
# Оркестратор (Claude Code) вызывает это после работы coder'а, чтобы ревьюить
# АРТЕФАКТ (diff + тесты), а не нарратив задачи — независимость контролей.
#
#   ./review-prep.sh [тест-команда]
#   ./review-prep.sh "npm test"
#
# Тесты гоняются В ПЕСОЧНИЦЕ (не на хосте) — тот же изолированный контейнер.

set -euo pipefail

PROJECT="${AGENT_PROJECT:-/home/yanko/code/betnetics}"
IMAGE="${AGENT_IMAGE:-agent-sandbox}"
TEST_CMD="${1:-}"

cd "$PROJECT"

echo "=== CHANGED FILES ==="
git status --short 2>/dev/null || echo "(не git-репозиторий)"

echo ""
echo "=== DIFF ==="
git diff 2>/dev/null || echo "(нет diff)"
# новые файлы git diff не показывает — покажем их содержимое отдельно
for f in $(git ls-files --others --exclude-standard 2>/dev/null); do
  echo ""
  echo "--- NEW FILE: $f ---"
  cat "$f"
done

if [ -n "$TEST_CMD" ]; then
  echo ""
  echo "=== TESTS ($TEST_CMD) ==="
  # тесты в песочнице: сеть закрыта (тестам она не нужна), только workspace
  docker run --rm \
    --mount "type=bind,source=$PROJECT,target=/workspace" \
    --network none --cap-drop ALL --security-opt no-new-privileges \
    --pids-limit 256 --memory 2g --cpus 2 \
    -w /workspace \
    --entrypoint sh \
    "$IMAGE" \
    -c "$TEST_CMD" 2>&1 || echo "(тесты завершились с ошибкой — см. вывод выше)"
fi
