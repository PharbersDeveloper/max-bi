import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    cookies: service(),
    ajax: service(),
    router: service(),

    version: 'v0',
    scopeResult: "",
    clientId: "5cbd2aa6ceb3c45854b80d6a",
    clientSecret: '5c90db71eeefcc082c0823b2',
    redirectUri: 'http://192.168.0.100:4200/oauth-callback',
    host: 'http://192.168.100.174:20190',
    scope: "APP/System:[MAXBI]",
    // redirectUri: 'http://maxbi.pharbers.com/oauth-callback',
    // host: 'http://maxbi:8081',
    // scope: "APP/System:[MAXBI]",

    oauthOperation() {
        let cookies = this.get('cookies'),
			token = cookies.read('token');

		if (!token) {
            const ajax = this.get('ajax')
			let host = `${this.get('host')}`,
				version = `${this.get('version')}`,
				resource = 'GenerateUserAgent',
				url = '';

			url = `?client_id=${this.get('clientId')}
                        &client_secret=${this.get('clientSecret')}
                        &scope=${this.get('scope')}
						&redirect_uri=${this.get('redirectUri')}`.
				replace(/\n/gm, '').
				replace(/ /gm, '').
                replace(/\t/gm, '');
            ajax.request([version, resource, url].join('/'))
                .then(response => {
                    window.console.log(response);
                    return response;
                })
                .catch(err => {
                    window.console.log('error');
                    window.console.log(err);
                })
            // window.location = [host, version, resource, url].join('/');
		} else {
            this.get('router').transitionTo('country-lv-monitor');
        }
    },

    oauthCallback(transition) {
		let version = `${this.get('version')}`,
			resource = 'GenerateAccessToken',
			url = '',
			cookies = this.get('cookies');

		const ajax = this.get('ajax'),
			{ queryParams } = transition;

		if (queryParams.code && queryParams.state) {
			url = `?client_id=${this.get('clientId')}
					&client_secret=${this.get('clientSecret')}
					&scope=${this.get('scope')}
					&redirect_uri=${this.get('redirectUri')}
					&code=${queryParams.code}
					&state=${queryParams.state}`.
				replace(/\n/gm, '').
				replace(/ /gm, '').
				replace(/\t/gm, '');
			ajax.request([version, resource, url].join('/'))
				.then(response => {
                    let expiry = new Date(response.expiry);
                    let options = {
                        // domain: '.pharbers.com',
                        // path: '/',
                        expires: expiry
                    }
                    cookies.write('token', response.access_token, options);

					cookies.write('account_id', response.account_id, options);
					cookies.write('access_token', response.access_token, options);
					cookies.write('refresh_token', response.refresh_token, options);
                    cookies.write('token_type', response.token_type, options);
                    cookies.write('scope', response.scope, options);
                    cookies.write('expiry', response.expiry, options);
                    window.console.log(cookies.read('scope'));
                    
                    // localStorage.setItem('needRedirect', true);
					this.get('router').transitionTo('country-lv-monitor');
				});
		} else {
			this.get('router').transitionTo('country-lv-monitor');
		}
    },

    removeAuth() {
        this.cookies.clear("token")
        this.cookies.clear("account_id")
        this.cookies.clear("access_token")
        this.cookies.clear("refresh_token")
        this.cookies.clear("token_type")
        this.cookies.clear("scope")
        this.cookies.clear("expiry")
        // localStorage.removeItem('needRedirect')
    }

});
