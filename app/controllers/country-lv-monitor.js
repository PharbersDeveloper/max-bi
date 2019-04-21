import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed, observer } from '@ember/object';
// import {isEmpty} from '@ember/utils';

export default Controller.extend({
	market: A([]),
	marketArr: A({}),
	marketsArr: A([]),
	marketValue: '',
	refreshFlag: false,
	proSaleLineSwitch: 0,
	shareLineSwitch: 0,
	saleBarSwitch: 0,
	shareBarSwitch: 0,
	
	// timeArr: computed('marketValue', function () {
	// 	if(isEmpty(this.marketsArr)) {
	// 		return []
	// 	}
	// 	let arrval = this.marketsArr.filter(item => {
	// 		return item.market === this.marketValue.market;
	// 	})
	// 	this.set('ymValue', arrval.firstObject.ym);
	// 	return arrval;
	// }),

	allData: observer('marketValue' ,'ymValue', 'refreshFlag', function () {

		this.store.query('marketdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'ym': this.ymValue})
			.then(res => {
			this.set('marketdimension', res);
		})
		this.store.query('productdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'ym': this.ymValue, 'sales_rank': 1})	.then(res =>{
			this.set('productdimension', res);
		})

		let lists = [];
		let date  = [];
		let market = '';
		this.set('marketLineColor', A(['#0070c0', '#c00000']));
		this.set('lineData', A([{
			name: market,
			date: [],
			data: lists,
		}]))
		let ymlated = Number(this.ymValue) - 100;
		this.store.query('marketdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'gte[ym]': String(ymlated), 'lte[ym]': this.ymValue}).then(res => {
			res.forEach(item => {
				market = item.market;
				date.push(item.ym);
				lists.push(item.sales);
			});
			this.set('lineData', A([{
				name: market,
				date: date,
				data: lists,
			}]))
		})

		let pie = A([]);
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
		let dateline = [];
		// let ymlated = Number(this.ymValue) - 100;
		this.set('salesLineColor', A(['#0070c0', '#c00000', '#eedd00', '#ee6738', '#112233']));
		this.store.query('productdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'gte[ym]': String(ymlated), 'lte[ym]': this.ymValue, 'lt[sales_rank]': '10' }).then(res => {
			res.forEach(item => {
				arr.push(item);
			});
			for (let i = 0, len = arr.length; i < len; i += 12) {
				salesarritem.push(arr.slice(i, i + 12))
				growtharritem.push(arr.slice(i, i + 12))
				sharearr.push(arr.slice(i, i + 12))
				sharegrowtharr.push(arr.slice(i, i + 12))
			}
			for (let i = 0; i < salesarritem.length; i++) {
				salesarritem[i].forEach(yeararr => {
					marketline = yeararr.market
					dateline.push(yeararr.ym)
					sales.push(yeararr.sales)
				})
				salesarritem[i] = {
					name: marketline,
					date: dateline,
					data: sales
				}
				sales = [];
				dateline = [];
			}
			for (let i = 0; i < growtharritem.length; i++) {
				growtharritem[i].forEach(yeararr => {
					marketline = yeararr.market
					sales.push(yeararr.salesSom)
					dateline.push(yeararr.ym)
				})
				growtharritem[i] = {
					name: marketline,
					date: dateline,
					data: sales
				}
				sales = [];
				dateline = [];
			}
			for (let i = 0; i < sharearr.length; i++) {
				sharearr[i].forEach(yeararr => {
					marketline = yeararr.market
					dateline.push(yeararr.ym)
					sales.push(yeararr.salesYearOnYear)
				})
				sharearr[i] = {
					name: marketline,
					date: dateline,
					data: sales
				}
				sales = [];
				dateline = [];
			}
			for (let i = 0; i < sharegrowtharr.length; i++) {
				sharegrowtharr[i].forEach(yeararr => {
					marketline = yeararr.market
					dateline.push(yeararr.ym)
					sales.push(yeararr.salesRingGrowthRank)
				})
				sharegrowtharr[i] = {
					name: marketline,
					date: dateline,
					data: sales
				}
				sales = [];
				dateline = [];
			}
			this.set('salesLineData', salesarritem)
			this.set('salesGrowthLineData', growtharritem)
			this.set('shareLineData', salesarritem)
			this.set('shareGrowthLineData', sharegrowtharr)
		})
	}),

	salesLineData: computed(function () {
		let arr = [];
		let salesarritem = [];
		let growtharritem = [];
		let sharearr = [];
		let sharegrowtharr = [];
		
		let sales = [];
		let marketline = '';
		let dateline = [];
		let ymlated = Number(this.ymValue) - 100;
		this.set('salesLineColor', A(['#0070c0', '#c00000', '#eedd00', '#ee6738', '#112233']));
		this.store.query('productdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'gte[ym]': String(ymlated), 'lte[ym]': this.ymValue, 'lt[sales_rank]': '10' }).then(res => {
			res.forEach(item => {
				arr.push(item);
			});
			for (let i = 0, len = arr.length; i < len; i += 12) {
				salesarritem.push(arr.slice(i, i + 12))
				growtharritem.push(arr.slice(i, i + 12))
				sharearr.push(arr.slice(i, i + 12))
				sharegrowtharr.push(arr.slice(i, i + 12))
			}
			for (let i = 0; i < salesarritem.length; i++) {
				salesarritem[i].forEach(yeararr => {
					marketline = yeararr.market
					dateline.push(yeararr.ym)
					sales.push(yeararr.sales)
				})
				salesarritem[i] = {
					name: marketline,
					date: dateline,
					data: sales
				}
				sales = [];
				dateline = [];
			}
			for (let i = 0; i < growtharritem.length; i++) {
				growtharritem[i].forEach(yeararr => {
					marketline = yeararr.market
					sales.push(yeararr.salesSom)
					dateline.push(yeararr.ym)
				})
				growtharritem[i] = {
					name: marketline,
					date: dateline,
					data: sales
				}
				sales = [];
				dateline = [];
			}
			for (let i = 0; i < sharearr.length; i++) {
				sharearr[i].forEach(yeararr => {
					marketline = yeararr.market
					dateline.push(yeararr.ym)
					sales.push(yeararr.salesYearOnYear)
				})
				sharearr[i] = {
					name: marketline,
					date: dateline,
					data: sales
				}
				sales = [];
				dateline = [];
			}
			for (let i = 0; i < sharegrowtharr.length; i++) {
				sharegrowtharr[i].forEach(yeararr => {
					marketline = yeararr.market
					dateline.push(yeararr.ym)
					sales.push(yeararr.salesRingGrowthRank)
				})
				sharegrowtharr[i] = {
					name: marketline,
					date: dateline,
					data: sales
				}
				sales = [];
				dateline = [];
			}
			this.set('salesLineData', salesarritem)
			this.set('salesGrowthLineData', growtharritem)
			this.set('shareLineData', salesarritem)
			this.set('shareGrowthLineData', sharegrowtharr)
		})
		return A([{
			name: marketline,
			date: [],
			data: [],
		}]);
	}),

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
