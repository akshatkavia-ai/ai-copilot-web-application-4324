#!/bin/bash
cd /home/kavia/workspace/code-generation/ai-copilot-web-application-4324/copilot_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

