import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    corpName: DS.attr('string'),
    MoleName: DS.attr('string'),
    packageNumber: DS.attr('string'),
    packageDes: DS.attr('string'),
    DosageName: DS.attr('string'),
    deliveryWay: DS.attr('string'),
});
