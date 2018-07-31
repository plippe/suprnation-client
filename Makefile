.PHONY: server-run

server-run:
	cd server && \
		npm install && \
		node server.js
