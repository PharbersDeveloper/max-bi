import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
	oauth_service: service(),
	withLayout: false,

	beforeModel() {
		// this.oauth_service.oauthOperation()
	},

	model() {
		return RSVP.hash({
			page: this.oauth_service.oauthOperation()
        })
	}
});
