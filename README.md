# Setup

```
scripts/setup
```

# Run

```
scripts/start
```

# Build docker image

```
scripts/ci-build
```

# Run docker image

```
docker run --name pdfproxy --rm -it -p 3000:3000 pdfproxy:latest
```

# Test 

Open the following URL in the browser

http://localhost:3000/?url=https://github.com/albertmatyi/pdfproxy