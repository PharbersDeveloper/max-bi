import DS from 'ember-data';

export default DS.Model.extend({
    market: DS.attr('string'),
    companyId: DS.attr('string'),
    desc: DS.attr('string'),
});
