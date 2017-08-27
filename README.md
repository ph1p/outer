### What is this?

This is a small package to connect your node application to your slack or rocket.chat server and send your logs to specific channels or users.


### Options

| Name  |  Description | Platform |
|---|---|---|
| adapter  | rocket.chat _(default)_ or slack | both |
| channel  | #channel or @username | both |
| alias  | alias for username _(optional)_ | both |
| emoji  | avatar emoji _(optional)_ | both |
| token  | user token _(https://api.slack.com/custom-integrations/legacy-tokens)_ | slack |
| username  | username of rocket.chat user | rocket.chat |
| password  | password of rocket.chat user | rocket.chat |
| url  | api url only for rocket.chat  | rocket.chat |

---

### Example

    // CONFIGURE SLACK LOGGER
    const outer = require('outer')({
        adapter: 'slack',
        // https://api.slack.com/custom-integrations/legacy-tokens
        token: 'xoxp-65673-43244-23143249297-6392f67dfdsfdsf5613c4',
        channel: '#random',
        alias: 'My custom username',
        emoji: ':smirk:'
    });
   
    outer.log('Message from your *app*. Hi Slack!');
    
---

    // CONFIGURE ROCKET.CHAT LOGGER
    const outer = require('outer')({
        url: 'https://chat.yourserver.com',
        channel: '@username',
        alias: 'My custom username',
        emoji: ':smirk:',
        username: 'user',
        password: 'pass'
    });

    outer.log('Message from your *app*. Hi Rocket.Chat!');