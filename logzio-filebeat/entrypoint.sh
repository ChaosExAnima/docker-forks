#!/bin/bash

[ -r /run/secrets/logzio_token ] && cat /run/secrets/logzio_token | filebeat keystore add LOGZIO_TOKEN --force --stdin

/usr/local/bin/docker-entrypoint "$@"
