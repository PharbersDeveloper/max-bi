import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
	model() {
		let markets = A([]);

		return this.store.query('market', { 'company-id': '5ca069e2eeefcc012918ec73' })
			.then(data => {
				markets = data;
			})
			.then(() => {
				return hash({
					markets,
				})
			})
		// return RSVP.hash({
		// 	markets: this.store.query('market',
		// 		{ 'company-id': '5ca069e2eeefcc012918ec73' }),
		// })
	},
	setupController(controller, model) {
		let markets = model.markets;
		let marketArr = [];
		markets.forEach((item) => {
			let market = {
				id: item.market,
				market: item.market,
			}
			marketArr.push(market)
		})
		// controller.set('ymValue', arrval.firstObject.ym);
		// controller.set('timeArr', arrval);
		// controller.set('marketsArr', markets);
		controller.set('marketArr', marketArr);
		controller.set('marketValue', marketArr.firstObject);
	}
});
