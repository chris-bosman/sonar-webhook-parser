# SonarQube -> Slack Integration

This project provides a NodeJS-based microservice that transforms SonarQube webhook payloads from quality gate-analyses into Slack-compatible messages.

## Building

First, clone this repository.

`git clone https://github.com/chris-bosman/sonar-webhook-parser.git`

Modify the `Dockerfile` to include your own `SLACK_WEBHOOK_URL` and, optionally, a `SLACK_ALERT_URL` for alerting a separate channel only of failed quality gates:

```
...
ENV SLACK_WEBHOOK_URL=https://hooks.slack.com/services/<your values>
ENV SLACK_ALERT_URL=https://hooks.slack.com/services/<your values>
...
```

Then, build the Docker file.

`docker build . -t <friendly name>`

## Deploying

This part is up to you. Any infrastructure that can run a Docker image can run this. If you need to provide to your service the port, this application runs by default on port 8181. This can be changed by modifying the `ENV PORT` setting in the `Dockerfile`.

It is recommended that you leave the `SLACK_*_URL` environment variables blank in your `Dockerfile`. This is to prevent sensitive information, namely your Webhook URLs, from living in your code repository. Thus, when you deploy, you will have to provide the application with values for these environment variables in a method that suits your deployment target.

## Development

If you'd like to make changes to the application yourself, you'll need to create a `.env` file with vales for `HOST`, `PORT`, `SLACK_WEBHOOK_URL`, and `SLACK_ALERT_URL` for local development.