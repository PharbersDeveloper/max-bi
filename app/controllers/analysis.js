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
		this.set('lineData', A([{
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
		this.set('mapData', A([{
			name: '江苏省',
			value: 5.3
		}, {
			name: '北京市',
			value: 3.8
		}, {
			name: '上海',
			value: 4.6
		}, {
			name: '重庆',
			value: 3.6
		}, {
			name: '河北',
			value: 3.4
		}, {
			name: '河南',
			value: 3.2
		}, {
			name: '云南',
			value: 1.6
		}, {
			name: '辽宁',
			value: 4.3
		}, {
			name: '黑龙江',
			value: 4.1
		}, {
			name: '湖南',
			value: 2.4
		}, {
			name: '安徽',
			value: 3.3
		}, {
			name: '山东',
			value: 3.0
		}, {
			name: '新疆',
			value: 1
		}, {
			name: '江苏',
			value: 3.9
		}, {
			name: '浙江',
			value: 3.5
		}, {
			name: '江西',
			value: 2.0
		}, {
			name: '湖北',
			value: 2.1
		}, {
			name: '广西',
			value: 3.0
		}, {
			name: '甘肃',
			value: 1.2
		}, {
			name: '山西',
			value: 3.2
		}, {
			name: '内蒙古',
			value: 3.5
		}, {
			name: '陕西',
			value: 2.5
		}, {
			name: '吉林',
			value: 4.5
		}, {
			name: '福建',
			value: 2.8
		}, {
			name: '贵州',
			value: 80
		}, {
			name: '广东',
			value: 100
		}, {
			name: '青海',
			value: 43
		}, {
			name: '西藏',
			value: 33
		}, {
			name: '四川',
			value: 3.3
		}, {
			name: '宁夏',
			value: 0.8
		}, {
			name: '海南',
			value: 1.9
		}, {
			name: '台湾',
			value: 0.1
		}, {
			name: '香港',
			value: 50
		}, {
			name: '澳门',
			value: 88
		}
		]))
	},
	allData: observer('marketValue', function () {
		//City Analysis数据
		this.store.query('productaggregation', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': '-SALES', 'take': '10', 'skip': '0', 'ym': '201802', 'ym_type': 'MAT', 'address': '上海市', 'address_type': 'CITY' })
			.then(res => {
				console.log(res)
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
				
				this.store.query('marketaggregation', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': '-SALES', 'take': '10', 'skip': '0', 'ym': '201802', 'ym_type': 'MAT', 'address_type': 'CITY' })
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
				this.store.query('productaggregation', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': 'SALES_RANK', 'gte[ym]': '201801', 'lte[ym]': '201812', 'ym_type': 'MAT', 'address': '上海市', 'address_type': 'CITY', 'lte[sales_rank]': '10' })
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
			this.store.query('productaggregation', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': '-SALES', 'take': '10', 'skip': '10', 'ym': '201802', 'ym_type': 'MAT', 'address_type': 'REGION', })
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
						let len = productList.length;
						let tmpRest = 0;
						for(let i = 0;i<len;i++) {
							tmpRest = tmpRest +totalTestData[5*i+j]
						}
						otherData.push(1-tmpRest);
					}
	
					result.push({name: 'others',data: otherData})
	
				this.set('stackXdata', cities.map(ele=>ele.address));
				this.set('stackData', result);
			})
			this.store.query('marketaggregation', { 
				'company_id': '5ca069e2eeefcc012918ec73', 
				'market': 'ONC_other', 
				'orderby': '-SALES', 
				'take': '10', 
				'skip': '0', 
				'ym': '201802', 
				'ym_type': 'MAT', 
				'address_type': 'REGION' })
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
	})
});
