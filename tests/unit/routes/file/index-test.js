import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | file/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:file/index');
    assert.ok(route);
  });
});
