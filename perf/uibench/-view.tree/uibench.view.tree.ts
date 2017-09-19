namespace $ { export class $mol_perf_uibench extends $mol_scroll {

	/// sub / <= page -
	sub() {
		return [].concat( this.page() )
	}

	/// page null
	page() {
		return null as any
	}

	/// table $mol_perf_uibench_table state <= stateTable -
	@ $mol_mem
	table() {
		return (( obj )=>{
			obj.state = () => this.stateTable()
			return obj
		})( new this.$.$mol_perf_uibench_table )
	}

	/// stateTable null
	stateTable() {
		return null as any
	}

	/// anim $mol_perf_uibench_anim state <= stateAnim -
	@ $mol_mem
	anim() {
		return (( obj )=>{
			obj.state = () => this.stateAnim()
			return obj
		})( new this.$.$mol_perf_uibench_anim )
	}

	/// stateAnim null
	stateAnim() {
		return null as any
	}

	/// tree $mol_perf_uibench_tree state <= stateTree -
	@ $mol_mem
	tree() {
		return (( obj )=>{
			obj.state = () => this.stateTree()
			return obj
		})( new this.$.$mol_perf_uibench_tree )
	}

	/// stateTree null
	stateTree() {
		return null as any
	}

} }

namespace $ { export class $mol_perf_uibench_table extends $mol_list {

	/// state null
	state() {
		return null as any
	}

	/// dom_name \table
	dom_name() {
		return "table"
	}

	/// attr * 
	/// 	^ 
	/// 	class \Table
	attr() {
		return ({
			...super.attr() ,
			"class" :  "Table" ,
		})
	}

} }

namespace $ { export class $mol_perf_uibench_table_row extends $mol_view {

	/// state null
	state() {
		return null as any
	}

	/// minimal_height 18
	minimal_height() {
		return 18
	}

	/// dom_name \tr
	dom_name() {
		return "tr"
	}

	/// attr * 
	/// 	^ 
	/// 	class <= className - 
	/// 	data-id <= id -
	attr() {
		return ({
			...super.attr() ,
			"class" :  this.className() ,
			"data-id" :  this.id() ,
		})
	}

	/// className \TableRow
	className() {
		return "TableRow"
	}

	/// id 0
	id() {
		return 0
	}

	/// sub / 
	/// 	<= header - 
	/// 	<= cells -
	sub() {
		return [].concat( this.header() , this.cells() )
	}

	/// header $mol_perf_uibench_table_cell text <= headerText -
	@ $mol_mem
	header() {
		return (( obj )=>{
			obj.text = () => this.headerText()
			return obj
		})( new this.$.$mol_perf_uibench_table_cell )
	}

	/// headerText \
	headerText() {
		return ""
	}

	/// cells /
	cells() {
		return [] as any[]
	}

} }

namespace $ { export class $mol_perf_uibench_table_cell extends $mol_view {

	/// dom_name \td
	dom_name() {
		return "td"
	}

	/// attr * 
	/// 	^ 
	/// 	class \TableCell
	/// 	data-text <= text -
	attr() {
		return ({
			...super.attr() ,
			"class" :  "TableCell" ,
			"data-text" :  this.text() ,
		})
	}

	/// text \
	text() {
		return ""
	}

	/// event * 
	/// 	^ 
	/// 	click?val <=> event_click?val -
	event() {
		return ({
			...super.event() ,
			"click" :  ( val? : any )=>  this.event_click( val ) ,
		})
	}

	/// event_click?val null
	@ $mol_mem
	event_click( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/// sub / <= text -
	sub() {
		return [].concat( this.text() )
	}

} }

namespace $ { export class $mol_perf_uibench_anim extends $mol_view {

	/// state null
	state() {
		return null as any
	}

	/// attr * 
	/// 	^ 
	/// 	class \Anim
	attr() {
		return ({
			...super.attr() ,
			"class" :  "Anim" ,
		})
	}

	/// sub <= items -
	sub() {
		return this.items()
	}

	/// items /
	items() {
		return [] as any[]
	}

} }

namespace $ { export class $mol_perf_uibench_anim_box extends $mol_view {

	/// attr * 
	/// 	^ 
	/// 	class \AnimBox
	/// 	data-id <= id -
	attr() {
		return ({
			...super.attr() ,
			"class" :  "AnimBox" ,
			"data-id" :  this.id() ,
		})
	}

	/// id \
	id() {
		return ""
	}

	/// style * 
	/// 	^ 
	/// 	borderRadius <= styleRadius - 
	/// 	background <= styleColor -
	style() {
		return ({
			...super.style() ,
			"borderRadius" :  this.styleRadius() ,
			"background" :  this.styleColor() ,
		})
	}

	/// styleRadius \
	styleRadius() {
		return ""
	}

	/// styleColor \
	styleColor() {
		return ""
	}

	/// sub <= items -
	sub() {
		return this.items()
	}

	/// items /
	items() {
		return [] as any[]
	}

} }

namespace $ { export class $mol_perf_uibench_tree extends $mol_view {

	/// state null
	state() {
		return null as any
	}

	/// attr * 
	/// 	^ 
	/// 	class \Tree
	attr() {
		return ({
			...super.attr() ,
			"class" :  "Tree" ,
		})
	}

	/// sub / <= root -
	sub() {
		return [].concat( this.root() )
	}

	/// root $mol_perf_uibench_tree_branch state <= stateRoot -
	@ $mol_mem
	root() {
		return (( obj )=>{
			obj.state = () => this.stateRoot()
			return obj
		})( new this.$.$mol_perf_uibench_tree_branch )
	}

	/// stateRoot null
	stateRoot() {
		return null as any
	}

} }

namespace $ { export class $mol_perf_uibench_tree_branch extends $mol_list {

	/// state null
	state() {
		return null as any
	}

	/// dom_name \ul
	dom_name() {
		return "ul"
	}

	/// attr * 
	/// 	^ 
	/// 	class \TreeNode
	attr() {
		return ({
			...super.attr() ,
			"class" :  "TreeNode" ,
		})
	}

} }

namespace $ { export class $mol_perf_uibench_tree_leaf extends $mol_view {

	/// minimal_height 23
	minimal_height() {
		return 23
	}

	/// dom_name \li
	dom_name() {
		return "li"
	}

	/// attr * 
	/// 	^ 
	/// 	class \TreeLeaf
	attr() {
		return ({
			...super.attr() ,
			"class" :  "TreeLeaf" ,
		})
	}

	/// sub / <= text -
	sub() {
		return [].concat( this.text() )
	}

	/// text \
	text() {
		return ""
	}

} }

