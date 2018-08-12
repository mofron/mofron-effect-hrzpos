/**
 * @file mofron-effect-position/index.js
 * @author simpart
 */

/**
 * @class mofron.effect.Position
 * @brief horizon position of component effect class
 */
mofron.effect.HrzPos = class extends mofron.Effect {
    
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
            if (true === mofron.func.isInclude(cmp, 'Text')) {
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
                cmp.style({
                    'margin-right' : (true === flg) ? 'auto' : null,
                    'margin-left'  : (true === flg) ? 'auto' : null
                });
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
            if (true === mofron.func.isInclude(cmp, 'Text')) {
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
module.exports = mofron.effect.HrzPos;
/* end of file */
