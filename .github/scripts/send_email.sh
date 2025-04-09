#!/bin/bash

sudo apt-get install -y mailutils
echo "Pipeline Executado!" | mail -s "Notificação de Pipeline" "$EMAIL_DESTINATARIO"