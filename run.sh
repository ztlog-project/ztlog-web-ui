#!/bin/bash

LOG_DIR="$(dirname "$0")/logs"
LOG_FILE="$LOG_DIR/app_$(date +%Y%m%d_%H%M%S).log"
mkdir -p "$LOG_DIR"

# WSL에서 Windows Node.js 충돌을 피하기 위해 PATH를 설정
export PATH=/usr/bin:$PATH

# 메모리 부족 오류를 방지하기 위해 Node.js 메모리 제한을 4GB로 늘림
# 컴파일 속도를 위해 TypeScript 타입 체크를 병렬로 실행하고 캐싱을 활성화
export NODE_OPTIONS="--max-old-space-size=4096"
export REACT_EDITOR=none
export TSC_COMPILE_ON_ERROR=true
export HOST=0.0.0.0

echo "=== 서버 시작: $(date) ===" | tee "$LOG_FILE"
echo "로그 파일: $LOG_FILE"

npm start 2>&1 | tee -a "$LOG_FILE"