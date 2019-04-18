import DS from 'ember-data';

export default DS.Model.extend({
    companyId: DS.attr('string'),
    market: DS.attr('string'),
    ym: DS.attr('number'),
    sales: DS.attr('number'),
    units: DS.attr('number'),
    provinceCount: DS.attr('number'),
    cityCount: DS.attr('number'),
    productCount: DS.attr('number'),
    minProduct: DS.attr('string'),
    salesSom: DS.attr('number'),
    salesRank: DS.attr('number'),
    salesYearGrowth: DS.attr('number'),
    salesRingGrowth: DS.attr('number'),
    salesRingGrowthRank: DS.attr('number'),
    salesYearOnYear: DS.attr('number')
});
