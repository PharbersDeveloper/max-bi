import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	cookies: service(),
	clientId: '5cac3206d23dc25e3bbb1ffe',
	clientSecret: '5c90db71eeefcc082c0823b2',
	redirectUri: 'http://192.168.0.100:4200/oauth-callback',
	beforeModel({ targetName }) {
		let cookies = this.get('cookies'),
			token = cookies.read('token');

		if (!token && targetName !== 'oauth-callback') {
			let host = 'http://192.168.100.116:31415',
				version = 'v0',
				resource = 'GenerateUserAgent',
				scope = 'MAXBI',
				url = '';

			url = `?response_type=code
                        &client_id=${this.get('clientId')}
                        &client_secret=${this.get('clientSecret')}
                        &scope=${scope}
						&redirect_uri=${this.get('redirectUri')}`.
				replace(/\n/gm, '').
				replace(/ /gm, '').
				replace(/\t/gm, '');
			window.location = [host, version, resource, url].join('/');
		}
	}
});
