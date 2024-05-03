FROM oven/bun:latest
WORKDIR /src
COPY . .
RUN bun i
RUN bun run vite build

FROM oven/bun:latest
COPY --from=0 /src/build /build
CMD [ "bun", "./build/index.js", ]