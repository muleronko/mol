namespace $ { export class $mol_date_demo_timestamp extends $mol_demo_small {

	/// sub / 
	/// 	<= Date_label - 
	/// 	<= Timestamp_label -
	sub() {
		return [].concat( this.Date_label() , this.Timestamp_label() )
	}

	/// Date_label $mol_labeler 
	/// 	title <= date_label - 
	/// 	content <= Date -
	@ $mol_mem
	Date_label() {
		return (( obj )=>{
			obj.title = () => this.date_label()
			obj.content = () => this.Date()
			return obj
		})( new this.$.$mol_labeler )
	}

	/// date_label \Date
	date_label() {
		return "Date"
	}

	/// Date $mol_date value_number?val <=> msec?val -
	@ $mol_mem
	Date() {
		return (( obj )=>{
			obj.value_number = ( val? : any ) => this.msec( val )
			return obj
		})( new this.$.$mol_date )
	}

	/// msec?val NaN
	@ $mol_mem
	msec( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : NaN
	}

	/// Timestamp_label $mol_labeler 
	/// 	title <= timestamp_label - 
	/// 	content <= Msec -
	@ $mol_mem
	Timestamp_label() {
		return (( obj )=>{
			obj.title = () => this.timestamp_label()
			obj.content = () => this.Msec()
			return obj
		})( new this.$.$mol_labeler )
	}

	/// timestamp_label \Timestamp
	timestamp_label() {
		return "Timestamp"
	}

	/// Msec $mol_number 
	/// 	value?val <=> msec?val - 
	/// 	precision_change 86400000
	@ $mol_mem
	Msec() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.msec( val )
			obj.precision_change = () => 86400000
			return obj
		})( new this.$.$mol_number )
	}

} }

