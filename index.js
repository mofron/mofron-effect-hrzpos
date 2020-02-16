/**
 * @file mofron-effect-hrzpos/index.js
 * @brief horizonal position effect for mofron component
 *        the component is positioned specified parameter that is 'center' or 'left' and 'right'.
 * @license MIT
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
     * @short type,offset
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.name('HrzPos');
            this.shortForm('type', 'offset');
            /* init config */
            this.confmng().add("offset",{ type: "size" });
            this.confmng().add("type", { type: "string", init: "center", select: ["center", "left", "right"] });
            /* set config */
	    if (undefined !== prm) {
                this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * effect contents
     * 
     * @param (mofron.class.Component) effect target component
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
     * @param (mofron-comp-text) effect target component
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
                cmp.style({ 'text-align': this.type() });
                if (null !== this.offset()) {
                    cmp.style({
                        'position' : 'relative',
                        'left'     : this.offset().toString()
		    });
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
     * @param (mofron.class.Component) effect target component
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
     * @param (mofron.class.Component) effect target component
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
     * position type setter/getter
     * 
     * @param (string) set position type ('center','left','right')
     *                 undefind: call as getter
     * @return (string) position type
     * @type parameter
     */
    type (prm) {
        try {
            return this.confmng("type", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * position offset setter/getter
     * 
     * @param (string(size)) position offset size
     *                       undefined: call as getter
     * @return (mixed) string(size): position offset size
     *                 null: not set
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
