#!/bin/bash

sendemail -f "ana.taveiira@gmail.com" \
          -t "$EMAIL_DESTINATARIO" \
          -u "Notificação de Pipeline" \
          -m "Pipeline Executado!" \
          -s "smtp.gmail.com:587" \
          -xu "$SMTP_USUARIO" \
          -xp "$SMTP_SENHA" \
          -o tls=yes
