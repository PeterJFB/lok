FROM node:26-slim AS base

###########################################################
# 1. Install pnpm
###########################################################

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack
RUN corepack enable

FROM base AS prod

###########################################################
# 2. Install dependencies
###########################################################

ENV CI=true
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
WORKDIR /app
RUN pnpm fetch --prod

###########################################################
# 3. Build
###########################################################

COPY . .
RUN pnpm run build

###########################################################
# 4. Build final image
###########################################################

FROM base
COPY --from=prod /app/node_modules /app/node_modules
COPY --from=prod /app/build /app/build
COPY --from=prod /app/drizzle /app/drizzle

EXPOSE 3000
CMD [ "node", "/app/build/index.js" ]
