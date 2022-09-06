#! /bin/bash

source /bin/file_env.sh

file_env "DUPLICACY_PASSWORD"
file_env "DUPLICACY_B2_ID"
file_env "DUPLICACY_B2_KEY"
file_env "STORAGE_URL"
file_env "SNAPSHOT_ID"

exec /init "$@"
