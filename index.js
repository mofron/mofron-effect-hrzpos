/**
 * @file mofron-effect-hrzpos/index.js
 * @brief horizonal position effect for mofron component
 *        the component is positioned specified parameter that is 'center' or 'left' and 'right'.
 * @license MIT
 */
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
    constructor (p1,p2) {
        try {
            super();
            this.name('HrzPos');
            this.shortForm('type', 'offset');
            /* init config */
            this.confmng().add("offset",{ type: "size" });
            this.confmng().add("type", { type: "string", init: "center", select: ["center", "left", "right"] });
            /* set config */
	    this.innerTgt(false);
	    if (0 < arguments.length) {
                this.config(p1,p2);
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
	    let rdom = cmp.rootDom();
            for (let ridx in rdom) {
                if (true === comutl.isinc(cmp, "Text")) {
		    /* set text component position */
                    this.txtpos(rdom[ridx]);
		    continue;
                }
                /* set other component position */
	        let cmp_pos = rdom[ridx].style("position");
	        if ("center" === this.type()) {
		    if (("fixed" === cmp_pos) || ("absolute" === cmp_pos)) {
                        this.lftpos(rdom[ridx]);
		    } else {
		        rdom[ridx].style({ "display" : "block" });
                        this.mgnpos(rdom[ridx]);
		    }
	        } else {
                    if ("relative" === cmp_pos) {
		        this.mgnpos(rdom[ridx]);
                    } else if (("absolute" === cmp_pos) || ("fixed" === cmp_pos)) {
                        this.lftpos(rdom[ridx]);
                    } else {
                        if (null !== cmp.parent()) {
		            rdom[ridx].style({ "position" : "relative" });
	                    this.mgnpos(rdom[ridx]);
		        } else {
		            rdom[ridx].style({ "position" : "absolute" });
                            this.lftpos(rdom[ridx]);
		        }
		    }
	        }

		if ( ("flex" === rdom[ridx].parent().style("display")) ||
		     ("flex" === cmputl.dispbuff(rdom[ridx].parent())) ) {
                    break;
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
     * @param (mofron.class.Dom) dom objedt
     * @type private
     */
    txtpos (dom) {
        try {
	    
            if ( (null !== dom.parent()) &&
	         (("flex" === dom.parent().style("display")) || ("flex" === cmputl.dispbuff(dom.parent()))) ) {
		this.mgnpos(dom);
            } else if (("absolute" === dom.style("position")) || ("flex" === dom.style("position"))) {
	        this.lftpos(dom);
	    } else {
                dom.style({ 'text-align': this.type() });
                if (null !== this.offset()) {
		    dom.style({ "position": "relative" });
		    if ("right" !== this.type()) {
		        dom.style({ "left": this.offset() });
		    } else {
                        dom.style({ "right": this.offset() });
		    }
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
     * @param (mofron.class.Dom) dom object
     * @type private
     */
    mgnpos (dom) {
        try {
	    let off = this.offset();
            if ('center' === this.type()) {
                dom.style({ "margin-right": "auto", "margin-left": "auto" });
                if (null !== off) {
                    dom.style({ "position": "relative", "left": off });
                }
            } else if ('left' === this.type()) {
                dom.style({ "margin-right": "auto", "margin-left" : "0rem" });
                if (null !== off) {
                    dom.style({ "margin-left" : off });
		}
            } else {
                dom.style({ "margin-right": "0rem", "margin-left" : "auto" });
		if (null !== off) {
                    dom.style({ "margin-right" : off });
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
     * @param (mofron.class.Dom) dom object
     * @type private
     */
    lftpos (dom) {
        try {
            let off = this.offset();
            if ('center' === this.type()) {
                dom.style({ "left" : "50%" });
		if ((null === off) || ("%" !== comutl.sizetype(off))) {
		    dom.style({ "transform" : "translateX(-50%)" }, { bpref : true });
		} else {
		    dom.style({ "transform" : "translateX("+ comutl.sizesum("-50%",off) +")" }, { bpref : true });
		}
	    } else if ('left' === this.type()) {
	        dom.style({ "left" : (null !== off) ? off : "0rem" });
            } else if ('right' === this.type()) {
	        dom.style({ "right" : (null !== off) ? off : "0rem" });
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
