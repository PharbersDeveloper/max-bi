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
        { id: 201808, name: '201808' },
        { id: 201807, name: '201807' },
        { id: 201806, name: '201806' },
        { id: 201805, name: '201805' },
        { id: 201804, name: '201804' },
        { id: 201803, name: '201803' },
        { id: 201802, name: '201802' },
        { id: 201801, name: '201801' },
        { id: 201712, name: '201712' },
        { id: 201711, name: '201711' },
        { id: 201710, name: '201710' },
        { id: 201709, name: '201709' },
        { id: 201708, name: '201708' },
        { id: 201707, name: '201707' },
        { id: 201706, name: '201706' },
        { id: 201705, name: '201705' },
        { id: 201704, name: '201704' },
        { id: 201703, name: '201703' },
        { id: 201702, name: '201702' },
        { id: 201701, name: '201701' },
    ]),
    rmb: A([
        { id: 'RMB', name: 'RMB' },
    ]),
    million: A([
        { id: 'Million', name: 'Million' },
    ]),

    actions: {
        ytdOnClick() {
            if(this.dateType == 4) {
                this.set('dateType', 2)
            } else {
                this.set('dateType', 4)
            }
            window.console.log(this.dateType);
            
        },
    }
});
