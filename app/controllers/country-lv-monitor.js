import Controller from '@ember/controller';
import { A } from '@ember/array';
import { observer } from '@ember/object';
// import {isEmpty} from '@ember/utils';

export default Controller.extend({
	market: A([]),
	marketArr: A({}),
	marketsArr: A([]),
	marketValue: '',
	proSaleLineSwitch: 0,
	shareLineSwitch: 0,
	saleBarSwitch: 0,
	shareBarSwitch: 0,

	init() {
		this._super(...arguments);
		this.setProperties({
			lineData:A([]),
			salesLineData:A([]),
			salesGrowthLineData: A([]),
			shareLineData: A([]),
			shareGrowthLineData:A([])
		})
	},

	allData: observer('marketValue' ,'ymValue', function () {
		// 获取当前选择月份的前12个月
		let dealdate = this.ymValue.toString().slice(0,4) + '-' + this.ymValue.toString().slice(4,6);
		let d = new Date(dealdate);
		let result = [dealdate];
		for(var i = 0; i < 12; i++) {
			d.setMonth(d.getMonth() - 1);
			var m = d.getMonth() + 1;
			m = m < 10 ? "0" + m : m;
			result.push(d.getFullYear() + "-" + m);
		}
		result.reverse()


		this.store.query('marketdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'ym': this.ymValue})
			.then(res => {
			this.set('marketdimension', res);
		})
		this.store.query('productdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'ym': this.ymValue, 'sales_rank': 1})	.then(res =>{
			this.set('productdimension', res);
		})

		let lists = [];
		let market = '';
		this.set('marketLineColor', A(['#007ACA']));
		let ymlated = Number(this.ymValue) - 100;
		this.store.query('marketdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'gte[ym]': String(ymlated), 'lte[ym]': this.ymValue}).then(res => {
			let len = 13 - res.length;
			for( let i = 0; i < len; i++  ){ lists.push( '0' ); }
			res.forEach(item => {
				market = item.market;
				// date.push(item.ym);
				lists.push(item.sales);
			});
			this.set('lineData', A([{
				name: market,
				date: result,
				data: lists,
			}]))
		})

		let pie = A([]);
		this.set('pieColor', A(['#579AFF', '#007ACA']));
		this.store.query('productdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'ym': this.ymValue, 'lte[sales_rank]': '5' }).then(res => {
			res.forEach(item => {
				let pieobj = {
					value: item.salesSom,
					name: item.minProduct
				}
				pie.pushObject(pieobj)
			})
			this.set('pieData', pie)
		})

		let bar = [];
		let barGrowth = [];
		let barShare = [];
		let barShareGrowth = [];
		this.store.query('productdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'ym': this.ymValue, 'lte[sales_rank]': '10', 'orderby': 'SALES_RANK' }).then(res => {
			res.forEach(item => {
				let barobj = {
					prodName: item.minProduct,
					value: item.sales,
					type: 'Local'
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
			this.set('barShareData', barShare)
			this.set('barShareGrowthData', barShareGrowth)
		})
		
		let arr = [];
		let salesarritem = [];
		let growtharritem = [];
		let sharearr = [];
		let sharegrowtharr = [];
		let sales = [];
		let marketline = '';
		// let dateline = [];

		
		// let ymlated = Number(this.ymValue) - 100;

		this.set('salesLineColor', A(['#c00000', '#eedd00', '#ee6738', '#112233']));
		this.store.query('productdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'gte[ym]': String(ymlated), 'lte[ym]': this.ymValue, 'lt[sales_rank]': '10' }).then(res => {
			res.forEach(item => {
				arr.push(item);
			});
			var map = {},
				dest = [];
			for(var i = 0; i < arr.length; i++){
				var ai = arr[i];
				if(!map[ai.minProduct]){
					dest.push({
						minProduct: ai.minProduct,
						item: [ai]
					});
					map[ai.minProduct] = ai;
				}else{
					for(var j = 0; j < dest.length; j++){
						var dj = dest[j];
						if(dj.minProduct== ai.minProduct){
							dj.item.push(ai);
							break;
						}
					}
				}
			}
			
			// for (let i = 0, len = arr.length; i < len; i += 12) {
			// 	salesarritem.push(arr.slice(i, i + 12))
			// 	growtharritem.push(arr.slice(i, i + 12))
			// 	sharearr.push(arr.slice(i, i + 12))
			// 	sharegrowtharr.push(arr.slice(i, i + 12))
			// }
			let len = 13 - dest[0].item.length;
			for( let i = 0; i < len; i++  ){ sales.push( '0' ); }

			for (let i = 0; i < dest.length; i++) {
				dest[i].item.forEach(yeararr => {
					marketline = yeararr.market
					// dateline.push(yeararr.ym)
					sales.push(yeararr.sales)
				})
				salesarritem[i] = {
					name: marketline,
					date: result,
					data: sales
				}
				sales = [];
				let len = 13 - dest[0].item.length;
				for( let i = 0; i < len; i++  ){ sales.push( '0' ); }
			}
			for (let i = 0; i < dest.length; i++) {
				dest[i].item.forEach(yeararr => {
					marketline = yeararr.market
					sales.push(yeararr.salesSom)
					// dateline.push(yeararr.ym)
				})
				growtharritem[i] = {
					name: marketline,
					date: result,
					data: sales
				}
				sales = [];
				let len = 13 - dest[0].item.length;
				for( let i = 0; i < len; i++  ){ sales.push( '0' ); }
			}
			for (let i = 0; i < dest.length; i++) {
				dest[i].item.forEach(yeararr => {
					marketline = yeararr.market
					// dateline.push(yeararr.ym)
					sales.push(yeararr.salesYearOnYear)
				})
				sharearr[i] = {
					name: marketline,
					date: result,
					data: sales
				}
				sales = [];
				let len = 13 - dest[0].item.length;
				for( let i = 0; i < len; i++  ){ sales.push( '0' ); }
			}
			for (let i = 0; i < dest.length; i++) {
				dest[i].item.forEach(yeararr => {
					marketline = yeararr.market
					// dateline.push(yeararr.ym)
					sales.push(yeararr.salesRingGrowthRank)
				})
				sharegrowtharr[i] = {
					name: marketline,
					date: result,
					data: sales
				}
				sales = [];
				let len = 13 - dest[0].item.length;
				for( let i = 0; i < len; i++  ){ sales.push( '0' ); }
			}
			this.set('salesLineData', salesarritem)
			this.set('salesGrowthLineData', growtharritem)
			this.set('shareLineData', sharearr)
			this.set('shareGrowthLineData', sharegrowtharr)
		})
	}),
	// salesLineData: computed(function () {
	// 	let arr = [];
	// 	let salesarritem = [];
	// 	let growtharritem = [];
	// 	let sharearr = [];
	// 	let sharegrowtharr = [];
		
	// 	let sales = [];
	// 	let marketline = '';
	// 	let dateline = [];

	// 	let ymlated = Number(this.ymValue) - 100;

	// 	let dealdate = this.ymValue.toString().slice(0,4) + '-' + this.ymValue.toString().slice(4,6);
	// 	let d = new Date(dealdate);
	// 	let result = [dealdate];
	// 	for(var i = 0; i < 12; i++) {
	// 		d.setMonth(d.getMonth() - 1);
	// 		var m = d.getMonth() + 1;
	// 		m = m < 10 ? "0" + m : m;
	// 		result.push(d.getFullYear() + "-" + m);
	// 	}
	// 	result.reverse()
	// 	this.set('salesLineColor', A(['#0070c0', '#c00000', '#eedd00', '#ee6738', '#112233']));
	// 	this.store.query('productdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'gte[ym]': String(ymlated), 'lte[ym]': this.ymValue, 'lt[sales_rank]': '10' }).then(res => {
	// 		res.forEach(item => {
	// 			arr.push(item);
	// 		});
			
	// 		var map = {},
	// 			dest = [];
	// 		for(var i = 0; i < arr.length; i++){
	// 			var ai = arr[i];
	// 			if(!map[ai.minProduct]){
	// 				dest.push({
	// 					minProduct: ai.minProduct,
	// 					item: [ai]
	// 				});
	// 				map[ai.minProduct] = ai;
	// 			}else{
	// 				for(var j = 0; j < dest.length; j++){
	// 					var dj = dest[j];
	// 					if(dj.minProduct== ai.minProduct){
	// 						dj.item.push(ai);
	// 						break;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		// for (let i = 0, len = arr.length; i < len; i += 12) {
	// 		// 	salesarritem.push(arr.slice(i, i + 12))
	// 		// 	growtharritem.push(arr.slice(i, i + 12))
	// 		// 	sharearr.push(arr.slice(i, i + 12))
	// 		// 	sharegrowtharr.push(arr.slice(i, i + 12))
	// 		// }

	// 		for (let i = 0; i < dest.length; i++) {
	// 			dest[i].item.forEach(yeararr => {
	// 				marketline = yeararr.market
	// 				// dateline.push(yeararr.ym)
	// 				sales.push(yeararr.sales)
	// 			})
	// 			salesarritem[i] = {
	// 				name: marketline,
	// 				date: result,
	// 				data: sales
	// 			}
	// 			sales = [];
	// 			// dateline = [];
	// 		}
	// 		for (let i = 0; i < dest.length; i++) {
	// 			dest[i].item.forEach(yeararr => {
	// 				marketline = yeararr.market
	// 				sales.push(yeararr.salesSom)
	// 				// dateline.push(yeararr.ym)
	// 			})
	// 			growtharritem[i] = {
	// 				name: marketline,
	// 				date: result,
	// 				data: sales
	// 			}
	// 			sales = [];
	// 			// dateline = [];
	// 		}
	// 		for (let i = 0; i < dest.length; i++) {
	// 			dest[i].item.forEach(yeararr => {
	// 				marketline = yeararr.market
	// 				// dateline.push(yeararr.ym)
	// 				sales.push(yeararr.salesYearOnYear)
	// 			})
	// 			sharearr[i] = {
	// 				name: marketline,
	// 				date: result,
	// 				data: sales
	// 			}
	// 			sales = [];
	// 			// dateline = [];
	// 		}
	// 		for (let i = 0; i < dest.length; i++) {
	// 			dest[i].item.forEach(yeararr => {
	// 				marketline = yeararr.market
	// 				// dateline.push(yeararr.ym)
	// 				sales.push(yeararr.salesRingGrowthRank)
	// 			})
	// 			sharegrowtharr[i] = {
	// 				name: marketline,
	// 				date: result,
	// 				data: sales
	// 			}
	// 			sales = [];
	// 			// dateline = [];
	// 		}
	// 		this.set('salesLineData', salesarritem)
	// 		this.set('salesGrowthLineData', growtharritem)
	// 		this.set('shareLineData', sharearr)
	// 		this.set('shareGrowthLineData', sharegrowtharr)
	// 	})
	// 	return A([{
	// 		name: marketline,
	// 		date: [],
	// 		data: [],
	// 	}]);
	// }),

	actions: {
		refreshData(param) {
			this.set('line', param)
		},
		ymChange(item) {
			this.toggleProperty("refreshFlag")
			this.set('ymValue', item);
		}
	}



});
