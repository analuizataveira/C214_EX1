#!/bin/bash

sudo apt-get install mailutils
echo "Pipeline Executado!" | mail -s "Notificação de Pipeline" faelsonbr@gmail.com