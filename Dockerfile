FROM node:10-slim

COPY . /app
WORKDIR /app

ENV NODE_ENV=production

RUN npm i
RUN npm i typescript -g
RUN tsc *.ts --resolveJsonModule
RUN rm *.ts
RUN npm uninstall typescript -g

EXPOSE 8181

ENV HOST=0.0.0.0
ENV PORT=8181
ENV SLACK_WEBHOOK_URL=
ENV SLACK_ALERT_URL=
ENV SLACK_KEY=

CMD [ "node", "index.js" ]