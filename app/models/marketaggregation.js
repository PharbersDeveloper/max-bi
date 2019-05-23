import DS from 'ember-data';

export default DS.Model.extend({
    companyId: DS.attr('string'),
    market: DS.attr('string'),
    address: DS.attr('string'),
    addressType: DS.attr('string'),
    ym: DS.attr('number'),
    ymType: DS.attr('string'),
    sales: DS.attr('number'),
    productCount: DS.attr('number'),
    salesSom: DS.attr('number'),
    salesYearGrowth: DS.attr('number'),
    salesSomYearGrowth: DS.attr('number'),
    salesEI: DS.attr('number'),
    tier: DS.attr('string')
});
