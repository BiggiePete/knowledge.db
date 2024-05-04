FROM oven/bun:1.1.7-alpine
WORKDIR /src
COPY . .
RUN bun i
RUN bun run vite build

FROM oven/bun:1.1.7-alpine
COPY --from=0 /src/build /build
CMD [ "bun", "./build/index.js", ]