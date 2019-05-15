import Route from '@ember/routing/route';
import { A } from '@ember/array'
import RSVP from 'rsvp';

export default Route.extend({
    cardList: A([{
        title: '城市渠道',
        updateTime: 1557908115880,
        timeRangeStart: 1557908115880,
        timeRangeEnd: 1557908115880
    },{
        title: '县域渠道',
        updateTime: 1557908115880,
        timeRangeStart: 1557908115880,
        timeRangeEnd: 1557908115880
    },{
        title: '社区渠道',
        updateTime: 1557908115880,
        timeRangeStart: 1557908115880,
        timeRangeEnd: 1557908115880
    }]),

    model() {
        return RSVP.hash({
            cardList: this.cardList,
        })
    }
});
