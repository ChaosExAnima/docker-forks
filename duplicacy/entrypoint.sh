#! /bin/bash

set -e

file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"

	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		val="$(< "${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

file_env "DUPLICACY_PASSWORD"
file_env "DUPLICACY_B2_ID"
file_env "DUPLICACY_B2_KEY"
file_env "STORAGE_URL"
file_env "SNAPSHOT_ID"

/init
