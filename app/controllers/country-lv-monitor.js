import Controller from '@ember/controller';
import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';

export default Controller.extend({
	// marketArr: A([{name: 'INF'}, {name: 'nhwa'}]),
	// timeArr: A([{name: '2017/04'}]),
	cur_market: '',
	cur_time: '',
	market: A([]),
	unique(arr) {
		for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j,1);
                    j--;
                }
            }
        }
		return arr;
	},

	marketArr: computed(function() {
		let market = A([]);
		let marketitem = A([]);
		let that = this;
		this.store.findAll('marketdimension').then(res => {
			that.set('market', res)
			res.forEach(item => {
				market.push(item.market);
				this.unique(market)
			})
			market.forEach(item => {
				let marketobj = {
					name: item
				}
				marketitem.pushObject(marketobj)
			})
			this.set('marketArr', marketitem);
		})
		return [];
	}),
	timeArr: computed('cur_market', function() {
		let that = this;
		let arr = [];
		this.market.forEach(item => {
			if(item.market == that.cur_market) {
				let obj = {
					name: item.ym
				}
				arr.push(obj)
			}
		})
		return arr;
	}),
	marketLineData: computed(function() {
		let lists = [];
		let market = '';
		this.set('marketLineColor', A(['#0070c0', '#c00000']));
		this.store.query('marketdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'gte[ym]': '201801', 'lte[ym]': '201812'}).then(res => {
			res.forEach(item => {
				market = item.market;
				lists.push(item.sales);
			});
			this.set('marketLineData', A([{
				name: market,
				date: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05',
					'2018-06', '2018-07', '2018-08',
					'2018-09', '2018-10', '2018-11', '2018-12'],
				data: lists,
			}]))
		})
		return A([{
			name: market,
			date: [],
			data: lists,
		}])
	}),

	pieData: computed(function() {
		let pie = A([]);
		this.store.query('productdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'ym': '201801', 'lte[sales_rank]': '5'}).then(res => {
			res.forEach(item => {
				let pieobj = {
					value: item.salesSom,
					name: item.minProduct
				}
				pie.pushObject(pieobj)
			})
			this.set('pieData', pie)
		})
		return [];
	}),

	salesLineData: computed(function() {
		let arr = [];
		let salesarritem = [];
		let growtharritem = [];
		let sharearr = [];
		let sharegrowtharr = [];
		//分割数组
		let sales = [];
		let market = '';
		let date = ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05','2018-06', '2018-07', '2018-08','2018-09', '2018-10', '2018-11', '2018-12'];
		this.set('salesLineColor', A(['#0070c0', '#c00000', '#eedd00', '#ee6738', '#112233']));
		this.store.query('productdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'gte[ym]': '201801', 'lte[ym]': '201812', 'lt[sales_rank]': '10'}).then(res => {			
			res.forEach(item => {
				arr.push(item);
			});
			for(var i = 0, len = arr.length; i < len; i += 12) {
				salesarritem.push(arr.slice(i, i + 12))
				growtharritem.push(arr.slice(i, i + 12))
				sharearr.push(arr.slice(i, i + 12))
				sharegrowtharr.push(arr.slice(i, i + 12))
			}
			for(var i = 0; i < salesarritem.length; i++) {
				salesarritem[i].forEach(yeararr => {
					market = yeararr.market
					sales.push(yeararr.sales)
				})
				salesarritem[i] = {
					name: market,
					date: date,
					data: sales
				}
				sales = [];
			}
			for(var i = 0; i < growtharritem.length; i++) {
				growtharritem[i].forEach(yeararr => {
					market = yeararr.market
					sales.push(yeararr.salesSom)
				})
				growtharritem[i] = {
					name: market,
					date: date,
					data: sales
				}
				sales = [];
			}
			for(var i = 0; i < sharearr.length; i++) {
				sharearr[i].forEach(yeararr => {
					market = yeararr.market
					sales.push(yeararr.salesYearOnYear)
				})
				sharearr[i] = {
					name: market,
					date: date,
					data: sales
				}
				sales = [];
			}
			for(var i = 0; i < sharegrowtharr.length; i++) {
				sharegrowtharr[i].forEach(yeararr => {
					market = yeararr.market
					sales.push(yeararr.salesRingGrowthRank)
				})
				sharegrowtharr[i] = {
					name: market,
					date: date,
					data: sales
				}
				sales = [];
			}
			this.set('salesLineData', salesarritem)
			this.set('salesGrowthLineData', growtharritem)
			this.set('shareLineData', sharearr)
			this.set('shareGrowthLineData', sharegrowtharr)
		})
		return A([{
			name: market,
			date: date,
			data: [],
		}]);
	}),

	barData: computed(function() {
		let bar = [];
		let barGrowth = [];
		let barShare = [];
		let barShareGrowth = [];
		this.store.query('productdimension',  {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'ym': '201804', 'lte[sales_rank]': '10', 'orderby': 'SALES_RANK'}).then(res =>{
			res.forEach(item => {
				let barobj = {
					prodName: item.minProduct,
					value: item.sales,
					type: 'MNC'
				}
				let bargrowthobj = {
					prodName: item.minProduct,
					value: item.salesSom,
					type: 'MNC'
				}
				let shareobj = {
					prodName: item.minProduct,
					value: item.salesYearOnYear,
					type: 'MNC'
				}
				let shareGrowthObj = {
					prodName: item.minProduct,
					value: item.salesRingGrowth,
					type: 'MNC'
				}
				bar.push(barobj)
				barGrowth.push(bargrowthobj)
				barShare.push(shareobj)
				barShareGrowth.push(shareGrowthObj)
			})
			this.set('barData', bar)
			this.set('barGrowthData', barGrowth)
			// this.set('barData', bar)
			this.set('barShareGrowthData', barShareGrowth)
		})
		return [];
	}),
    init() {
		this._super(...arguments);
		// this.set('lineData', A([{
		// 	name: 'MNC',
		// 	date: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05',
		// 		'2018-06', '2018-07', '2018-08',
		// 		'2018-09', '2018-10', '2018-11', '2018-12'],
		// 	data: [320, 332, 301, 334, 390, 330, 320, 255, 350, 337, 365, 912]
		// },
		// {
		// 	name: 'ELILILLY GROUP',
		// 	date: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05',
		// 		'2018-06', '2018-07', '2018-08',
		// 		'2018-09', '2018-10', '2018-11', '2018-12'],
		// 	data: [820, 932, 901, 934, 1290, 1330, 1320, 244, 365, 109, 203, 273]
		// }
		// ]));
        // this.set('lineColor', A(['#0070c0', '#c00000']));
        
        // this.set('pieData', [
		// 	{value: 0.018341049490430403, name: "氯氮平片剂25MG100海尔施生物医药股份有限公司"},
		// 	{value: 0.6962696147088795, name: "欧兰宁片剂5MG14江苏豪森药业股份有限公司"},
		// 	{value: 0.2148141405518465, name: "启维片剂100MG30复星集团"},
		// 	{value: 0.031349721644244335, name: "氯氮平片剂25MG100江苏徐州恩华药业集团有限责任公司"},
		// 	{value: 0.039225473604599416, name: "氯氮平片剂25MG100上海医药集团股份有限公司"},
		// ]);
		
        
        // this.set('barData', A([
		// 	{ prodName: 'Stanley May', value: 1.6861, type: 'MNC' },
		// 	{ prodName: 'Ray Dean', value: 4.599, type: 'Local' },
		// 	{ prodName: 'Celia Sims', value: 3.9925, type: 'MNC' },
		// 	{ prodName: 'Alberta Fields', value: 1.1181, type: 'Local' },
		// 	{ prodName: 'Annie Mack', value: 1.4165, type: 'MNC' },
		// 	{ prodName: 'Ricardo Roy', value: 2.4944, type: 'Local' },
		// 	{ prodName: 'Lottie Parsons', value: 2.0540, type: 'Local' },
		// 	{ prodName: 'Isabelle Walters', value: 1.9328, type: 'MNC' },
		// 	{ prodName: 'Gary Ortega', value: 2.7467, type: 'Local' },
		// 	{ prodName: 'Julian Morrison', value: 2.3548, type: 'MNC' },
		// 	{ prodName: 'Charlotte Fields', value: 5.4294, type: 'Local' },
		// 	{ prodName: 'Carlos Price', value: 9.825, type: 'Local' },
		// 	{ prodName: 'Isabella Schwartz', value: 9.319, type: 'MNC' },
		// 	{ prodName: 'Nathaniel Keller', value: 1.6843, type: 'Local' },
		// 	{ prodName: 'Frank King', value: 1.9282, type: 'MNC' },
		// 	{ prodName: 'Maria Ramos', value: 6.4827, type: 'Local' },
		// 	{ prodName: 'Rena Harper', value: 5.1307, type: 'Local' },
		// 	{ prodName: 'Gene Johnston', value: 3.3600, type: 'MNC' },
		// 	{ prodName: 'Leon Watson', value: 5.5585, type: 'Local' },
		// 	{ prodName: 'May Stevenson', value: 5.5079, type: 'Local' },
		// 	{ prodName: 'Jimmy Holmes', value: 3.2692, type: 'MNC' },
		// 	{ prodName: 'Ernest Anderson', value: 1.397, type: 'Lilly' },
		// ]));
	},

    
    

	saleLineSwitch: 0,
	proSaleLineSwitch: 0,
	shareLineSwitch: 0,
    saleBarSwitch: 0,
    // shareLineSwitch: 1,
	shareBarSwitch: 0,
	
	actions: {
		refreshData(param) {
			debugger
			this.set('line', param)
		},
	}



});
