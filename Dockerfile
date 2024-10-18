FROM node:18-alpine@sha256:c13b26e7e602ef2f1074aef304ce6e9b7dd284c419b35d89fcf3cc8e44a8def9 AS builder

WORKDIR /var/www/qc-api
COPY . .
RUN npm ci \ 
  && npm cache clean --force \
  && npm run build

FROM builder AS production

WORKDIR /var/www/qc-api
RUN chown -R node:node /var/www/qc-api
USER node
COPY --chown=node:node --from=builder /var/www/qc-api /var/www/qc-api

CMD ["npm", "run", "dev"]