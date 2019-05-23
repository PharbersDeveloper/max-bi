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
				})
			})
			.then(data => {
				provinceCompetitiveLnadscape = A([{
					name: 'MNC',
					date: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05',
						'2018-06', '2018-07', '2018-08',
						'2018-09', '2018-10', '2018-11', '2018-12'],
					data: [320, 332, 301, 334, 390, 330, 320, 255, 350, 337, 365, 912]
				},
				{
					name: 'ELILILLY GROUP',
					date: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05',
						'2018-06', '2018-07', '2018-08',
						'2018-09', '2018-10', '2018-11', '2018-12'],
					data: [820, 932, 901, 934, 1290, 1330, 1320, 244, 365, 109, 203, 273]
				}]);

				let arr = [],
					map = {},
					dest = [],
					proName = '',
					dataArr = [],
					dateArr = [],
					arritem = [];
				let increaseData = data.sortBy('ym'),
					productList = increaseData.uniqBy('productName'),
					ymList = increaseData.uniqBy('ym');

				console.log(increaseData);
				console.log(productList);
				console.log(productList.map(ele => ele.productName));
				console.log(ymList.map(ele => ele.ym));
				console.log(increaseData.map(ele => ele.ym));
				console.log(increaseData.map(ele => ele.productName).filter(ele => ele === '泰道'));

				// data.forEach(item => {
				// 	arr.push(item);
				// })
				//将大数组根据某项值分成若干小数组
				// for (let i = 0, len = arr.length; i < len; i++) {
				// 	var ai = arr[i];
				// 	if (!map[ai.productName]) {
				// 		dest.push({
				// 			productName: ai.productName,
				// 			item: [ai]
				// 		});
				// 		map[ai.productName] = ai;
				// 	} else {
				// 		for (let j = 0; j < dest.length; j++) {
				// 			var dj = dest[j];
				// 			if (dj.productName == ai.productName) {
				// 				dj.item.push(ai);
				// 				break;
				// 			}
				// 		}
				// 	}
				// }

				// for (let i = 0; i < dest.length; i++) {
				// 	dest[i].item.forEach(list => {
				// 		proName = list.productName
				// 		dateArr.push(list.ym)
				// 		dataArr.push(list.sales)
				// 	})
				// 	arritem[i] = {
				// 		name: proName,
				// 		date: dateArr,
				// 		data: dataArr
				// 	}
				// 	dateArr = [];
				// 	dataArr = [];
				// }
				this.set('lineData', arritem)
			})
			.then(() => {
				return RSVP.hash({
					markets,
					provinceProductPerformanceData,
					provinceCompetitiveLnadscape
				});
			})
		// return RSVP.hash({
		// 	markets: this.store.query('market',
		// 		{ 'company-id': '5ca069e2eeefcc012918ec73' }),
		// })
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
