namespace $ { export class $mol_app_inventory extends $mol_view {

	/// domain $mol_app_inventory_domain
	@ $mol_mem
	domain() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_app_inventory_domain )
	}

	/// sub / <= Page -
	sub() {
		return [].concat( this.Page() )
	}

	/// Page null
	Page() {
		return null as any
	}

	/// Head $mol_app_inventory_head 
	/// 	keeper_show <= can_write_off - 
	/// 	control_show <= can_approve -
	@ $mol_mem
	Head() {
		return (( obj )=>{
			obj.keeper_show = () => this.can_write_off()
			obj.control_show = () => this.can_approve()
			return obj
		})( new this.$.$mol_app_inventory_head )
	}

	/// can_write_off false
	can_write_off() {
		return false
	}

	/// can_approve false
	can_approve() {
		return false
	}

	/// Enter $mol_app_inventory_enter domain <= domain -
	@ $mol_mem
	Enter() {
		return (( obj )=>{
			obj.domain = () => this.domain()
			return obj
		})( new this.$.$mol_app_inventory_enter )
	}

	/// Controller $mol_app_inventory_controller 
	/// 	Head <= Head - 
	/// 	domain <= domain -
	@ $mol_mem
	Controller() {
		return (( obj )=>{
			obj.Head = () => this.Head()
			obj.domain = () => this.domain()
			return obj
		})( new this.$.$mol_app_inventory_controller )
	}

	/// Keeper $mol_app_inventory_keeper 
	/// 	Head <= Head - 
	/// 	domain <= domain -
	@ $mol_mem
	Keeper() {
		return (( obj )=>{
			obj.Head = () => this.Head()
			obj.domain = () => this.domain()
			return obj
		})( new this.$.$mol_app_inventory_keeper )
	}

	/// Stats $mol_app_inventory_stats 
	/// 	Head <= Head - 
	/// 	domain <= domain -
	@ $mol_mem
	Stats() {
		return (( obj )=>{
			obj.Head = () => this.Head()
			obj.domain = () => this.domain()
			return obj
		})( new this.$.$mol_app_inventory_stats )
	}

} }

namespace $ { export class $mol_app_inventory_head extends $mol_row {

	/// keeper_show false
	keeper_show() {
		return false
	}

	/// control_show false
	control_show() {
		return false
	}

	/// sub / 
	/// 	<= Keeper_link - 
	/// 	<= Control_link - 
	/// 	<= Stats_link -
	sub() {
		return [].concat( this.Keeper_link() , this.Control_link() , this.Stats_link() )
	}

	/// Keeper_link $mol_link 
	/// 	arg * page \keeper
	/// 	sub / <= keeper_label -
	@ $mol_mem
	Keeper_link() {
		return (( obj )=>{
			obj.arg = () => ({
			"page" :  "keeper" ,
		})
			obj.sub = () => [].concat( this.keeper_label() )
			return obj
		})( new this.$.$mol_link )
	}

	/// keeper_label @ \Keeper
	keeper_label() {
		return $mol_locale.text( this.locale_contexts() , "keeper_label" )
	}

	/// Control_link $mol_link 
	/// 	arg * page \controller
	/// 	sub / <= control_label -
	@ $mol_mem
	Control_link() {
		return (( obj )=>{
			obj.arg = () => ({
			"page" :  "controller" ,
		})
			obj.sub = () => [].concat( this.control_label() )
			return obj
		})( new this.$.$mol_link )
	}

	/// control_label @ \Controller
	control_label() {
		return $mol_locale.text( this.locale_contexts() , "control_label" )
	}

	/// Stats_link $mol_link 
	/// 	arg * page \stats
	/// 	sub / <= stats_label -
	@ $mol_mem
	Stats_link() {
		return (( obj )=>{
			obj.arg = () => ({
			"page" :  "stats" ,
		})
			obj.sub = () => [].concat( this.stats_label() )
			return obj
		})( new this.$.$mol_link )
	}

	/// stats_label @ \Stats
	stats_label() {
		return $mol_locale.text( this.locale_contexts() , "stats_label" )
	}

} }

