/**
 * @file mofron-effect-hrzpos/index.js
 * @author simpart
 */
const mf = require('mofron');
/**
 * @class mofron.effect.Position
 * @brief horizon position of component effect class
 */
mf.effect.HrzPos = class extends mf.Effect {
    
    /**
     * initialize effect
     *
     * @param p1 (object) effect option
     * @param p1 (string) type function parameter
     * @param p2 (string) offset function parameter
     */
    constructor (po, p2) {
        try {
            super();
            this.name('HrzPos');
            this.prmMap(['type', 'offset']);
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * effect contents
     *
     * @note private method
     */
    contents (cmp) {
        try {
console.log("cmp");
            let flg = this.valid();
            if (null !== this.contsIndex()) {
                this.contsList(this.contsIndex())(this, cmp);
                return;
            }
            
            if (true === mf.func.isInclude(cmp, 'Text')) {
                this.textPos(cmp, flg);
            } else {
                this.otherPos(cmp, flg);
            }
            super.contents(flg, cmp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * execute text component position
     * 
     * @note private method
     */
    textPos (cmp, flg) {
        try {
            
            if ( (null !== cmp.target().parent()) &&
                 ('flex' === cmp.target().parent().style('display')) ) {
                this.contsList(0)(this, cmp);
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
     * execute other component position
     *
     * @note private method
     */
    otherPos (cmp, flg) {
        try {
            let set_val = null;
            if ('center' === this.type()) {
                this.otherPosCenter(cmp, flg);
            } else if ( ("left" === this.type()) || ("right" === this.type()) ) {
                if ("relative" === cmp.style('position')) {
                    this.contsList(0)(this, cmp);
                } else {
                    this.contsList(1)(this, cmp);
                }
            } 
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * execute other component center position
     *
     * @note private method
     */
    otherPosCenter (cmp, flg) {
        try {
            if (null === cmp.parent()) {
                cmp.parentLitener(
                    (p1, p2) => {
                        try { p2.execute(); } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    this
                );
            } else if (null !== cmp.style('position')) {
                this.contsList(2)(this, cmp);
            // else if (null !== cmp.style('position')) {
            // else if ( (null !== cmp.sizeValue('width')) &&
             //           (null !== cmp.parent().sizeValue('width')) &&
             //           ('%' === cmp.parent().sizeValue('width').type()) &&
             //           (0  !== cmp.parent().sizeValue('width').value()) ) {
             //   cmp.style({
             //       'position'    : 'relative',
             //       'margin-left' : (true === flg) ? '50%' : null,
             //       'left'        : '-' + this.getValue(cmp.sizeValue('width').value()/2 + cmp.sizeValue('width').type())
             //   });
            } else {
                cmp.style({ 'display' : (true === flg) ? 'block' : null });
                this.contsList(0)(this, cmp);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter position type 
     * 
     * @param p1 ('center', 'left', 'right') set position type
     * @param p1 (undefind) call as getter
     * @return (string) position type
     */
    type (prm) {
        try { return this.member('type', ['center', 'left', 'right'], prm, 'center'); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getValue (prm) {
        try {
            let val = '0' + this.valType();
            if (undefined !== prm) {
                val = mf.func.getSize(prm);
                if (null === val) {
                    throw new Error('invalid paramter');
                }
                this.valType(val.type());
            }
            
            if (null !== this.offset()) {
                try {
                    return mf.func.sizeSum(val, this.offset());
                } catch (e) {
                    return val;
                }
            } else {
                return val;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    valType (prm) {
        try { return this.member('valType', 'string', prm, 'rem'); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contsIndex (prm) {
        try { return this.member('contsIndex', 'number', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contsList (idx) {
        try {
            let conts = [
                (eff, cmp) => {
                    try {
                        if ('center' === eff.type()) {
                            cmp.style({
                                'margin-right': (true === eff.valid()) ? 'auto' : null,
                                'margin-left' : (true === eff.valid()) ? 'auto' : null
                            });
                            if (null !== eff.offset()) {
                                cmp.style({ 'position': 'relative', 'left': eff.offset() });
                            }
                        } else if ('left' === eff.type()) {
                            cmp.style({
                                'margin-right': (true === eff.valid()) ? 'auto' : null,
                                'margin-left' : (true === eff.valid()) ? eff.getValue() : null
                            });
                        } else {
                            cmp.style({
                                'margin-right': (true === eff.valid()) ? eff.getValue() : null,
                                'margin-left' : (true === eff.valid()) ? 'auto' : null
                            });
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                (eff, cmp) => {
                    try {
                        if ('left' === eff.type()) {
                            cmp.style({ 'left' : (true === eff.valid()) ? eff.getValue() : null });
                        } else if ('right' === eff.type()) {
                            cmp.style({ 'right': (true === eff.valid()) ? eff.getValue() : null });
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                (eff, cmp) => {
                    try {
                        let val = eff.getValue(cmp.sizeValue('width').value()/2 + cmp.sizeValue('width').type());
                        cmp.style({
                            'margin-left' : (true === eff.valid()) ? '50%' : null,
                            'left'        : '-' + val
                        });
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            ];
            return conts[idx];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter offset position
     * 
     * @param p1 (string) size value of css
     * @param p1 (undefined) call as getter
     * @return (string) size value of css
     */
    offset (prm) {
        try { return this.member('offset', 'string', prm, null); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    valid (prm) {
        try { return this.member('valid', 'boolean', prm, true); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.effect.HrzPos;
/* end of file */
