namespace $ { export class $mol_icon_demo extends $mol_demo_small {

	/// title @ \All $mol icons
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// sub <= icons -
	sub() {
		return this.icons()
	}

	/// icons /
	icons() {
		return [] as any[]
	}

} }

