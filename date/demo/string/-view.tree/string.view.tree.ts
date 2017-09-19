namespace $ { export class $mol_date_demo_string extends $mol_demo_small {

	/// sub / 
	/// 	<= Date_label - 
	/// 	<= String_label -
	sub() {
		return [].concat( this.Date_label() , this.String_label() )
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

	/// Date $mol_date value <= date -
	@ $mol_mem
	Date() {
		return (( obj )=>{
			obj.value = () => this.date()
			return obj
		})( new this.$.$mol_date )
	}

	/// String_label $mol_labeler 
	/// 	title <= string_label - 
	/// 	content <= String -
	@ $mol_mem
	String_label() {
		return (( obj )=>{
			obj.title = () => this.string_label()
			obj.content = () => this.String()
			return obj
		})( new this.$.$mol_labeler )
	}

	/// string_label \String
	string_label() {
		return "String"
	}

	/// String $mol_string value?val <=> date?val -
	@ $mol_mem
	String() {
		return (( obj )=>{
			obj.value = ( val? : any ) => this.date( val )
			return obj
		})( new this.$.$mol_string )
	}

	/// date?val \2017-04-01
	@ $mol_mem
	date( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : "2017-04-01"
	}

} }

