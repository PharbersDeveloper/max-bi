import DS from 'ember-data';

export default DS.Model.extend({
    companyId: DS.attr('string'),
    market: DS.attr('string'),
    ym: DS.attr('number'),
    sales: DS.attr('number'),
    // units: DS.attr('number'),
    productCount: DS.attr('number'),
    // productCountring: DS.attr('number'),
    // salesSomring: DS.attr('number'),
    salesSom: DS.attr('number'),
    productCountRingGrowth: DS.attr('number'),
    // productCountYearOnYear: DS.attr('number'),
    productCountYearGrowth: DS.attr('number'),
    // salesSomyearOnYear: DS.attr('number'),
    salesSomYearGrowth: DS.attr('number'),
    salesSomRingGrowth: DS.attr('number'),
    // provinceCount: DS.attr('number'),
    // cityCount: DS.attr('number')

    concentratedSales: DS.attr('number'),
    concentratedSom: DS.attr('number'),
    concentratedRingGrowth: DS.attr('number'),
    concentratedYearGrowth: DS.attr('number'),
});
