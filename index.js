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
            this.prmOpt(po);
            
            this.getParam().check(
                (pos) => {
                    try {
                        if ('string' !== typeof pos) {
                            throw new Error('invalid parameter');
                        }
                        if ( ('left'   !== pos) &&
                             ('center' !== pos) &&
                             ('right'  !== pos) ) {
                            throw new Error('invalid parameter');
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (cmp) {
        try {
            let type = this.value()[0];
            if ('left' === type) {
                cmp.style({
                    'margin-right' : 'auto',
                    'margin-left'  : '0px'
                });
            } else if ('center' === type) {
                cmp.style({
                    'margin-right' : 'auto',
                    'margin-left'  : 'auto'
                });
            } else if ('right' === type) {
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
            cmp.style({
                'margin-right' : null,
                'margin-left'  : null
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.HrzPos;
/* end of file */
