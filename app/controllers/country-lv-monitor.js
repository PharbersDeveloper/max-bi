import Controller from '@ember/controller';
import { A } from '@ember/array';
import { observer } from '@ember/object';
// import {isEmpty} from '@ember/utils';

export default Controller.extend({
	market: A([]),
	marketArr: A({}),
	marketsArr: A([]),
	marketValue: '',
	ymValue: '',
	proSaleLineSwitch: 0,
	shareLineSwitch: 0,
	saleBarSwitch: 0,
	shareBarSwitch: 0,

	init() {
		this._super(...arguments);
		this.setProperties({
			lineData: A([]),
			salesLineData: A([]),
			salesGrowthLineData: A([]),
			shareLineData: A([]),
			shareGrowthLineData: A([]),
			// salesLineColor: A(['#57D9A3', '#79E2F2', '#FFE380', '#8777D9 ']),
			marketLineColor: A(['#007ACA']),
			pieColor: A(['#8777D9', '#579AFF', '#FFE380',  '#36B37E', '#79F2C0'],),
		})
	},

	allData: observer('marketValue' ,'ymValue', function () {
		if(this.marketValue == '') {
			return
		} 
		if(this.ymValue == '') {
			return
		} 
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

		//查询参数
		let ymlated = Number(this.ymValue) - 100;

		//card数据
		this.store.query('marketdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'ym': this.ymValue})
			.then(res => {
			this.set('marketdimension', res);
		})
		this.store.query('productdimension', {'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'ym': this.ymValue, 'sales_rank': 1})	.then(res =>{
			this.set('productdimension', res);
		})	
		//单个折线图
		this.store.query('marketdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'gte[ym]': String(ymlated), 'lte[ym]': this.ymValue}).then(res => {
			let lists = [];
			let market = '销售额';
			let len = 13 - res.length;
			for( let i = 0; i < len; i++  ){ lists.push( '0' ); }
			res.forEach(item => {
				lists.push(item.sales);
			});
			this.set('lineData', A([{
				name: market,
				date: result,
				data: lists,
			}]))
		})

		//饼图
		this.store.query('productdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'ym': this.ymValue, 'lte[sales_rank]': '5' }).then(res => {
			let pie = A([]);
			res.forEach(item => {
				let pieobj = {
					value: item.salesSom,
					name: item.productName
				}
				pie.pushObject(pieobj)
			})
			this.set('pieData', pie)
		})

		//柱状图
		this.store.query('productdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'ym': this.ymValue, 'lte[sales_rank]': '10', 'orderby': 'SALES_RANK' }).then(res => {
			let bar = [];
			let barGrowth = [];
			let barShare = [];
			let barShareGrowth = [];
			res.forEach(item => {
				let barobj = {
					prodName: item.productName,
					value: item.sales,
					type: 'Local'
				}
				let bargrowthobj = {
					prodName: item.productName,
					value: item.salesSom,
					type: 'MNC'
				}
				let shareobj = {
					prodName: item.productName,
					value: item.salesYearGrowth,
					type: 'MNC'
				}
				let shareGrowthObj = {
					prodName: item.productName,
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
		
		//折线图	
		this.store.query('productdimension', { 'company_id': '5ca069e2eeefcc012918ec73', 'market': this.marketValue.market, 'gt[ym]': String(ymlated - 1), 'lte[ym]': this.ymValue, 'lte[sales_rank]': '10' }).then(res => {
			let arr = [], salesarritem = [], growtharritem = [], sharearr = [], sharegrowtharr = [], sales = [], marketline = '', map = {}, dest = [];
			res.forEach(item => {
				arr.push(item);
			});
			//将大数组根据某项值分成若干小数组
			for(let i = 0; i < arr.length; i++){
				var ai = arr[i];
				if(!map[ai.productId]){
					dest.push({
						productId: ai.productId,
						item: [ai]
					});
					map[ai.productId] = ai;
				}else{
					for(let j = 0; j < dest.length; j++){
						var dj = dest[j];
						if(dj.productId == ai.productId){
							dj.item.push(ai);
							break;
						}
					}
				}
			}
			//横轴长度为13,缺少项补0
			let len = 13 - dest[0].item.length;
			for( let i = 0; i < len; i++  ){ sales.push( '0' ); }
			for (let i = 0; i < dest.length; i++) {
				dest[i].item.forEach(yeararr => {
					marketline = yeararr.productName
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
					marketline = yeararr.productName
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
					marketline = yeararr.productName
					// dateline.push(yeararr.ym)
					sales.push(yeararr.salesYearGrowth)
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
					marketline = yeararr.productName
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
