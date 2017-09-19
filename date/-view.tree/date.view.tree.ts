namespace $ { export class $mol_date extends $mol_string {

	/// type \date
	type() {
		return "date"
	}

	/// value_number?val NaN
	@ $mol_mem
	value_number( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : NaN
	}

	/// value_moment?val $mol_time_moment
	@ $mol_mem
	value_moment( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : (( obj )=>{
			return obj
		})( new this.$.$mol_time_moment )
	}

} }

