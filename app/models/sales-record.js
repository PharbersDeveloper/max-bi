import DS from 'ember-data';

export default DS.Model.extend({
    infoId: DS.attr('string'),
    date: DS.attr('string'),
    dateType: DS.attr('string'), //1 => Month; 2 => Quarter; 3 => Year; 4 => YTD; 5 => MAT;
    addressId: DS.attr('string'),
    addressType: DS.attr('number'), //0 => Total; 1 => City; 2 => Province; 3 => Region;
    goodsId: DS.attr('string'),
    goodsType: DS.attr('number'), //0 => Total; 1 => Product; 2 => Mole; 3 => Market;
    value: DS.attr('number'),
    valueType: DS.attr('number'), //1 => Sales; 2 => Growth; 3 => Mkt_share; 4 => Mkt_Share_Growth; 5 => Mkt_EI; 6 => Mole_Share; 7 => Mole_Share_Growth; 8 => Mole_EI;

    city: DS.belongsTo('city'),
    product: DS.belongsTo('product'),
});
