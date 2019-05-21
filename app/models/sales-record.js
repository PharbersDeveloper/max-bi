import DS from 'ember-data';

export default DS.Model.extend({
    infoId: DS.attr('string'),
    date: DS.attr('string'),
    dateType: DS.attr('string'),
    addressId: DS.attr('string'),
    addressType: DS.attr('number'),
    goodsId: DS.attr('string'),
    goodsType: DS.attr('number'),
    value: DS.attr('number'),
    valueType: DS.attr('number'),

    city: DS.belongsTo('city'),
    product: DS.belongsTo('product'),
});
