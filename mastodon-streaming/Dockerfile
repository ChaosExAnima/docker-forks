FROM ghcr.io/mastodon/mastodon:nightly

COPY /scripts/file_env.sh /bin/file_env.sh
COPY ./entrypoint.sh /bin/entrypoint.sh

ENTRYPOINT [ "/bin/entrypoint.sh" ]