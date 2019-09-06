const { IncomingWebhook } = require('@slack/webhook');
const { WebClient } = require('@slack/web-api');

const catchAllChannelUrl = process.env.SLACK_WEBHOOK_URL;
const catchAllChannelHook = new IncomingWebhook(catchAllChannelUrl);

const alertChannelUrl = process.env.SLACK_ALERT_URL;
const alertChannelHook = new IncomingWebhook(alertChannelUrl);

async function sendToSlack(message) {
    await catchAllChannelHook.send({
        attachments: [message]
    });
}

async function alertSlack(message) {
    await alertChannelHook.send({
        attachments: [message]
    });
}

async function directMessage(message, slackUserId) {
    const token = process.env.SLACK_KEY;
    const web = new WebClient(token);

    const res = await web.chat.postMessage({
        channel: slackUserId,
        as_user: true,
        attachments: [message]
    })

    console.log(res.ts);
}

export { sendToSlack, alertSlack, directMessage };