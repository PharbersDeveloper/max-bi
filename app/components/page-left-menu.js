import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
    init() {
		this._super(...arguments);
		this.set('rmbChoosedValue', 'RMB');
        this.set('millionChoosedValue', 'Million');
	},
    keyName: A([
        { id: 1, name: '将进酒' },
        { id: 2, name: '桃花源记' },
        { id: 3, name: '滕王阁序' },
        { id: 4, name: '林尽水源' },
    ]),
    timeArr:  A([
        { id: 201812, name: '201812' },
        { id: 201811, name: '201811' },
        { id: 201810, name: '201810' },
        { id: 201809, name: '201809' },
        { id: 201808, name: '201812' },
        { id: 201807, name: '201811' },
        { id: 201806, name: '201810' },
        { id: 201805, name: '201809' },
        { id: 201804, name: '201812' },
        { id: 201803, name: '201811' },
        { id: 201802, name: '201810' },
        { id: 201801, name: '201809' },
        { id: 201712, name: '201812' },
        { id: 201711, name: '201811' },
        { id: 201710, name: '201810' },
        { id: 201709, name: '201809' },
        { id: 201708, name: '201812' },
        { id: 201707, name: '201811' },
        { id: 201706, name: '201810' },
        { id: 201705, name: '201809' },
        { id: 201704, name: '201812' },
        { id: 201703, name: '201811' },
        { id: 201702, name: '201810' },
        { id: 201701, name: '201809' },
    ]),
    rmb: A([
        { id: 'RMB', name: 'RMB' },
    ]),
    million: A([
        { id: 'Million', name: 'Million' },
    ]),
});
