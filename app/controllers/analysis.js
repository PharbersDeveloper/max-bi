import Controller from '@ember/controller';
import { A } from '@ember/array';
import { observer } from '@ember/object';

export default Controller.extend({

    cur_tab_idx: 0,
    tabs: A(['Overall Market', 'Regional Analysis', 'Province Analysis', 'City Analysis']),
	collapsed: false,
    actions: {
        onTabClicked() {},
        toggle() {
            if(this.collapsed) {
                this.set('collapsed', false)
            } else {
                this.set('collapsed', true)
            }
        }
    },
    init() {
		this._super(...arguments);
		this.set('linelegendPosition', { right: '0', 'top': '40', type: 'scoll', orient: 'vertical' });
		this.set('grid', { right: '200px', });
		this.set('lineData', A([{
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
		}]));
		// this.set('lineColor',  A(['rgb(115,171,255)', 'rgb(255,227,128)', 'rgb(73,229,245)','rgb(52,246,188)', 'rgb(54,179,126)']));
		// this.set('legendPosition', { x: 'center', y: 'center', });
		this.set('scatterData', A([
			[[66666, 57, 100000, '']],
			[[12225, 81, 100000, '']],
			[[55555, 57, 100000, '']],
			[[33333, 45, 100000, '']],
			[[22222, 57, 255555, '']]
		]),);
		this.set('stackData', A([
			{ name: 'keyong', data: [5, 20, 36, 10, 10, 20] },
			{ name: 'bukeyong', data: [40, 22, 18, 35, 42, 40] },
			{ name: 'qita', data: [40, 22, 18, 35, 42, 40] }
		]),);
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
		}]),);
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
		this.store.query('productaggregation', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'ONC_other', 'orderby': '-SALES', 'take': '10', 'skip': '0', 'ym': '201802', 'ym_type': 'MAT', 'address': '上海市'})
			.then(res => {
			let proArr = [];
			let shareArr = [];
			res.forEach(item => {
				//表格
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
				let  shareItem= [ item.salesSom, item.salesYearGrowth, item.sales, item.productName];
				arr.push(shareItem);
				shareArr.push(arr);
				arr = [];
				this.set('scatterData', shareArr);
				// this.set('scatterData', A([
				// 	[[66666, 150, 1000000, 'test1']],
				// 	[[12225, 81, 100000, 'test2']],
				// 	[[55555, 57, 100000, 'test3']],
				// 	[[33333, 45, 100000, 'test4']],
				// 	[[22222, 57, 255555, 'test5']]
				// ]),);
			})
			let totalPro = res.reduce((total, ele) =>  {
				return {
					totalSales: Number(total.totalSales)+Number(ele.sales),
					totalMarketShare:  Number(total.totalMarketShare)+ Number(ele.salesSom),
					totalMs: total.totalMs+ele.salesSomYearGrowth,
					totalGrowth: total.totalGrowth+ele.salesYearGrowth,
					totalEi: total.totalEi+ele.salesEI
				}

			}, {totalSales:0, totalMarketShare: 0, totalMs: 0, totalGrowth: 0, totalEi: 0});
			this.set('totalProObj', totalPro)
		})		
	})
});
