import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	ajax: service(),
	cookies: service(),
	clientId: '5cac3206d23dc25e3bbb1ffe',
	clientSecret: '5c90db71eeefcc082c0823b2',
	redirectUri: 'http://192.168.0.100:4200/oauth-callback',
	beforeModel(transition) {
		let version = 'v0',
			resource = 'GenerateAccessToken',
			scope = 'MAXBI',
			url = '',
			cookies = this.get('cookies');

		const ajax = this.get('ajax'),
			{ queryParams } = transition;

		if (queryParams.code && queryParams.state) {
			url = `?response_type=authorization_code
					&client_id=${this.get('clientId')}
					&client_secret=${this.get('clientSecret')}
					&scope=${scope}
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
                        // path: '/'
                        expires: expiry
                    }
					cookies.write('token', response.access_token, options);
					cookies.write('account_id', response.account_id, options);
					// cookies.write('account_id', '5c4552455ee2dd7c36a94a9e');
					cookies.write('access_token', response.access_token, options);
					cookies.write('refresh_token', response.refresh_token, options);
					cookies.write('expiry', response.expiry, options);
					cookies.write('token_type', response.token_type, options);
					this.transitionTo('country-lv-monitor');
				});
		} else {
			this.transitionTo('country-lv-monitor');
		}
	}
});
