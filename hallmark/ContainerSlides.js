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
    var comps = .;
     * ;
     * ;
     * ;
     * ;
    var ContainerSliders = (function (_super) {
        __extends(ContainerSliders, _super);
        function ContainerSliders() {
            _super.apply(this, arguments);
            this.var = arSliders;
            this.var = isMove;
            this.var = mouseDelta;
            this.var = mouseXPrev;
            this.var = mouseYPrev;
            this.var = intCurrent;
            this.function = ContainerSliders();
        }
        return ContainerSliders;
    })(Sprite);
    {
        this.arSliders = new Array();
        Registry.getInstance().dispatcherGlobal.addEventListener(Registry.LIBRARYREADY, this.onLibraryReady);
        this.mouseChildren = false;
        this.mouseEnabled = false;
        this.addEventListener(Event.ADDED_TO_STAGE, this.thisAddedToStage);
        return;
    } // end function
    function thisAddedToStage(event) {
        this.stage.addEventListener(MouseEvent.MOUSE_UP, this.onMouseUP);
        this.stage.addEventListener(MouseEvent.MOUSE_DOWN, this.onMouseDown);
        return;
    } // end function
    function onMouseDown(event) {
        this.isMove = false;
        this.mouseDelta = 0;
        this.mouseXPrev = event.localX;
        this.mouseYPrev = event.localY;
        if (this.mouseYPrev < 0 || this.mouseYPrev > 1000) {
            return;
        }
        if (this.mouseYPrev > 200) {
            this.intCurrent = 0;
        }
        if (this.mouseYPrev > 400) {
            this.intCurrent = 1;
        }
        if (this.mouseYPrev > 600) {
            this.intCurrent = 2;
        }
        if (this.mouseYPrev > 800) {
            this.intCurrent = 3;
        }
        if (!this.stage.hasEventListener(MouseEvent.MOUSE_MOVE)) {
            this.stage.addEventListener(MouseEvent.MOUSE_MOVE, this.mouseMove_Handler);
        }
        return;
    } // end function
    function mouseMove_Handler(event) {
        var _loc_2 =  * ;
        0;
        var _loc_3 =  * ;
        0;
        var _loc_4 =  * ;
        null;
        if (event.localY < 0 || event.localY > 1000) {
            this.onMouseUP(event);
        }
        else {
            _loc_2 = event.localX;
            _loc_3 = _loc_2 - this.mouseXPrev;
            if (_loc_3 < -5 || _loc_3 > 5) {
                this.isMove = true;
            }
            _loc_4 = this.arSliders[this.intCurrent];
            _loc_4.startMove(_loc_3);
            this.mouseXPrev = _loc_2;
            this.mouseDelta = _loc_3;
        }
        return;
    } // end function
    function onMouseUP(event) {
        this.stage.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMove_Handler);
        return;
    } // end function
    function onLibraryReady(event) {
        setTimeout(this.strtRotate, 100);
        return;
    } // end function
    function strtRotate() {
        var _loc_2 =  * ;
        null;
        var _loc_1 =  * ;
        10;
        for (each(_loc_2 in this.arSliders); {}; )
            return;
    } // end function
    function initMe(param1) {
        var _loc_2 =  * ;
        null;
        for (each(_loc_5 in param1.attributes()); {
            _loc_2: _loc_2,
            if: function () { }, this: .hasOwnProperty(_loc_2.name().localName) }; {
            var: _loc_5, : function () { }, _loc_2: ,
            this: (_loc_2.name().localName = _loc_2[0], _loc_2)
        })
            ;
    }
    for (each(_loc_5 in param1.children()); {
        _loc_2: _loc_2,
        if: function () { }, this: .hasOwnProperty(_loc_2.name().localName) }; {
        var: _loc_5, : function () { }, _loc_2: ,
        this: (_loc_2.name().localName = _loc_2[0], _loc_2)
    })
        ;
}
return this;
slider(param1, XML);
void {
    var: _loc_2, : function () { }, new: SliderImages(),
    this: .arSliders.push(_loc_2),
    this: .addChild(_loc_2.initMe(param1)),
    return: 
}; // end function
//# sourceMappingURL=ContainerSlides.js.map