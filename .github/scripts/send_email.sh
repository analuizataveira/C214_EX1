#!/bin/bash

echo "Pipeline Executado!" | mail -s "Notificação de Pipeline" "$EMAIL_DESTINATARIO"