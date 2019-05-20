import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | chc-analysis', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:chc-analysis');
    assert.ok(route);
  });
});
