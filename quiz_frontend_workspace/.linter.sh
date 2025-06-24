#!/bin/bash
cd /home/kavia/workspace/code-generation/morning-paws-quiz-113754-d960178e/quiz_frontend_workspace/quiz_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

