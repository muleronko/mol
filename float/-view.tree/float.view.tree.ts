namespace $ { export class $mol_float extends $mol_view {

	/// style * 
	/// 	^ 
	/// 	transform <= shiftStyle -
	style() {
		return ({
			...super.style() ,
			"transform" :  this.shiftStyle() ,
		})
	}

	/// shiftStyle \
	shiftStyle() {
		return ""
	}

	/// attr * 
	/// 	^ 
	/// 	mol_float_scrolling <= scrolling -
	attr() {
		return ({
			...super.attr() ,
			"mol_float_scrolling" :  this.scrolling() ,
		})
	}

	/// scrolling false
	scrolling() {
		return false
	}

} }

