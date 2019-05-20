import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
    cur_tab_idx: 0,
    tabs: A(['Overall Market', 'Regional Analysis', 'Province Analysis', 'City Analysis']),
    actions: {
        onTabClicked() {},
    }
});
