const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;
const alertUrl = process.env.SLACK_ALERT_URL;
const webhook = new IncomingWebhook(url);
const alertHook = new IncomingWebhook(alertUrl);

async function sendToSlack(message) {
    await webhook.send({
        attachments: [message]
    });
}

async function alertSlack(message) {
    await alertHook.send({
        attachments: [message]
    });
}

export { sendToSlack, alertSlack };