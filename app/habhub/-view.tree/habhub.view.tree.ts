namespace $ { export class $mol_app_habhub extends $mol_book {

	/// pages / 
	/// 	<= Placeholder - 
	/// 	<= Menu_page - 
	/// 	<= Details -
	pages() {
		return [].concat( this.Placeholder() , this.Menu_page() , this.Details() )
	}

	/// Placeholder $mol_book_placeholder 
	/// 	minimal_width 600 
	/// 	title <= title_default -
	@ $mol_mem
	Placeholder() {
		return (( obj )=>{
			obj.minimal_width = () => 600
			obj.title = () => this.title_default()
			return obj
		})( new this.$.$mol_book_placeholder )
	}

	/// Menu_page $mol_page 
	/// 	minimal_width 400 
	/// 	title <= title_default - 
	/// 	body / <= Menu -
	@ $mol_mem
	Menu_page() {
		return (( obj )=>{
			obj.minimal_width = () => 400
			obj.title = () => this.title_default()
			obj.body = () => [].concat( this.Menu() )
			return obj
		})( new this.$.$mol_page )
	}

	/// title_default \HabHub
	title_default() {
		return "HabHub"
	}

	/// Menu $mol_list rows <= menu_rows -
	@ $mol_mem
	Menu() {
		return (( obj )=>{
			obj.rows = () => this.menu_rows()
			return obj
		})( new this.$.$mol_list )
	}

	/// menu_rows /
	menu_rows() {
		return [] as any[]
	}

	/// Details $mol_page 
	/// 	minimal_width 600 
	/// 	title <= gist_current_title - 
	/// 	event_top?val <=> event_front_up?val - 
	/// 	tools / <= Close - 
	/// 	body_scroll_top?val <=> details_scroll_top?val - 
	/// 	body / <= Datails_text -
	@ $mol_mem
	Details() {
		return (( obj )=>{
			obj.minimal_width = () => 600
			obj.title = () => this.gist_current_title()
			obj.event_top = ( val? : any ) => this.event_front_up( val )
			obj.tools = () => [].concat( this.Close() )
			obj.body_scroll_top = ( val? : any ) => this.details_scroll_top( val )
			obj.body = () => [].concat( this.Datails_text() )
			return obj
		})( new this.$.$mol_page )
	}

	/// gist_current_title \
	gist_current_title() {
		return ""
	}

	/// Close $mol_link 
	/// 	arg <= close_arg - 
	/// 	sub / <= Close_icon -
	@ $mol_mem
	Close() {
		return (( obj )=>{
			obj.arg = () => this.close_arg()
			obj.sub = () => [].concat( this.Close_icon() )
			return obj
		})( new this.$.$mol_link )
	}

	/// close_arg * gist null
	close_arg() {
		return ({
			"gist" :  null as any ,
		})
	}

	/// Close_icon $mol_icon_cross
	@ $mol_mem
	Close_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross )
	}

	/// details_scroll_top?val 0
	@ $mol_mem
	details_scroll_top( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/// Datails_text $mol_text text <= gist_current_content -
	@ $mol_mem
	Datails_text() {
		return (( obj )=>{
			obj.text = () => this.gist_current_content()
			return obj
		})( new this.$.$mol_text )
	}

	/// gist_current_content \
	gist_current_content() {
		return ""
	}

	/// Menu_row!id $mol_link 
	/// 	title <= gist_title!id - 
	/// 	arg <= gist_arg!id -
	@ $mol_mem_key
	Menu_row( id : any ) {
		return (( obj )=>{
			obj.title = () => this.gist_title(id)
			obj.arg = () => this.gist_arg(id)
			return obj
		})( new this.$.$mol_link )
	}

	/// gist_title!id \
	gist_title( id : any ) {
		return ""
	}

	/// gist_arg!id *
	gist_arg( id : any ) {
		return ({
		})
	}

} }

