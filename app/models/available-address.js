import DS from 'ember-data';

export default DS.Model.extend({
    infoId: DS.attr('string'),
    addressType: DS.attr('number'),
    addressId: DS.attr('string'),

    city: DS.belongsTo('city'),
});
