#!/usr/bin/env bash
# agent-task.sh — запуск локального coder-агента по ОДНОЙ подзадаче.
# Вызывается оркестратором (Claude Code) или вручную.
#
#   ./agent-task.sh <файл-с-подзадачей>
#   ./agent-task.sh .agent-tasks/subtask-1.md
#
# Отличие от ask.sh: задача берётся из ФАЙЛА (удобно оркестратору — он готовит
# файл с точным контекстом), не делает git-checkpoint (checkpoint делает
# оркестратор один раз на весь тикет), выводит результат машинно-читаемо.
#
# Возвращает в stdout JSON-строку с итогом:
#   {"status":"done|failed","turns":N,"edited":[...],"read":[...]}
# stderr — поток verbose (что делал агент). Так оркестратор видит и итог,
# и подробности, не смешивая их.

set -euo pipefail

PROJECT="${AGENT_PROJECT:-/home/yanko/code/betnetics}"
CODE_DIR="${AGENT_CODE_DIR:-/home/yanko/code/1files}"
LMSTUDIO_IP="${AGENT_LM_IP:-192.168.31.240}"
LMSTUDIO_PORT="${AGENT_LM_PORT:-1234}"
MODEL="${AGENT_MODEL:-qwen3-14b}"
IMAGE="${AGENT_IMAGE:-agent-sandbox}"

TASK_FILE="${1:?usage: agent-task.sh <файл-с-подзадачей>}"
if [ ! -f "$TASK_FILE" ]; then
  echo "agent-task: файл не найден: $TASK_FILE" >&2
  exit 1
fi

TASK="$(cat "$TASK_FILE")"

# запуск coder в песочнице; --no-think для скорости (снять для сложных задач)
docker run --rm -i \
  --mount "type=bind,source=$PROJECT,target=/workspace" \
  --mount "type=bind,source=$CODE_DIR,target=/opt/agent,readonly" \
  --add-host "lmstudio:$LMSTUDIO_IP" \
  --cap-drop ALL --security-opt no-new-privileges \
  --pids-limit 256 --memory 2g --cpus 2 \
  --entrypoint python3 \
  "$IMAGE" \
  /opt/agent/agent_loop.py \
    --task "$TASK" \
    --workspace /workspace \
    --base-url "http://lmstudio:$LMSTUDIO_PORT/v1" \
    --model "$MODEL" \
    --verbose --no-think
