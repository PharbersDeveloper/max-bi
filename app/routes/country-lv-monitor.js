import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            marketdimension: this.store.query('marketdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'ym': '201812'}),
            productdimension: this.store.query('productdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'ym': '201801', 'sales_rank': 1}),
            lineData: this.store.query('marketdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'gte[ym]': '201801', 'lte[ym]': '201812'}),
        })
    }
});
