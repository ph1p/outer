const axios = require('axios');

const Outer = (_options) => {
    return {
        // available clients
        clients: {
            'rocket.chat': {
                host: _options.url + '/api/v1/',
                apiLogin: 'login',
                apiPostMessage: 'chat.postMessage'
            },
            'slack': {
                host: _options.url || 'https://slack.com/api/',
                apiPostMessage: 'chat.postMessage'
            }
        },

        // options
        options: {
            adapter: 'rocket.chat', // slack and rocket.chat
            username: '',
            password: '',
            channel: '', // #channel or @username
            alias: '',
            emoji: '',
            ..._options
        },

        // rocket.chat token and userId
        authToken: null,
        userId: null,

        /**
         * Get client config
         */
        client() {
            return this.clients[this.options.adapter];
        },

        /**
         * Authenticate user
         */
        authenticate() {
            return new Promise((resolve, reject) => {
                if (this.authToken === null && this.userId === null) {
                    if (this.options.adapter === 'rocket.chat') {
                        axios.post(this.client().host + this.client().apiLogin, {
                                username: this.options.username,
                                password: this.options.password
                            })
                            .then(res => {
                                this.authToken = res.data.data.authToken;
                                this.userId = res.data.data.userId;
                                resolve();
                            }).catch((error) => {
                                reject();
                            });
                    } else if (this.options.adapter === 'slack') {
                        resolve();
                    } else {
                        reject();
                    }
                } else {
                    resolve();
                }
            });
        },

        /**
         * Post message to channel
         * @param {*} _message 
         */
        log(_message) {
            this.authenticate().then(() => {
                if (this.options.adapter === 'rocket.chat') {
                    // set headers
                    axios.defaults.headers.common['X-Auth-Token'] = this.authToken;
                    axios.defaults.headers.common['X-User-Id'] = this.userId;

                    // send new text
                    axios.post(this.client().host + this.client().apiPostMessage, {
                            alias: this.options.alias,
                            channel: this.options.channel,
                            emoji: this.options.emoji,
                            text: _message
                        })
                        .catch((error) => {
                            console.log(error.response.data);
                        });
                } else if (this.options.adapter === 'slack') {
                    // send new text
                    axios.post(this.client().host + this.client().apiPostMessage, `token=${this.options.token}&username=${this.options.alias}&channel=${this.options.channel}&icon_emoji=${this.options.emoji}&text=${_message}`).catch((error) => {
                        console.log(error.response.data);
                    });
                }
            }).catch(() => {
                console.log('no auth');
            });
        }
    }
};

module.exports = Outer;