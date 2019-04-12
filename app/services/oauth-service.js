import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
    cookies: service(),
    ajax: service(),
    router: service(),

    clientId: "5cac3206d23dc25e3bbb1ffe",
    clientSecret: '5c90db71eeefcc082c0823b2',
    redirectUri: 'http://192.168.200.27:4200/oauth-callback',
    // redirectUri: 'http://maxbi.pharbers.com/oauth-callback',
    scope: "APP/System",
    version: 'v0',
    scopeResult: "",

    oauthOperation() {
        let cookies = this.get('cookies'),
			token = cookies.read('token');

		if (!token) {
			let host = 'http://192.168.100.116:31417',
                // host = 'http://report.pharbers.com',
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
            localStorage.setItem('needRedirect', false);
			window.location = [host, version, resource, url].join('/');
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
                    localStorage.setItem('needRedirect', true);
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
        localStorage.removeItem('needRedirect')
    }

});
