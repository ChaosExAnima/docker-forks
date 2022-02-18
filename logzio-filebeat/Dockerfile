FROM elastic/filebeat:8.0.0

USER root

RUN mkdir -p /usr/share/filebeat/input.d && \
	mkdir -p /etc/pki/tls/certs && \
	mkdir -p /var/lib/filebeat && \
	chown filebeat:filebeat /var/lib/filebeat

RUN curl -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt \
	https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt

COPY entrypoint.sh /entrypoint.sh

USER filebeat

RUN filebeat keystore create
COPY filebeat.yml /usr/share/filebeat

VOLUME /usr/share/filebeat/inputs.d

ENTRYPOINT [ "/usr/bin/tini", "--", "/entrypoint.sh" ]
CMD [ "-environment", "container" ]