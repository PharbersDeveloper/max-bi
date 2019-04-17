import Controller from '@ember/controller';
import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';

export default Controller.extend({
	lineData: computed(function() {
		let lists = [];
		let market = '';
		this.set('lineColor', A(['#0070c0', '#c00000']));
		this.store.query('marketdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': 'CNS_R', 'gte[ym]': '201801', 'lte[ym]': '201812'}).then(res => {
			res.forEach(item => {
				market = item.market;
				lists.push(item.salesSom);
			});
			this.set('lineData', A([{
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
		
        
        this.set('barData', A([
			{ prodName: 'Stanley May', value: 1.6861, type: 'MNC' },
			{ prodName: 'Ray Dean', value: 4.599, type: 'Local' },
			{ prodName: 'Celia Sims', value: 3.9925, type: 'MNC' },
			{ prodName: 'Alberta Fields', value: 1.1181, type: 'Local' },
			{ prodName: 'Annie Mack', value: 1.4165, type: 'MNC' },
			{ prodName: 'Ricardo Roy', value: 2.4944, type: 'Local' },
			{ prodName: 'Lottie Parsons', value: 2.0540, type: 'Local' },
			{ prodName: 'Isabelle Walters', value: 1.9328, type: 'MNC' },
			{ prodName: 'Gary Ortega', value: 2.7467, type: 'Local' },
			{ prodName: 'Julian Morrison', value: 2.3548, type: 'MNC' },
			{ prodName: 'Charlotte Fields', value: 5.4294, type: 'Local' },
			{ prodName: 'Carlos Price', value: 9.825, type: 'Local' },
			{ prodName: 'Isabella Schwartz', value: 9.319, type: 'MNC' },
			{ prodName: 'Nathaniel Keller', value: 1.6843, type: 'Local' },
			{ prodName: 'Frank King', value: 1.9282, type: 'MNC' },
			{ prodName: 'Maria Ramos', value: 6.4827, type: 'Local' },
			{ prodName: 'Rena Harper', value: 5.1307, type: 'Local' },
			{ prodName: 'Gene Johnston', value: 3.3600, type: 'MNC' },
			{ prodName: 'Leon Watson', value: 5.5585, type: 'Local' },
			{ prodName: 'May Stevenson', value: 5.5079, type: 'Local' },
			{ prodName: 'Jimmy Holmes', value: 3.2692, type: 'MNC' },
			{ prodName: 'Ernest Anderson', value: 1.397, type: 'Lilly' },
		]));
	},

    marketArr: A([{name: 'INF'}, {name: 'nhwa'}]),
    timeArr: A([{name: '2017/04'}]),
    cur_market: '',
    cur_time: '',

    saleLineSwitch: 0,
    saleBarSwitch: 0,
    shareLineSwitch: 1,
	shareBarSwitch: 1,
	
	actions: {
		refreshData(param) {
			debugger
			this.set('line', param)
		}
	}


});
