namespace JSX {
	export interface Element extends HTMLElement {}
	export interface ElementClass { render() : Element }
	export interface IntrinsicElements { [ key : string ] : { [ prop : string ] : any } }
	export interface ElementAttributesProperty { props : {} }
}

namespace $ {
	
	export function $mol_dom_jsx< Props >(
		Elem : string | { ( props : Props ) : Element } | { new( props : Props ) : { render() : Element } } ,
		props : Props ,
		...children : Array< Node | string >
	) {
		let node : Element
		if( typeof Elem === 'string' ) {

			node = $mol_dom_make( props && props['id'] , Elem )
			$mol_dom_render_children( node , [].concat.apply( [] , children ) )
			$mol_dom_render_fields( node , props )
			
		} else if( typeof Elem === 'function' ) {
			
			const props2 = props as any
			node = new ( Elem as any )({ childNodes : children , ... props2 })
			if( node['render'] ) node = node['render']()

		}
		
		return node
	}
	
}
