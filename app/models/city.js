import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    cityTier: DS.attr('string'),
    reliable: DS.attr('string'),
});
