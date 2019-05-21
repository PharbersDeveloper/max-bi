import DS from 'ember-data';

export default DS.Model.extend({
    infoId: DS.attr('string'),
    date: DS.attr('string'),
    dateType: DS.attr('string'),
    addressId: DS.attr('string'),
    addressType: DS.attr('string'),
    goodsId: DS.attr('string'),
    goodsType: DS.attr('string'),
    value: DS.attr('string'),
    valueType: DS.attr('string'),

    city: DS.belongsTo('city'),
    product: DS.belongsTo('product'),
});
