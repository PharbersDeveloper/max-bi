import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
	model() {
		let markets = A([]),
			firstMarketName = '',
			provinceProductPerformanceData = A([]),
			provinceCompetitiveLnadscape = A([]);

		return this.store.query('market', { 'company-id': '5ca069e2eeefcc012918ec73' })
			.then(data => {
				markets = data;
				firstMarketName = markets.firstObject.market;

				this.store.query('productaggregation', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': '-SALES', 'take': '10', 'skip': '0', 'ym': '201802', 'ym_type': 'MAT', 'address': '上海市' })

				return this.store.query('marketaggregation', {
					'company_id': '5ca069e2eeefcc012918ec73',
					market: firstMarketName,
					orderby: '-SALES',
					take: '10',
					skip: '0',
					ym: '201802',
					'ym_type': 'MAT',
					'address_type': 'CITY'
				})
			})
			.then(data => {
				// companyId: DS.attr('string'),
				// market: DS.attr('string'),
				// address: DS.attr('string'),
				// addressType: DS.attr('string'),
				// ym: DS.attr('number'),
				// ymType: DS.attr('string'),
				// sales: DS.attr('number'),
				// productCount: DS.attr('number'),
				// salesSom: DS.attr('number'),
				// salesYearGrowth: DS.attr('number'),
				// salesSomYearGrowth: DS.attr('number'),
				// salesEI: DS.attr('number'),
				provinceProductPerformanceData = data.map(ele => {
					let marSize = ele.sales / ele.salesSom;
					return {
						province: ele.address,
						marketSize: marSize,
						markerGrowth: ele.salesYearGrowth,
						productSales: ele.sales,
						productShare: ele.salesSom,
						productSalesChange: ele.salesSomYearGrowth,
						// productGrowth: '*',
						ei: ele.salesEI
					}
				})
				return this.store.query('productaggregation', {
					'company_id': '5ca069e2eeefcc012918ec73',
					market: firstMarketName,
					orderby: 'SALES_RANK',
					'gte[ym]': 201801,
					'lte[ym]': 201812,
					'ym_type': 'MAT',
					address: '北京市',
					'address_type': 'CITY',
					'lte[sales_rank]': 10,
					'current[ym]': 201801
				})
			})
			.then(data => {
				let increaseData = data.sortBy('ym'),
					productList = increaseData.uniqBy('productName');

				provinceCompetitiveLnadscape = productList.map(ele => {
					let currentProductData = increaseData.filterBy('productName', ele.productName).sortBy('ym');
					return {
						name: ele.productName,
						date: currentProductData.map(ele => ele.ym),
						data: currentProductData.map(ele => ele.sales),

					}
				});
			})
			.then(() => {
				return RSVP.hash({
					markets,
					provinceProductPerformanceData,
					provinceCompetitiveLnadscape
				});
			})
	},
	setupController(controller, model) {
		let markets = model.markets,
			marketArr = [];

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
		controller.set('files', model.provinceProductPerformanceData)
		controller.set('provinceLineData', model.provinceCompetitiveLnadscape)

	}
});
