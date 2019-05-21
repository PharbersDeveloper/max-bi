import DS from 'ember-data';
import { computed } from '@ember/object';
import { camelize } from '@ember/string';
import { pluralize } from 'ember-inflector';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend({
    namespace: 'v2',
    cookies: service(),
    
    pathForType(type) {
        let newType = pluralize(camelize(type));
        return newType;
    },

	headers: computed(function() {
        return {
            'Authorization': this.cookies.read("token_type") + ' ' + this.cookies.read("token")
        };
    }),
});
