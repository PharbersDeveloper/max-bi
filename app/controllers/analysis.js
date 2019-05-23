import Controller from '@ember/controller';
import { A } from '@ember/array';
import { observer } from '@ember/object';
// import { computed } from '@ember/object';
// import { alias } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
	cur_tab_idx: 0,
	tabs: A(['Overall Market', 'Regional Analysis', 'Province Analysis', 'City Analysis']),
	collapsed: false,
	rmb: A([
		{ id: 'RMB', name: 'RMB' },
	]),
	million: A([
		{ id: 'Million', name: 'Million' },
	]),
	actions: {
		onTabClicked() { },
		ytdOnClick() {
			if (this.dateType == 4) {
				this.set('dateType', 2)
			} else {
				this.set('dateType', 4)
			}
		},
		toggle() {
			if (this.collapsed) {
				this.set('collapsed', false)
			} else {
				this.set('collapsed', true)
			}
		}
	},
	init() {
		this._super(...arguments);
		this.set('linelegendPosition', { right: '0', 'top': '60', type: 'scoll', orient: 'vertical' });
		this.set('grid', { right: '200px', });
		this.set('rmbChoosedValue', 'RMB');
		this.set('millionChoosedValue', 'Million');

		this.set('overallCompetitiveLnadscape', A([{
			name: '',
			date: [],
			data: []
		},]));
		this.set('chartColor', A(['rgb(115,171,255)', 'rgb(121,226,242)', 'rgb(121,242,192)', 'rgb(54,179,126)', 'rgb(255,227,128)', 'rgb(255,171,0)', 'rgb(192,182,242)', 'rgb(101,84,192)', 'rgb(255,189,173)', 'rgb(255,143,115)', 'rgb(35,85,169)',]));
		this.set('baseNumber', 250)
		this.set('citybaseNumber', 100)

	},
	allData: observer('marketValue', 'defaultYearMonth', 'defaultRegion', 'defaultProvince', 'defaultCity', 'overallInfo', function () {
		if (isEmpty(this.marketValue) || isEmpty(this.defaultYearMonth) || isEmpty(this.defaultRegion) || isEmpty(this.defaultProvince) || isEmpty(this.defaultCity)) {
			return;
		}
		this.store.queryRecord('overview', {
			'company_id': '5ca069e2eeefcc012918ec73',
			'market': this.marketValue.market,
		}).then(res =>{
			this.set('overallInfo', res);
		})
		//City Analysis数据
		this.store.query('productaggregation', { 
			'company_id': '5ca069e2eeefcc012918ec73', 
			'market': this.marketValue.market, 
			'orderby': '-SALES', 
			'take': '10', 
			'skip': '0', 
			'ym': this.defaultYearMonth, 
			'ym_type': 'YTD', 
			'address': this.defaultCity.title, 
			'address_type': 'CITY' })
			.then(res => {
				let proArr = [];
				let shareArr = [];
				res.forEach(item => {
					//表格1
					let proItem = {
						brand: item.productName,
						sales: item.sales,
						marketShare: item.salesSom,
						ms: item.salesSomYearGrowth,
						growth: item.salesYearGrowth,
						ei: item.salesEI
					}
					proArr.push(proItem);
					this.set('proByCity', proArr)
				})
				let totalPro = res.reduce((total, ele) => {
					return {
						totalSales: Number(total.totalSales) + Number(ele.sales),
						totalMarketShare: Number(total.totalMarketShare) + Number(ele.salesSom),
						totalMs: total.totalMs + ele.salesSomYearGrowth,
						totalGrowth: total.totalGrowth + ele.salesYearGrowth,
						totalEi: total.totalEi + ele.salesEI
					}
				}, { totalSales: 0, totalMarketShare: 0, totalMs: 0, totalGrowth: 0, totalEi: 0 });
				this.set('totalProObj', totalPro)
				//气泡图
				let salesSortData = res.sortBy('sales');
				this.set('citybaseNumber', 50)
				salesSortData.map(item =>{
					let arr = [];
					let shareItem = [item.salesSom, item.salesYearGrowth, item.sales, item.productName];
					arr.push(shareItem);
					shareArr.push(arr);
					arr = [];
					this.set('scatterData', shareArr);
				})
				
				//表格2
				
				this.store.query('marketaggregation', { 
					'company_id': '5ca069e2eeefcc012918ec73', 
					'market': this.marketValue.market, 
					'orderby': '-SALES', 
					'take': '10', 
					'skip': '0', 
					'ym': this.defaultYearMonth, 
					'ym_type': 'YTD', 
					'address_type': 'CITY'})
					.then(res => {
						let cityArr = [];
						res.forEach(item => {
							let marSize = item.sales / item.salesSom;
							let cityItem = {
								city: item.address,
								// reliable: item.sales,
								tier: item.tier,
								size: marSize,
								mGrowth: item.salesYearGrowth,
								Psales: item.sales,
								share: item.salesSom,
								Pchange: item.salesSomYearGrowth,
								// pGrowth: item,
								ei: item.salesEI,
							}
							cityArr.push(cityItem);
							this.set('cityPer', cityArr)
						})
					})
				//多条折线图
				this.store.query('productaggregation', {
					'company_id': '5ca069e2eeefcc012918ec73',
					'market': this.marketValue.market,
					'gte[ym]': this.defaultYearMonth.slice(0,4) + '01',
					'lte[ym]': this.defaultYearMonth,
					'orderby': 'SALES_RANK',
					'ym_type': 'YTD',
					'address': this.defaultCity.title,
					'address_type': 'CITY',
					'current[ym]': this.defaultYearMonth,
					'lte[sales_rank]': '10'
				})
					.then(res => {
						let arr = [], map = {}, dest = [], proName = '', dataArr = [], dateArr = [], arritem = [];
						res.forEach(item => {
							arr.push(item);
						})
						//将大数组根据某项值分成若干小数组
						for (let i = 0; i < arr.length; i++) {
							var ai = arr[i];
							if (!map[ai.productName]) {
								dest.push({
									productName: ai.productName,
									item: [ai]
								});
								map[ai.productName] = ai;
							} else {
								for (let j = 0; j < dest.length; j++) {
									var dj = dest[j];
									if (dj.productName == ai.productName) {
										dj.item.push(ai);
										break;
									}
								}
							}
						}

						for (let i = 0; i < dest.length; i++) {
							dest[i].item.forEach(list => {
								proName = list.productName
								dateArr.push(list.ym)
								dataArr.push(list.sales)
							})
							arritem[i] = {
								name: proName,
								date: dateArr,
								data: dataArr
							}
							dateArr = [];
							dataArr = [];
						}
						this.set('lineData', arritem)
					})
			})

		//Regional Analysis数据
		this.store.query('productaggregation', { 
			'company_id': '5ca069e2eeefcc012918ec73', 
			'market': this.marketValue.market, 
			'orderby': '-SALES', 
			'take': '10', 
			'skip': '10', 
			'ym': this.defaultYearMonth, 
			'ym_type': 'YTD', 
			'address_type': 'REGION',})
			.then(data => {
				//堆叠柱状图
				let increastData = data.sortBy('ym'),
					cities = data.uniqBy('address').sortBy('address'),
					productList = increastData.uniqBy('productName'),
					result = A([]),
					otherData = A([]);
				// productList.push({productName: 'others'})

				result = productList.map(ele => {
					let currentProductList = increastData.filterBy('productName', ele.productName);
					let productSalesSomValues = cities.map(item => {
						let tmpSalesSom = 0;
						currentProductList.forEach(i => {
							if (item.address === i.address) {
								tmpSalesSom = i.salesSom;
							}
						})
						return tmpSalesSom;
					})
					return {
						name: ele.productName, data: productSalesSomValues
					}
				});

				let testData = [...result.map(ele => ele.data)],
					totalTestData = testData.flat();

				for (let j = 0, citiesLen = cities.length; j < citiesLen; j++) {
					let len = productList.length,
						tmpRest = 0;

					for (let i = 0; i < len; i++) {
						tmpRest = tmpRest + totalTestData[citiesLen * i + j]
					}
					otherData.push(1 - tmpRest);
				}

				result.push({ name: 'others', data: otherData })

				this.set('stackXdata', cities.map(ele => ele.address));
				this.set('stackData', result);
			})
		//region表格
		this.store.query('productaggregation', {
			'company_id': '5ca069e2eeefcc012918ec73',
			'market': this.marketValue.market,
			'orderby': '-SALES',
			'take': '10',
			'skip': '0',
			'ym': this.defaultYearMonth,
			'ym_type': 'YTD',
			'address_type': 'REGION'
		})
			.then(data => {
				let regionTableData = A([]);
				regionTableData = data.map(ele => {
					return {
						brand: ele.productName,
						sales: ele.sales,
						marketShare: ele.salesSom,
						ms: ele.salesSomYearGrowth,
						growth: ele.salesYearGrowth,
						ei: ele.salesEI
					}
				})
				this.set('regionTableData', regionTableData);
				//总计
				let regionTotalPro = data.reduce((total, ele) => {
					return {
						totalSales: Number(total.totalSales) + Number(ele.sales),
						totalMarketShare: Number(total.totalMarketShare) + Number(ele.salesSom),
						totalMs: total.totalMs + ele.salesSomYearGrowth,
						totalGrowth: total.totalGrowth + ele.salesYearGrowth,
						totalEi: total.totalEi + ele.salesEI
					}
				}, { totalSales: 0, totalMarketShare: 0, totalMs: 0, totalGrowth: 0, totalEi: 0 });
				this.set('regionTotalPro', regionTotalPro)
			});
		//region多折线图
		this.store.query('productaggregation', {
			'company_id': '5ca069e2eeefcc012918ec73',
			'market': this.marketValue.market,
			'orderby': 'SALES_RANK',
			'current[ym]': this.defaultYearMonth,
			'gte[ym]': this.defaultYearMonth.slice(0,4) + '01',
			'lte[ym]': this.defaultYearMonth,
			'ym_type': 'YTD',
			'address_type': 'REGION',
			'address': this.defaultRegion.title,
			'lte[sales_rank]': '10'
		})
			.then(data => {
				let increaseData = data.sortBy('ym'),
					productList = increaseData.uniqBy('productName'),
					regionCompetitiveLnadscape = A([]);

				regionCompetitiveLnadscape = productList.map(ele => {
					let currentProductData = increaseData.filterBy('productName', ele.productName).sortBy('ym');
					return {
						name: ele.productName,
						date: currentProductData.map(ele => ele.ym),
						data: currentProductData.map(ele => ele.sales),
					}
				});
				this.set('regionCompetitiveLnadscape', regionCompetitiveLnadscape);
			})
		//overall两个卡片数据
		this.store.query('productaggregation', {
			'company_id': '5ca069e2eeefcc012918ec73',
			'market': this.marketValue.market,
			'orderby': 'SALES_RANK',
			'take': '1',
			'skip': '0',
			'ym': this.defaultYearMonth,
			'ym_type': 'YTD',
			'address_type': 'NATIONAL'
		})
			.then(data => {
				let marketSize = data.firstObject.sales;
				let marketGrowth = data.firstObject.salesYearGrowth;
				this.set('marketSize', marketSize);
				this.set('marketGrowth', marketGrowth);
			})
		//overall三个卡片数据
		// this.store.query('productaggregation', { 
		// 	'company_id': '5ca069e2eeefcc012918ec73', 
		// 	'market': 'ONC_other', 
		// 	'orderby': '-SALES', 
		// 	'take': '3',
		// 	'skip': '0',
		// 	'ym': '201802', 
		// 	'ym_type': 'YTD',
		// 	'address_type': 'NATIONAL' })
		// 	.then(data => {
		// 		let increaseData = data.sortBy('ym');
		// 		increaseData.map(ele => {
		// 			return {
		// 				title: ele.productName,
		// 				value: ele.salesSomYearGrowth,

		// 			}
		// 		})
		// 		console.log(increaseData)
		// 		this.set('increaseData', increaseData);
		// 	})

		//overall表格
		this.store.query('productaggregation', {
			'company_id': '5ca069e2eeefcc012918ec73',
			'market': this.marketValue.market,
			'orderby': '-SALES',
			'take': '10',
			'skip': '0',
			'ym': this.defaultYearMonth,
			'ym_type': 'YTD',
			'address_type': 'NATIONAL'
		})
			.then(data => {
				let overallTableData = A([]);
				overallTableData = data.map(ele => {
					return {
						brand: ele.productName,
						sales: ele.sales,
						marketShare: ele.salesSom,
						ms: ele.salesSomYearGrowth,
						growth: ele.salesYearGrowth,
						ei: ele.salesEI
					}
				})
				this.set('overallTableData', overallTableData);
				//总计
				let overallTotalPro = data.reduce((total, ele) => {
					return {
						totalSales: Number(total.totalSales) + Number(ele.sales),
						totalMarketShare: Number(total.totalMarketShare) + Number(ele.salesSom),
						totalMs: total.totalMs + ele.salesSomYearGrowth,
						totalGrowth: total.totalGrowth + ele.salesYearGrowth,
						totalEi: total.totalEi + ele.salesEI
					}
				}, { totalSales: 0, totalMarketShare: 0, totalMs: 0, totalGrowth: 0, totalEi: 0 });
				this.set('overallTotalPro', overallTotalPro)
			});
		//overall多折线图
		this.store.query('productaggregation', {
			'company_id': '5ca069e2eeefcc012918ec73',
			'market': this.marketValue.market,
			'orderby': 'SALES_RANK',
			'current[ym]': this.defaultYearMonth,
			'gte[ym]': this.defaultYearMonth.slice(0,4) + '01',
			'lte[ym]': this.defaultYearMonth,
			'ym_type': 'YTD',
			'address_type': 'NATIONAL',
			'lte[sales_rank]': '10'
		})
			.then(data => {
				let increaseData = data.sortBy('ym'),
					productList = increaseData.uniqBy('productName'),
					overallCompetitiveLnadscape = A([]);

				overallCompetitiveLnadscape = productList.map(ele => {
					let currentProductData = increaseData.filterBy('productName', ele.productName).sortBy('ym');
					return {
						name: ele.productName,
						date: currentProductData.map(ele => ele.ym),
						data: currentProductData.map(ele => ele.sales),
					}
				});
				this.set('overallCompetitiveLnadscape', overallCompetitiveLnadscape);
			})
	}),
	provinceData: observer('marketValue.market', 'defaultYearMonth', 'defaultProvince.id', function () {
		const store = this.store;

		let market = this.marketValue.market,
			ym = this.defaultYearMonth,
			provinceRecord = this.defaultProvince,
			address = '',
			provinceMapData = A([]),
			provinceMapMaxValue = 0,
			provinceProductPerformanceData = A([]),
			provinceCompetitiveLnadscape = A([]);

		if (isEmpty(market) || isEmpty(provinceRecord) || isEmpty(ym)) {
			this.setProperties({
				provinceMapData,
				provinceMapMaxValue,
				provinceProductPerformanceData,
				provinceCompetitiveLnadscape
			})
			return null;
		}

		address = provinceRecord.get('title')
		return store.query('marketaggregation', {
			'company_id': '5ca069e2eeefcc012918ec73',
			market,
			orderby: '-SALES',
			ym,
			'ym_type': 'YTD',
			'address_type': 'PROVINCE'
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

				return this.store.query('marketaggregation', {
					'company_id': '5ca069e2eeefcc012918ec73',
					market: this.defaultMarket,
					orderby: '-SALES',
					take: '10',
					skip: '0',
					ym,
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
					market,
					orderby: 'SALES_RANK',
					'gte[ym]': ym.slice(0,4) + '01',
					'lte[ym]': ym,
					'ym_type': 'YTD',
					address,
					'address_type': 'PROVINCE',
					'lte[sales_rank]': 10,
					'current[ym]': ym
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
				this.setProperties({
					provinceMapData,
					provinceMapMaxValue,
					provinceProductPerformanceData,
					provinceCompetitiveLnadscape
				})
				// return {
				// 	provinceMapData,
				// 	provinceMapMaxValue,
				// 	provinceProductPerformanceData,
				// 	provinceCompetitiveLnadscape
				// };
			})
	}),

});
