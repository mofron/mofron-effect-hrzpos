/**
 * @file mofron-effect-hrzpos/index.js
 * @brief horizonal position effect for mofron component
 *        the component is positioned specified parameter that is 'center' or 'left' and 'right'.
 * @author simpart
 */
require('mofron-util-transform');
const cmputl = mofron.util.component;
const comutl = mofron.util.common;

module.exports = class extends mofron.class.Effect {
    /**
     * initialize effect
     * 
     * @param (mixed) type parameter
     *                key-value: effect config
     * @param (string) offset parameter
     */
    constructor (p1, p2) {
        try {
            super();
            this.name('HrzPos');
            this.shortForm('type', 'offset');

            /* init config */
            this.confmng().add("offset",{ type: "size" });
            this.confmng().add("type", { type: "string", init: "center" });
            
	    if (0 < arguments.length) {
                this.config(p1, p2);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * effect contents
     * 
     * @param (component) target component
     * @type private
     */
    contents (cmp) {
        try {
	    if (true === comutl.isinc(cmp, "Text")) {
                this.txtpos(cmp);
		return;
	    }
	    let cmp_pos = cmp.style("position");
	    if ("center" === this.type()) {
                if (null === cmp_pos) {
                    cmp.style({ 'display' : 'block' });
		}
                this.mgnpos(cmp);
	    } else {
                if ("relative" === cmp_pos) {
		    this.mgnpos(cmp);
                } else if (("absolute" === cmp_pos) || ("flex" === cmp_pos)) {
                    this.lftpos(cmp);
                } else {
                    if (null === cmp.parent()) {
                        cmp.style({ "position" : "relative" });
			this.mgnpos(cmp);
		    } else {
		        cmp.style({ "position" : "absolute" });
                        this.lftpos(cmp);
		    }
		}
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * text component position
     * 
     * @param (component) target component
     * @type private
     */
    txtpos (cmp) {
        try {
            if ( (null !== cmp.childDom().parent()) &&
                 ('flex' === cmp.childDom().parent().style('display')) ) {
		this.mgnpos(cmp);
            } else if (("absolute" === cmp.style("position")) || ("flex" === cmp.style("position"))) {
	        this.lftpos(cmp);
	    } else {
                cmp.style({ 'text-align': (true === flg) ? this.type() : null });
                if (null !== this.offset()) {
                    let set_style = {};
                    set_style['position']  = 'relative';
                    set_style[this.type()] = this.getValue();
                    cmp.style(set_style);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set margin position
     * 
     * @param (component) target component
     * @type private 
     */
    mgnpos (cmp) {
        try {
	    let off = this.offset();
            if ('center' === this.type()) {
                cmp.style({
                    'margin-right': 'auto', 'margin-left' : 'auto'
                });
                if (null !== off) {
                    cmp.style({ 'position': 'relative', 'left': off.toString() });
                }
                
                //let buf = mf.func.getSize(mf.func.cmpSize(cmp,'width'));
                //let val = eff.getValue(buf.value()/2 + buf.type());
                //cmp.style({
                //    'margin-left' : (true === eff.valid()) ? '50%' : null,
                //    'left'        : '-' + val
                //});
            } else if ('left' === this.type()) {
                cmp.style({
                    'margin-right': 'auto', 'margin-left' : '0rem'
                });
                if (null !== off) {
                    cmp.style({ "margin-left" : off.toString() });
		}
            } else {
                cmp.style({
                    'margin-right': '0rem', 'margin-left' : 'auto'
                });
		if (null !== off) {
                    cmp.style({ "margin-right" : off.toString() });
		}
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * set left position
     * 
     * @param (component) target component
     * @type private
     */
    lftpos (cmp) {
        try {
            let off = this.offset();
            if ('center' === this.type()) {
                cmp.style({ "left" : "50%" });
		let ts = ((null !== off) && ("%" === off.type())) ? comutl.sizesum("-50%",off.toString()) : "-50%";
		cmputl.translate(cmp, ts);
	    } else if ('left' === this.type()) {
	        cmp.style({ "left" : (null !== off) ? off.toString() : "0rem" });
            } else if ('right' === this.type()) {
	        cmp.style({ "right" : (null !== off) ? off.toString() : "0rem" });
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * position type 
     * 
     * @param (string) position type ('center', 'left', 'right')
     * @return (string) position type
     * @type parameter
     */
    type (prm) {
        try {
            if (undefined === prm) {
                return this.confmng("type");
            }
            if (("left" !== prm) && ("center" !== prm) && ("right" !== prm)) {
                throw new Error("invalid parameter");
            }
            this.confmng("type", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * position offset
     * 
     * @param (string (size)) position offset size
     * @return (string (size)) position offset size
     * @type parameter
     */
    offset (prm) {
        try { 
            return this.confmng("offset", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
/* end of file */
