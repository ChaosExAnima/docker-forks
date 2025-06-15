FROM ghcr.io/nanos/fedifetcher

COPY scripts/file_env.sh /bin/file_env.sh
COPY fedifetcher/entrypoint.sh /bin/entrypoint.sh

ENTRYPOINT [ "/bin/entrypoint.sh" ]
