var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by VladHome on 1/1/2016.
 */
package;
comps;
{
     * ;
     * ;
     * ;
     * ;
    var SliderImages_1 = (function (_super) {
        __extends(SliderImages_1, _super);
        function SliderImages_1() {
            _super.apply(this, arguments);
            this.var = position;
            this.Number = 0;
            this.var = arImages;
            this.var = vecImages;
        }
        return SliderImages_1;
    })(Sprite);
    ;
    var friction = 1;
    var speed;
    function SliderImages() {
        var _loc_3 =  * ;
        null;
        this.arImages = new Array();
        this.vecImages = new Vector.();
        this.mouseChildren = false;
        Registry.getInstance().dispatcherGlobal.addEventListener(Registry.LIBRARYREADY, this.libraryReady);
        var _loc_1 =  * ;
        5;
        var _loc_2 =  * ;
        0;
        while (_loc_2 < _loc_1) {
            _loc_3 = new Bitmap();
            _loc_3.x = _loc_2 * 200;
            this.vecImages.push(_loc_3);
            this.addChild(_loc_3);
            _loc_2++;
        }
        return;
    } // end function
    function libraryReady(event) {
        this.loadImages();
        return;
    } // end function
    function initMe(param1) {
        var _loc_2 =  * ;
        null;
        for (each(_loc_2 in param1.attributes()); {
            if: function () { }, this: .hasOwnProperty(_loc_2.name().localName) }; {
            this: (_loc_2.name().localName = _loc_2[0], _loc_2)
        })
            ;
    }
    for (each(_loc_2 in param1.children()); {
        if: function () { }, this: .hasOwnProperty(_loc_2.name().localName) }; {
        this: (_loc_2.name().localName = _loc_2[0], _loc_2)
    })
        ;
}
return this;
id(param1, String);
void {
    var: _loc_2, : function () { }, new: TextField(),
    _loc_2: .text = param1,
    this: .addChild(_loc_2),
    return: 
}; // end function
function moveImages(param1) {
    var _loc_2 =  * ;
    this.vecImages.length;
    var _loc_3 =  * ;
    0;
    while (_loc_3 < _loc_2) {
        this.vecImages[_loc_3].x = this.vecImages[_loc_3].x + param1;
        if (this.vecImages[_loc_3].x > 800) {
            this.vecImages[_loc_3].x = -200 + (this.vecImages[_loc_3].x - 800);
            this.vecImages[_loc_3].bitmapData = Registry.getInstance().getImage();
        }
        else if (this.vecImages[_loc_3].x < -200) {
            this.vecImages[_loc_3].x = 800 + (this.vecImages[_loc_3].x + 200);
            this.vecImages[_loc_3].bitmapData = Registry.getInstance().getImage();
        }
        _loc_3++;
    }
    return;
} // end function
function startMove(param1) {
    this.speed = param1;
    this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
    return;
} // end function
function stopMove() {
    this.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);
    return;
} // end function
function onEnterFrame(event) {
    if (this.speed > -3 && this.speed < 3) {
        this.stopMove();
    }
    this.moveImages(this.speed);
    return;
} // end function
function loadImages() {
    var _loc_1 =  * ;
    null;
    for (each(_loc_1 in this.vecImages); {
        _loc_1: .bitmapData = Registry.getInstance().getImage()
    }; )
        return;
} // end function
//# sourceMappingURL=SliderImages.js.map