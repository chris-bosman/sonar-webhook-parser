import importedUsers from './tc_users.json';

function findSlackUser(gitUser) {
    for (var i = 0; i < importedUsers.slackUsers.length; i++) {
        if (gitUser.includes(importedUsers.slackUsers[i].gitUser)) {
            var userID = importedUsers.slackUsers[i].id;
            return userID;
        }
    }
}

export { findSlackUser };
