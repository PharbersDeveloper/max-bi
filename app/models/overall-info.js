import DS from 'ember-data';

export default DS.Model.extend({
    marketId: DS.attr('string'),
    updateTime: DS.attr('number'),
    coverStartTime: DS.attr('number'),
    coverEndTime: DS.attr('number'),
    organizationNum: DS.attr('number'),
    adminAreasNum: DS.attr('number'),

});
