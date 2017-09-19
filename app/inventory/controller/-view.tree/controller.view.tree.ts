namespace $ { export class $mol_app_inventory_controller extends $mol_page {

	/// domain $mol_app_inventory_domain
	@ $mol_mem
	domain() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_app_inventory_domain )
	}

	/// body <= position_rows -
	body() {
		return this.position_rows()
	}

	/// position_rows /
	position_rows() {
		return [] as any[]
	}

	/// Position_row!id $mol_app_inventory_position 
	/// 	count_editable false 
	/// 	position <= position!id -
	@ $mol_mem_key
	Position_row( id : any ) {
		return (( obj )=>{
			obj.count_editable = () => false
			obj.position = () => this.position(id)
			return obj
		})( new this.$.$mol_app_inventory_position )
	}

	/// position!id null
	position( id : any ) {
		return null as any
	}

	/// foot / <= Controls_row -
	foot() {
		return [].concat( this.Controls_row() )
	}

	/// Controls_row $mol_row sub / <= Sweep -
	@ $mol_mem
	Controls_row() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Sweep() )
			return obj
		})( new this.$.$mol_row )
	}

	/// Sweep $mol_button_major 
	/// 	event_click?event <=> event_sweep?event - 
	/// 	sub / <= submit_label -
	@ $mol_mem
	Sweep() {
		return (( obj )=>{
			obj.event_click = ( event? : any ) => this.event_sweep( event )
			obj.sub = () => [].concat( this.submit_label() )
			return obj
		})( new this.$.$mol_button_major )
	}

	/// event_sweep?event null
	@ $mol_mem
	event_sweep( event? : any , force? : $mol_atom_force ) {
		return ( event !== void 0 ) ? event : null as any
	}

	/// submit_label @ \Sweep approved
	submit_label() {
		return $mol_locale.text( this.locale_contexts() , "submit_label" )
	}

} }

