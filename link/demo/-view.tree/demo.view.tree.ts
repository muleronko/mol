namespace $ { export class $mol_link_demo extends $mol_demo_small {

	/// title @ \Some hyperlinks
	title() {
		return $mol_locale.text( this.locale_contexts() , "title" )
	}

	/// sub / 
	/// 	<= This - 
	/// 	<= Red - 
	/// 	<= Green - 
	/// 	<= Blue - 
	/// 	<= External -
	sub() {
		return [].concat( this.This() , this.Red() , this.Green() , this.Blue() , this.External() )
	}

	/// This $mol_link sub / <= This_label -
	@ $mol_mem
	This() {
		return (( obj )=>{
			obj.sub = () => [].concat( this.This_label() )
			return obj
		})( new this.$.$mol_link )
	}

	/// This_label @ \This page
	This_label() {
		return $mol_locale.text( this.locale_contexts() , "This_label" )
	}

	/// Red $mol_link 
	/// 	arg * color \red
	/// 	sub / <= Red_label -
	@ $mol_mem
	Red() {
		return (( obj )=>{
			obj.arg = () => ({
			"color" :  "red" ,
		})
			obj.sub = () => [].concat( this.Red_label() )
			return obj
		})( new this.$.$mol_link )
	}

	/// Red_label @ \Red
	Red_label() {
		return $mol_locale.text( this.locale_contexts() , "Red_label" )
	}

	/// Green $mol_link 
	/// 	arg * color \green
	/// 	sub / <= Green_label -
	@ $mol_mem
	Green() {
		return (( obj )=>{
			obj.arg = () => ({
			"color" :  "green" ,
		})
			obj.sub = () => [].concat( this.Green_label() )
			return obj
		})( new this.$.$mol_link )
	}

	/// Green_label @ \Green
	Green_label() {
		return $mol_locale.text( this.locale_contexts() , "Green_label" )
	}

	/// Blue $mol_link 
	/// 	arg * color \blue
	/// 	sub / <= Blue_label -
	@ $mol_mem
	Blue() {
		return (( obj )=>{
			obj.arg = () => ({
			"color" :  "blue" ,
		})
			obj.sub = () => [].concat( this.Blue_label() )
			return obj
		})( new this.$.$mol_link )
	}

	/// Blue_label @ \Blue
	Blue_label() {
		return $mol_locale.text( this.locale_contexts() , "Blue_label" )
	}

	/// External $mol_link 
	/// 	uri \http://example.org
	/// 	title \example.org
	/// 	hint <= External_hint -
	@ $mol_mem
	External() {
		return (( obj )=>{
			obj.uri = () => "http://example.org"
			obj.title = () => "example.org"
			obj.hint = () => this.External_hint()
			return obj
		})( new this.$.$mol_link )
	}

	/// External_hint @ \external link
	External_hint() {
		return $mol_locale.text( this.locale_contexts() , "External_hint" )
	}

} }

