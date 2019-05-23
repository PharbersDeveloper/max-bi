import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
	model() {
		const store = this.store;

		let markets = A([]),
			firstMarketName = '',
			regionsData = A([]),
			provincesData = A([]),
			citiesData = A([]),
			provinceMapData = A([]),
			provinceMapMaxValue = 0,
			provinceProductPerformanceData = A([]),
			provinceCompetitiveLnadscape = A([]),
			yearMonths = A([]),
			currentYear = new Date().getFullYear(),
			settingEarliestYear = 2017,
			defaultYearMonth = '';

		// 生成时间区间
		for (let i = settingEarliestYear; i < currentYear; i++) {
			for (let j = 1; j <= 12; j++) {
				let month = j < 10 ? `0${j}` : String(j);
				yearMonths.unshift(i + month);
			}
		}
		defaultYearMonth = yearMonths.firstObject;

		return store.query('market', {
			'company-id': '5ca069e2eeefcc012918ec73'
		})
			.then(data => {
				markets = data;
				firstMarketName = markets.firstObject.market;
				return store.findAll('region');
			})
			.then(data => {
				regionsData = data;

				return store.findAll('province');
			})
			.then(data => {
				provincesData = data;

				return store.findAll('city');
			})
			.then(data => {
				citiesData = data;

				return this.store.query('marketaggregation', {
					'company_id': '5ca069e2eeefcc012918ec73',
					market: firstMarketName,
					orderby: '-SALES',
					ym: yearMonths.firstObject,
					'ym_type': 'YTD',
					'address_type': 'PROVINCE'
				})
			})
			.then(data => {
				provinceMapData = data.map(ele => {
					return {
						name: ele.address,
						value: ele.sales,
						productCount: ele.productCount,
						salesSom: ele.salesSom,
						salesYearGrowth: ele.salesYearGrowth,
						salesEi: ele.salesEi,
						salesSomYearGrowth: ele.salesSomYearGrowth,
					}
				});
				provinceMapMaxValue = Math.ceil(provinceMapData.sortBy('value').lastObject.value);

				provinceMapData.push({ name: '台湾', value: 0 });
				provinceMapData.push({ name: '香港', value: 0 });
				provinceMapData.push({ name: '澳门', value: 0 });

				console.log(provinceMapData);
				console.log(provinceMapMaxValue);

				return this.store.query('marketaggregation', {
					'company_id': '5ca069e2eeefcc012918ec73',
					market: firstMarketName,
					orderby: '-SALES',
					take: '10',
					skip: '0',
					ym: yearMonths.firstObject,
					'ym_type': 'YTD',
					'address_type': 'PROVINCE'
				})
			})
			.then(data => {
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
					'gte[ym]': '201801',
					'lte[ym]': '201812',
					'ym_type': 'YTD',
					address: provincesData.firstObject.title,
					'address_type': 'PROVINCE',
					'lte[sales_rank]': 10,
					'current[ym]': yearMonths.firstObject
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
					yearMonths,
					defaultYearMonth,
					markets,
					regionsData,
					provincesData,
					citiesData,
					provinceMapData,
					provinceMapMaxValue,
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
		});
		// 设置 市场选择 datum / 默认市场
		controller.set('marketArr', marketArr);
		controller.set('marketValue', marketArr.firstObject);
		// 设置 区域选择 datum / 默认区域
		controller.set('regionsData', model.regionsData);
		controller.set('defaultRegion', model.regionsData.firstObject);
		// 设置 省份选择 datum / 默认省份
		controller.set('provincesData', model.provincesData);
		controller.set('defaultProvince', model.provincesData.firstObject);
		// 设置 城市选择 datum / 默认城市
		controller.set('citiesData', model.citiesData);
		controller.set('defaultCity', model.citiesData.firstObject);
		// 设置 日期选择 datum / 默认日期 / 默认时间区间模式 
		controller.set('timeArr', model.yearMonths);
		controller.set('defaultYearMonth', model.defaultYearMonth);
		controller.set('buttonGroupValue', 1);
		// 设置 province 的 地图 / 表格 / 折线图
		controller.set('provinceMapData', model.provinceMapData);
		controller.set('provinceMapMaxValue', model.provinceMapMaxValue);

		controller.set('provinceProductPerformanceData', model.provinceProductPerformanceData)
		controller.set('provinceLineData', model.provinceCompetitiveLnadscape)

	}
});
