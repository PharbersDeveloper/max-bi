import DS from 'ember-data';

export default DS.Model.extend({
    productName: DS.attr('string'),
    corpName: DS.attr('string'),
    minProduct: DS.attr('string'),
    companyId: DS.attr('string'),
    market: DS.attr('string'),
    ym: DS.attr('number'),
    ymType: DS.attr('string'),
    address: DS.attr('string'),
    addressType: DS.attr('string'),
    sales: DS.attr('number'),
    salesSom: DS.attr('number'),
    salesRank: DS.attr('number'),
    salesYearGrowth: DS.attr('number'),
    salesSomYearGrowth: DS.attr('number'),
    salesEI: DS.attr('number'),
    tier: DS.attr('string')
});
