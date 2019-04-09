import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('country-lv-monitor');
  this.route('file', function() {
    this.route('upload');
  });
  this.route('oauth-callback');
});

export default Router;
