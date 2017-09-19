namespace $ { export class $mol_suggest extends $mol_search {

	/// query?val <=> value?val -
	@ $mol_mem
	query( val? : any , force? : $mol_atom_force ) {
		return this.value( val )
	}

	/// value?val \
	@ $mol_mem
	value( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

} }

