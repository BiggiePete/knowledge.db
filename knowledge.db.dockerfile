FROM oven/bun:1.1.7-alpine as build
WORKDIR /src
COPY . .
RUN bun i
RUN bun prisma generate
RUN bun prisma migrate deploy
RUN bun run vite build

FROM oven/bun:1.1.7-alpine
COPY --from=build /src/build /src/build
CMD [ "bun","/src/build/index.js" ]