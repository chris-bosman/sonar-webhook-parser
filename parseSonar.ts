import { sendToSlack, alertSlack } from './slackRouting';

async function parseSonarPayload (request) {
    const data = request.payload;

    if (data.qualityGate.status == "OK") {
        var slackText = "All Quality Gates have passed"
        var slackColor = "#36a64f"
    } else {
        slackText = "At least one Quality Gate has failed"
        slackColor = "#ff0000"
    }

    const gateResults = data.qualityGate.conditions;
    var results = [];
    for (var i = 0; i < gateResults.length; i++) {
        var result = gateResults[i];
        if (result.status == "NO_VALUE") {
            var value = "N/A"
        } else {
            value = `Result: ${result.value}, fails if ${result.operator} ${result.errorThreshold}`
        }
        var field = { "title": `${result.metric}: ${result.status}`, "value": value, "short": false }
        results.push(field);
    }

    var message = {
        "mrkdwn": true,
        "pretext": "For additional details, click the link below",
        "title": `Analysis Complete for ${data.project.name}\nBranch: ${data.branch.name}`,
        "title_link": data.branch.url,
        "author_name": "SonarQube Quality Results",
        "author_link": `${data.serverUrl}/dashboard?branch=${data.branch.name}&id=${data.project.key}`,
        "color": slackColor,
        "text": slackText,
        "fields": results
    }

    if (data.qualityGate.status != "OK") {
        alertSlack(message);
    }

    await sendToSlack(message);
}

export { parseSonarPayload };
