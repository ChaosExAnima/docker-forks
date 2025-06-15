FROM azinchen/duplicacy:latest

COPY /scripts/file_env.sh /bin/file_env.sh
COPY duplicacy/entrypoint.sh /bin/entrypoint.sh

ENTRYPOINT [ "/bin/entrypoint.sh" ]
