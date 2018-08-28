/**
 * @file mofron-effect-position/index.js
 * @author simpart
 */
const mf = require('mofron');
/**
 * @class mofron.effect.Position
 * @brief horizon position of component effect class
 */
mf.effect.HrzPos = class extends mf.Effect {
    
    constructor (po) {
        try {
            super();
            this.name('HrzPos');
            this.prmMap('type');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (cmp) {
        try {
            if (true === mf.func.isInclude(cmp, 'Text')) {
                this.text(cmp,true);
            } else {
                this.other(cmp, true);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (cmp, flg) {
        try {
            if ((null !== cmp.target().parent()) && ('flex' === cmp.target().parent().style('display'))) {
                if ('center' === this.type()) {
                    cmp.style({
                        'margin-right' : (true === flg) ? 'auto' : null,
                        'margin-left'  : (true === flg) ? 'auto' : null
                    });
                }
            } else {
                cmp.style({
                    'text-align' : (true === flg) ? this.type() : null
                });
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    other (cmp, flg) {
        try {
            if ('left' === this.type()) {
                if ('absolute' === cmp.style('position')) {
                    cmp.style({
                        'left' : (true === flg) ? '0' + cmp.sizeType() : null,
                    });
                } else {
                    cmp.style({
                        'margin-right' : (true === flg) ? 'auto' : null,
                        'margin-left'  : (true === flg) ? '0' + cmp.sizeType() : null
                    });
                }
            } else if ('center' === this.type()) {
                
                if (null === cmp.parent()) {
                    cmp.parentLitener(
                        (p1, p2) => {
                            try {
                                p2.execute();
                            } catch (e) {
                                console.error(e.stack);
                                throw e;
                            }
                        },
                        this
                    );
                } else if ( ('%' === mf.func.getSize(cmp.parent().width())[1]) ||
                            (0 !== mf.func.getSize(cmp.width())[0]) ) {
                    let wid = mf.func.getSize(cmp.width());
                    cmp.style({
                        'position'    : 'relative',
                        'margin-left' : '50%',
                        'left'        : '-' + wid[0]/2 + wid[1]
                    });
                } else {
                    cmp.style({
                        'margin-right' : (true === flg) ? 'auto' : null,
                        'margin-left'  : (true === flg) ? 'auto' : null
                    });
                }
            } else if ('right' === this.type()) {
                if ('absolute' === cmp.style('position')) {
                    cmp.style({
                        'right' : (true === flg) ? '0' + cmp.sizeType() : null,
                    });
                } else {
                    cmp.style({
                        'margin-right' : (true === flg) ? '0' + cmp.sizeType()  : null,
                        'margin-left'  : (true === flg) ? 'auto' : null
                    });
                }
            } 
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    disable (cmp) {
        try {
            if (true === mf.func.isInclude(cmp, 'Text')) {
                this.text(cmp, false);
            } else {
                this.other(cmp, false);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    type (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_type) ? 'center' : this.m_type;
            }
            /* setter */
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            if ( ('left'   !== prm) &&
                 ('center' !== prm) &&
                 ('right'  !== prm) ) {
                throw new Error('invalid parameter');
            }
            this.m_type = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.effect.HrzPos;
/* end of file */
