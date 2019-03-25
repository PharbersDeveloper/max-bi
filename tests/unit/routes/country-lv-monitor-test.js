import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | country-lv-monitor', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:country-lv-monitor');
    assert.ok(route);
  });
});
