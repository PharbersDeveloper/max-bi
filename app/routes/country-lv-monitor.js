import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            markets: this.store.query('marketdimension', {'orderby': '-YM'}),
            // marketdimension: this.store.query('marketdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'ym': '201812'}),
            // productdimension: this.store.query('productdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'ym': '201801', 'sales_rank': 1}),
            // lineData: this.store.query('marketdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'gte[ym]': '201801', 'lte[ym]': '201812'}),
        })
    },
    setupController(controller,model){
        let markets = model.markets;
        let uniqMarkets = markets.uniqBy('market')
		let arrval = markets.filter(item => {
			return item.market === uniqMarkets.firstObject.market;
		})
        controller.set('ymValue', arrval.firstObject.ym);
        controller.set('timeArr', arrval);
        controller.set('marketsArr', markets);
        controller.set('marketArr', uniqMarkets);
        controller.set('marketValue',uniqMarkets.firstObject);
    }
});
