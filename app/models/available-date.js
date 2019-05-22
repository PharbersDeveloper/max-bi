import DS from 'ember-data';

export default DS.Model.extend({
    infoId: DS.attr('string'),
    dateType: DS.attr('number'),
    date: DS.attr('string'),
});
