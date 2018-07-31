.PHONY: server-run client-run

server-run:
	cd server && \
		npm install && \
		node server.js

client-run:
	cd client && \
		npm install && \
		ng serve
