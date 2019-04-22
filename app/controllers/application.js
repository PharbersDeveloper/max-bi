import Controller from '@ember/controller';
import { inject as service } from '@ember/service'

export default Controller.extend({
    oauth_service: service(),

    actions: {
        exitSystem() {
            this.oauth_service.removeAuth()
            this.transitionToRoute('index')
        }
    }
});
