import DS from 'ember-data';

export default DS.Model.extend({
    updateTime: DS.attr('string'),
    coverStartTime: DS.attr('string'),
    coverEndTime: DS.attr('number'),
    companyId: DS.attr('number'),
    market: DS.attr('number'),
    hospCount: DS.attr('number'),
    regionCount: DS.attr('number')
});
