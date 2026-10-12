#!/bin/sh
# Забирает свежую версию сайта из GitHub. Запускается по расписанию (cron) каждые 5 минут.
cd /var/www/oltech || exit 1
git fetch -q origin main && git reset -q --hard origin/main
