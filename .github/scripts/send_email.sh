#!/bin/bash

# Envia o e-mail
echo "Pipeline Executado!" | mail -s "Pipeline Exercicio S107" "$DESTINATARIO"
