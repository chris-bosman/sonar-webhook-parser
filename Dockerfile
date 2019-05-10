FROM node:10-slim

COPY . /app
WORKDIR /app

ENV NODE_ENV=production

RUN npm i
RUN npm i typescript -g
RUN tsc *.ts
RUN rm *.ts
RUN npm uninstall typescript -g

EXPOSE 8181

ENV HOST=0.0.0.0
ENV PORT=8181
ENV SLACK_WEBHOOK_URL=https://hooks.slack.com/services/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

CMD [ "node", "index.js" ]