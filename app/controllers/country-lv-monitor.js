import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({

    marketArr: A([{name: 'INF'}]),
    timeArr: A([{name: '2017/04'}]),
    cur_market: '',
    cur_time: '',

});
