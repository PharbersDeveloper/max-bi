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
			{ name: 'keyong', data: [5, 20, 36, 10, 10, 20] },
			{ name: 'bukeyong', data: [40, 22, 18, 35, 42, 40] },
			{ name: 'qita', data: [40, 22, 18, 35, 42, 40] }
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
	// keyPlusValue(arr) {
	// 	const result = arr.reduce((obj, item) => {
	// 		if (!obj[item.key]) {
	// 		obj[item.key] = 0
	// 		}
	// 		obj[item.key] += item.value
	// 		return obj
	// 	}, {})
	// 	return Object.keys(result).map(key => ({key: key, value: result[key]}))
	// },
	allData: observer('marketValue', function () {
		//City Analysis数据
		this.store.query('productaggregation', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': '-SALES', 'take': '10', 'skip': '0', 'ym': '201802', 'ym_type': 'MAT', 'address': '上海市' })
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
				let cityArr = [];
				this.store.query('marketaggregation', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': '-SALES', 'take': '10', 'skip': '0', 'ym': '201802', 'ym_type': 'MAT', 'address_type': 'CITY' })
					.then(res => {
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
							// let dateArr = [];
							// dateArr.push(item.ym);
							// let 
							// dataArr.push(item.sales)
							// let lineItem = {
							// 	name: item.productName,
							// 	date: dateArr,
							// 	data: dataArr,
							// }
							// lineArr.push(lineItem);
							// this.set('lineData', cityArr)
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
	})
});
