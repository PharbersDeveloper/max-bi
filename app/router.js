import EmberRouter from '@ember/routing/router';
import Route from '@ember/routing/route'
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Route.reopen({
  withLayout: true,
  setupController() {
      this._super(...arguments);
      this.controllerFor('application').set('showNavbar', this.get('withLayout'));
  }
})

Router.map(function() {
  this.route('country-lv-monitor');
  this.route('file', function() {
    this.route('upload');
  });
  this.route('oauth-callback');
});

export default Router;
