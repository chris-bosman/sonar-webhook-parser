# SonarQube -> Slack Integration

This project provides a NodeJS-based microservice that transforms SonarQube webhook payloads from quality gate-analyses into Slack-compatible messages.

## Building

First, clone this repository.

`git clone https://github.com/chris-bosman/sonar-webhook-parser.git`

Modify the `Dockerfile` to include your own values for `SLACK_WEBHOOK_URL`, `SLACK_ALERT_URL`, and `SLACK_KEY`.

```env
...
ENV SLACK_WEBHOOK_URL=https://hooks.slack.com/services/<your values>
ENV SLACK_ALERT_URL=https://hooks.slack.com/services/<your values>
ENV SLACK_KEY=<your values>
...
```

Then, build the Docker file.

`docker build . -t <friendly name>`

## Running

You can run locally via `npm run watch`. This leverages `nodemon` and auto-pulls in changes you make to your Typescript files. By default, it will run at `localhost:8181`. You can also run in Docker via `docker run -p 8181:8181 <friendly name>` and it will, again, be exposed at `localhost:8181`. If you would like to expose it at a different port, you can adjust the first number in the `-p` command.

## Deploying

This part is up to you. Any infrastructure that can run a Docker image can run this. If you need to provide to your service the port, this application runs by default on port 8181. This can be changed by modifying the `ENV PORT` setting in the `Dockerfile`.

It is recommended that you leave the `SLACK_*` environment variables blank in your `Dockerfile`. This is to prevent sensitive information, namely your Webhook URLs, from living in your code repository. Thus, when you deploy, you will have to provide the application with values for these environment variables in a method that suits your deployment target.

## Development

If you'd like to make changes to the application yourself, you'll need to create a `.env` file with values for `HOST`, `PORT`, `SLACK_WEBHOOK_URL`, `SLACK_ALERT_URL`, and `SLACK_KEY` for local development.
