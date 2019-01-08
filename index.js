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
    contents (flg, cmp) {
        try {
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
    
    enable (cmp) {}
    disable (cmp) {}
    
    /**
     * execute text component position
     * 
     * @note private method
     */
    textPos (cmp, flg) {
        try {
            if ( (null !== cmp.target().parent()) &&
                 ('flex' === cmp.target().parent().style('display')) ) {
                
                if ('center' === this.type()) {
                    cmp.style({
                        'margin-right' : (true === flg) ? 'auto' : null,
                        'margin-left'  : (true === flg) ? 'auto' : null
                    });
                    if ((true === flg) && (null !== this.offset())) {
                        cmp.style({
                            'position' : 'relative',
                            'left'     : this.offset()
                        });
                    }
                } else if ('left' === this.type()) {
                    cmp.style({
                        'margin-right' : (true === flg) ? 'auto' : null,
                        'margin-left'  : (true === flg) ? '0rem' : null
                    });
                } else if ('right' === this.type()) {
                    cmp.style({
                        'margin-right' : (true === flg) ? '0rem' : null,
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
    
    /**
     * execute other component position
     *
     * @note private method
     */
    otherPos (cmp, flg) {
        try {
            if ('center' === this.type()) {
                this.otherPosCenter(cmp, flg);
            } else if ('left' === this.type()) {
                if ('absolute' === cmp.style('position')) {
                    cmp.style({ 'left' : (true === flg) ? mf.func.sizeSum('0rem', this.offset()) : null });
                } else {
                    cmp.style({
                        'margin-right' : (true === flg) ? 'auto' : null,
                        'margin-left'  : (true === flg) ? mf.func.sizeSum('0rem', this.offset()) : null
                    });
                }
            } else if ('right' === this.type()) {
                if ('absolute' === cmp.style('position')) {
                    cmp.style({
                        'right' : (true === flg) ? mf.func.sizeSum('0rem', this.offset()) : null
                    });
                } else {
                    cmp.style({
                        'margin-right' : (true === flg) ? mf.func.sizeSum('0rem', this.offset()) : null,
                        'margin-left'  : (true === flg) ? 'auto' : null
                    });
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
            } else if ( (null !== cmp.sizeValue('width')) &&
                        (null !== cmp.parent().sizeValue('width')) &&
                        ('%' === cmp.parent().sizeValue('width').type()) &&
                        (0  !== cmp.parent().sizeValue('width').value()) ) {
                cmp.style({ 'position' : 'relative' }, true);
                cmp.style({
                    'margin-left' : (true === flg) ? '50%' : null,
                    'left'        : null
                });
                if (true === flg) {
                    cmp.sizeValue(
                        'left',
                        mf.func.sizeSum(
                            '-' + cmp.sizeValue('width').value()/2 + cmp.sizeValue('width').type(),
                            this.offset()
                        )
                    );
                }
            } else {
                cmp.style({
                    'display'      : (true === flg) ? 'block' : null,
                    'margin-right' : (true === flg) ? 'auto'  : null,
                    'margin-left'  : (true === flg) ? 'auto'  : null
                });
                if ( (true === flg) && (null !== this.offset()) ) {
                    cmp.style({
                        'position' : 'relative',
                        'left'     : this.offset()
                    });
                }
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
        try {
            return this.member('type', ['center', 'left', 'right'], prm, 'center');
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
}
module.exports = mf.effect.HrzPos;
/* end of file */
