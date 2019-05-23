import Controller from '@ember/controller';
import { A } from '@ember/array';
import { observer } from '@ember/object';

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
			window.console.log(this.dateType);
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
		this.set('timeArr', A([
			{ id: 201812, name: '201812' },
			{ id: 201811, name: '201811' },
			{ id: 201810, name: '201810' },
			{ id: 201809, name: '201809' },
			{ id: 201808, name: '201808' },
			{ id: 201807, name: '201807' },
			{ id: 201806, name: '201806' },
			{ id: 201805, name: '201805' },
			{ id: 201804, name: '201804' },
			{ id: 201803, name: '201803' },
			{ id: 201802, name: '201802' },
			{ id: 201801, name: '201801' },
			{ id: 201712, name: '201712' },
			{ id: 201711, name: '201711' },
			{ id: 201710, name: '201710' },
			{ id: 201709, name: '201709' },
			{ id: 201708, name: '201708' },
			{ id: 201707, name: '201707' },
			{ id: 201706, name: '201706' },
			{ id: 201705, name: '201705' },
			{ id: 201704, name: '201704' },
			{ id: 201703, name: '201703' },
			{ id: 201702, name: '201702' },
			{ id: 201701, name: '201701' },
		]),)
		this.set('overallCompetitiveLnadscape', A([{
			name: '',
			date: [],
			data: []
		},]));
		// this.set('lineColor',  A(['rgb(115,171,255)', 'rgb(255,227,128)', 'rgb(73,229,245)','rgb(52,246,188)', 'rgb(54,179,126)']));
		// this.set('legendPosition', { x: 'center', y: 'center', });
		this.set('scatterData', A([
			[[66666, 57, 100000, '']],
			[[12225, 81, 100000, '']],
			[[55555, 57, 100000, '']],
			[[33333, 45, 100000, '']],
			[[22222, 57, 255555, '']]
		]));
		this.set('stackData', A([
			{ name: '111', data: [5, 20, 36, 10, 10, 20] },
			{ name: '222', data: [40, 22, 18, 35, 42, 40] },
			{ name: '333', data: [40, 22, 18, 35, 42, 40] },
		]));
		this.set('chartColor', A(['rgb(115,171,255)', 'rgb(121,226,242)', 'rgb(121,242,192)', 'rgb(54,179,126)', 'rgb(255,227,128)', 'rgb(255,171,0)', 'rgb(192,182,242)', 'rgb(101,84,192)', 'rgb(255,189,173)', 'rgb(255,143,115)', 'rgb(35,85,169)',]));
		this.set('baseNumber', 250)
		this.set('citybaseNumber', 100)
		
		this.set('doubleData', A([{
			name: '蒸发量',
			type: 'bar',
			yAxisIndex: 1,
			data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7]
		},
		{
			name: '降水量',
			type: 'bar',
			yAxisIndex: 1,
			data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7]
		},
		{
			name: '平均温度',
			type: 'line',
			data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2]
		}]));
		
	},
	allData: observer('marketValue', function () {
		//City Analysis数据
		this.store.query('productaggregation', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': '-SALES', 'take': '10', 'skip': '0', 'ym': '201802', 'ym_type': 'YTD', 'address': '上海市', 'address_type': 'CITY' })
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

					//气泡图
					let arr = [];
					let shareItem = [item.salesSom, item.salesYearGrowth, item.sales, item.productName];
					arr.push(shareItem);
					shareArr.push(arr);
					arr = [];
					this.set('scatterData', shareArr);
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

				//表格2
				
				this.store.query('marketaggregation', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': '-SALES', 'take': '10', 'skip': '0', 'ym': '201802', 'ym_type': 'YTD', 'address_type': 'CITY' })
					.then(res => {
						let cityArr = [];
						res.forEach(item => {
							let marSize = item.sales / item.salesSom;
							let cityItem = {
								city: item.address,
								// reliable: item.sales,
								tier: 0,
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
					'market': 'ONC_other', 
					'orderby': 'SALES_RANK', 
					'gte[ym]': '201801', 
					'lte[ym]': '201812', 
					'ym_type': 'YTD', 
					'address': '上海市', 
					'address_type': 'CITY', 
					'current[ym]': '201801',
					'lte[sales_rank]': '10'})
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
			this.store.query('productaggregation', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': '-SALES', 'take': '10', 'skip': '10', 'ym': '201802', 'ym_type': 'YTD', 'address_type': 'REGION', })
			.then(data => {
				//堆叠柱状图
				let increastData = data.sortBy('ym'),
					cities = data.uniqBy('address').sortBy('address'),
					productList = increastData.uniqBy('productName'),
					result = A([]),
					otherData = A([]);
					// productList.push({productName: 'others'})

					result = productList.map(ele=> {
						let currentProductList = increastData.filterBy('productName',ele.productName);
						let productSalesSomValues = cities.map(item=> {
							let tmpSalesSom = 0;
							currentProductList.forEach(i=> {
								if(item.address === i.address) {
									tmpSalesSom = i.salesSom;
								}
							})
							return tmpSalesSom;
						})
						return {
							name: ele.productName,data:productSalesSomValues
						}
					});

					let testData = [...result.map(ele=>ele.data)],
						totalTestData = testData.flat();

						for(let j=0,citiesLen=cities.length;j<citiesLen;j++) {
							let len = productList.length,
								tmpRest = 0;

							for(let i = 0;i<len;i++) {
								tmpRest = tmpRest +totalTestData[citiesLen*i+j]
							}
							otherData.push(1-tmpRest);
						}
	
					result.push({name: 'others',data: otherData})
	
				this.set('stackXdata', cities.map(ele=>ele.address));
				this.set('stackData', result);
			})
			//region表格
			this.store.query('productaggregation', { 
				'company_id': '5ca069e2eeefcc012918ec73', 
				'market': 'ONC_other', 
				'orderby': '-SALES', 
				'take': '10', 
				'skip': '0', 
				'ym': '201802', 
				'ym_type': 'YTD', 
				'address_type': 'REGION' })
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
					'market': 'ONC_other', 
					'orderby': 'SALES_RANK', 
					'current[ym]': '201801',
					'gte[ym]': '201701',
					'lte[ym]': '201812',
					'ym_type': 'YTD', 
					'address_type': 'REGION',
					'address': '北京', 
					'lte[sales_rank]': '10' })
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
					'market': 'ONC_other', 
					'orderby': 'SALES_RANK', 
					'take': '1',
					'skip': '0',
					'ym': '201802', 
					'ym_type': 'YTD',
					'address_type': 'NATIONAL' })
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
					'market': 'ONC_other', 
					'orderby': '-SALES', 
					'take': '10', 
					'skip': '0', 
					'ym': '201802', 
					'ym_type': 'YTD', 
					'address_type': 'NATIONAL' })
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
					'market': 'ONC_other', 
					'orderby': 'SALES_RANK', 
					'current[ym]': '201801',
					'gte[ym]': '201801',
					'lte[ym]': '201812',
					'ym_type': 'YTD', 
					'address_type': 'NATIONAL',
					'lte[sales_rank]': '10' })
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
	})
});
