build-image:
	docker build -t sui2 .

run-image:
	docker run --rm -t -p 3300:3000 -v /tmp/sui2-data:/data sui2
