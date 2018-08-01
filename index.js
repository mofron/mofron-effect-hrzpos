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
                cmp.style({
                    'text-align' : this.type()
                });
                return;
            }
            
            if ('left' === this.type()) {
                cmp.style({
                    'margin-right' : 'auto',
                    'margin-left'  : '0px'
                });
            } else if ('center' === this.type()) {
                cmp.style({
                    'margin-right' : 'auto',
                    'margin-left'  : 'auto'
                });
            } else if ('right' === this.type()) {
                cmp.style({
                    'margin-right' : '0px',
                    'margin-left'  : 'auto'
                });
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    disable (cmp) {
        try {
            if (true === mofron.func.isInclude(cmp, 'Text')) {
                cmp.style({
                    'text-align' : null
                });
            } else {
                cmp.style({
                    'margin-right' : null,
                    'margin-left'  : null
                });
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
