import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | choose-channel', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:choose-channel');
    assert.ok(route);
  });
});
