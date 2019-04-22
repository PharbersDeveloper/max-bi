import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	oauth_service: service(),
	withLayout: false,

	beforeModel() {
		// this.oauth_service.oauthOperation()
	},

	model() {
		return this.oauth_service.oauthOperation()
	}
});
