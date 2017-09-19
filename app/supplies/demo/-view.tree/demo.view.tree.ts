namespace $ { export class $mol_app_supplies_demo extends $mol_demo_large {

	/// title @ \Supplies approving business process
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// sub / <= App -
	sub() {
		return [].concat( this.App() )
	}

	/// App $mol_app_supplies_root entered true
	@ $mol_mem
	App() {
		return (( obj )=>{
			obj.entered = () => true
			return obj
		})( new this.$.$mol_app_supplies_root )
	}

} }

