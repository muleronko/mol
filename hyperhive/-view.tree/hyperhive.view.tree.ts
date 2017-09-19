namespace $ { export class $mol_hyperhive extends $mol_object {

	/// host \
	host() {
		return ""
	}

	/// version \
	version() {
		return ""
	}

	/// environment \
	environment() {
		return ""
	}

	/// project \
	project() {
		return ""
	}

	/// application \
	application() {
		return ""
	}

	/// device \
	device() {
		return ""
	}

	/// login?val \
	@ $mol_mem
	login( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// password?val \
	@ $mol_mem
	password( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// initialized false
	initialized() {
		return false
	}

	/// authentificated false
	authentificated() {
		return false
	}

	/// data!table /
	data( table : any ) {
		return [] as any[]
	}

} }

