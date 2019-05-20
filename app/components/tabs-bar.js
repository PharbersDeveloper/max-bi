import Component from '@ember/component';
import { A } from '@ember/array';
export default Component.extend({
    positionalParams: ['cur_idx', 'titles', 'needAction'],
    needAction: false,
    cur_idx: 0,
    titles: A([]),
    actions: {
        itemClicked(idx) {
            this.set('cur_idx', idx);
            if (this.needAction) {
                this.onTabClicked(idx);
            }
        }
    },
});
