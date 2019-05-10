# SonarQube -> Slack Integration

This project provides a NodeJS-based microservice that transforms SonarQube webhook payloads into Slack-compatible messages.

## Building

First, clone this repository.

`git clone https://github.com/chris-bosman/sonar-webhook-parser.git`

Modify the `Dockerfile` to include your Slack app's webhook URL:

```
...
ENV SLACK_WEBHOOK_URL=https://hooks.slack.com/services/<your values>
...
```

Then, build the Docker file.

`docker build . -t <friendly name>`

## Deploying

This part is up to you. Any infrastructure that can run a Docker image can run this. If you need to provide to your service the port, this application runs by default on port 8181. This can be changed by modifying the `ENV PORT` setting in the Dockerfile.

## Development

If you'd like to make changes to the application yourself, you'll need to create a `.env` file with vales for `HOST` `PORT` and `SLACK_WEBHOOK_URL` for local development.