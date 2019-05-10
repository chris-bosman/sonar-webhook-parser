
const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL
const webhook = new IncomingWebhook(url);

async function parseSonarPayload (request) {
    const data = request.payload;

    if (data.qualityGate.status == "OK") {
        var slackText = "All Quality Gates Passed"
        var slackColor = "#36a64f"
    } else {
        slackText = "Quality Gates Failed. See detailed results by clicking the link above."
        slackColor = "$ff0000"
    }

    const gateResults = data.qualityGate.conditions;
    var results = [];
    for (var i = 0; i < gateResults.length; i++) {
        var result = gateResults[i];
        if (result.status == "NO_VALUE") {
            var value = "N/A"
        } else {
            value = `Gate failed if result is ${result.operator} ${result.errorThreshold}\nResult: ${result.value}\nStatus: ${result.status}`
        }
        var field = { "title": `Metric: ${result.metric}`, "value": value, "short": false }
        results.push(field);
    }

    await webhook.send({
        attachments: [
            {
                "pretext": "For additional details, click the link below",
                "title": `Analysis Complete for\nProject: ${data.project.name}\nBranch: ${data.branch.name}`,
                "title_link": data.branch.url,
                "author_name": "SonarQube Quality Results",
                "author_link": `${data.serverUrl}/dashboard?id=${data.project.key}&selected_date=${data.analysedAt}`,
                "color": slackColor,
                "text": slackText,
                "fields": results,
                "ts": data.analysedAt
            }
        ]
    });
}

export { parseSonarPayload };
