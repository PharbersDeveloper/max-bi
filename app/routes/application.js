import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
	cookies: service(),
	oauth_service: service(),

	beforeModel({ targetName }) {
		window.console.log(targetName);
		if(targetName === 'oauth-callback') {
			return;
		}
		
		if(this.oauth_service.judgeAuth()) {
			window.console.log("have auth");
		} else {
			window.console.log("no auth");
			this.transitionTo('index');
		}
	}
	
});
