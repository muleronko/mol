namespace $ { export class $mol_perf_render extends $mol_view {

	/// sub / 
	/// 	<= Head - 
	/// 	<= Content -
	sub() {
		return [].concat( this.Head() , this.Content() )
	}

	/// Head $mol_view sub <= head -
	@ $mol_mem
	Head() {
		return (( obj )=>{
			obj.sub = () => this.head()
			return obj
		})( new this.$.$mol_view )
	}

	/// head / 
	/// 	<= Title - 
	/// 	<= Run -
	head() {
		return [].concat( this.Title() , this.Run() )
	}

	/// Title $mol_view 
	/// 	dom_name \h2
	/// 	sub / <= title -
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.dom_name = () => "h2"
			obj.sub = () => [].concat( this.title() )
			return obj
		})( new this.$.$mol_view )
	}

	/// title \$mol
	title() {
		return "$mol"
	}

	/// Run $mol_button_major 
	/// 	dom_name \button
	/// 	sub / <= run_label - 
	/// 	event_click?val <=> event_run?val -
	@ $mol_mem
	Run() {
		return (( obj )=>{
			obj.dom_name = () => "button"
			obj.sub = () => [].concat( this.run_label() )
			obj.event_click = ( val? : any ) => this.event_run( val )
			return obj
		})( new this.$.$mol_button_major )
	}

	/// run_label @ \Run
	run_label() {
		return $mol_locale.text( this.locale_contexts() , "run_label" )
	}

	/// event_run?val null
	@ $mol_mem
	event_run( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/// Content $mol_scroll sub / <= List -
	@ $mol_mem
	Content() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.List() )
			return obj
		})( new this.$.$mol_scroll )
	}

	/// List $mol_list rows <= rows -
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.rows = () => this.rows()
			return obj
		})( new this.$.$mol_list )
	}

	/// rows /
	rows() {
		return [] as any[]
	}

} }

namespace $ { export class $mol_perf_render_row extends $mol_view {

	/// minimal_height 24
	minimal_height() {
		return 24
	}

	/// attr * 
	/// 	^ 
	/// 	mol_perf_render_row_selected <= selected?val -
	attr() {
		return ({
			...super.attr() ,
			"mol_perf_render_row_selected" :  this.selected() ,
		})
	}

	/// selected?val false
	@ $mol_mem
	selected( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : false
	}

	/// event * 
	/// 	^ 
	/// 	click?val <=> event_toggle?val -
	event() {
		return ({
			...super.event() ,
			"click" :  ( val? : any )=>  this.event_toggle( val ) ,
		})
	}

	/// event_toggle?val null
	@ $mol_mem
	event_toggle( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/// sub / <= Bar -
	sub() {
		return [].concat( this.Bar() )
	}

	/// Bar $mol_view sub / <= label -
	@ $mol_mem
	Bar() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.label() )
			return obj
		})( new this.$.$mol_view )
	}

	/// label \
	label() {
		return ""
	}

} }

