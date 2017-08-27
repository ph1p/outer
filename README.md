### What is this?

This is a small package to connect your node application to your slack or rocket.chat server and send your logs to specific channels or users.

#### rocket.chat
![rocketchat](https://user-images.githubusercontent.com/15351728/29752941-abaf6c3e-8b67-11e7-87b9-31bea04ccfd6.png)
#### slack
![slack](https://user-images.githubusercontent.com/15351728/29752943-ad2c4c6c-8b67-11e7-99c2-c39a233ff5e7.png)

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