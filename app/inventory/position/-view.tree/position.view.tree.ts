namespace $ { export class $mol_app_inventory_position extends $mol_row {

	/// position null
	position() {
		return null as any
	}

	/// sub / 
	/// 	<= Product - 
	/// 	<= Count - 
	/// 	<= Status -
	sub() {
		return [].concat( this.Product() , this.Count() , this.Status() )
	}

	/// Product $mol_view sub / 
	/// 	<= Title - 
	/// 	<= Description -
	@ $mol_mem
	Product() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.Title() , this.Description() )
			return obj
		})( new this.$.$mol_view )
	}

	/// Title $mol_view sub / <= title -
	@ $mol_mem
	Title() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.title() )
			return obj
		})( new this.$.$mol_view )
	}

	/// title \
	title() {
		return ""
	}

	/// Description $mol_view sub / <= description -
	@ $mol_mem
	Description() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.description() )
			return obj
		})( new this.$.$mol_view )
	}

	/// description \
	description() {
		return ""
	}

	/// Count $mol_number 
	/// 	enabled <= count_editable - 
	/// 	value?val <=> count?val -
	@ $mol_mem
	Count() {
		return (( obj )=>{
			obj.enabled = () => this.count_editable()
			obj.value = ( val? : any ) => this.count( val )
			return obj
		})( new this.$.$mol_number )
	}

	/// count_editable true
	count_editable() {
		return true
	}

	/// count?val 0
	@ $mol_mem
	count( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/// Status $mol_switch 
	/// 	value?val <=> status?val - 
	/// 	options * 
	/// 		pending <= status_label_pending - 
	/// 		approved <= status_label_approved - 
	/// 		rejected <= status_label_rejected -
	@ $mol_mem
	Status() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.status( val )
			obj.options = () => ({
			"pending" :  this.status_label_pending() ,
			"approved" :  this.status_label_approved() ,
			"rejected" :  this.status_label_rejected() ,
		})
			return obj
		})( new this.$.$mol_switch )
	}

	/// status?val null
	@ $mol_mem
	status( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : null as any
	}

	/// status_label_pending @ \Pending
	status_label_pending() {
		return $mol_locale.text( this.locale_contexts() , "status_label_pending" )
	}

	/// status_label_approved @ \Approved
	status_label_approved() {
		return $mol_locale.text( this.locale_contexts() , "status_label_approved" )
	}

	/// status_label_rejected @ \Rejected
	status_label_rejected() {
		return $mol_locale.text( this.locale_contexts() , "status_label_rejected" )
	}

} }

