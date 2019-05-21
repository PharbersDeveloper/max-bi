import DS from 'ember-data';

export default DS.Model.extend({
    infoId: DS.attr('string'),
    cityId: DS.attr('string'),
    
    privateHospitalNum: DS.attr('number'),
    universeNum: DS.attr('number'),
    sampleNum: DS.attr('number'),
    coverageRatio: DS.attr(),

    city: DS.belongsTo('city'),
});
