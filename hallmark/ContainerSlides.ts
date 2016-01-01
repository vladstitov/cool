/**
 * Created by VladHome on 1/1/2016.
 */
﻿package comps
{
    import comps.*;
    import flash.display.*;
    import flash.events.*;
    import flash.utils.*;

    public class ContainerSliders extends Sprite implements IMyDisplayObject
    {
        protected var arSliders:Array;
        private var isMove:Boolean;
        private var mouseDelta:int;
        private var mouseXPrev:Number;
        private var mouseYPrev:Number;
        private var intCurrent:int;

        public function ContainerSliders()
    {
        this.arSliders = new Array();
        Registry.getInstance().dispatcherGlobal.addEventListener(Registry.LIBRARYREADY, this.onLibraryReady);
        this.mouseChildren = false;
        this.mouseEnabled = false;
        this.addEventListener(Event.ADDED_TO_STAGE, this.thisAddedToStage);
        return;
    }// end function

        protected function thisAddedToStage(event:Event) : void
    {
        this.stage.addEventListener(MouseEvent.MOUSE_UP, this.onMouseUP);
        this.stage.addEventListener(MouseEvent.MOUSE_DOWN, this.onMouseDown);
        return;
    }// end function

        protected function onMouseDown(event:MouseEvent) : void
    {
        this.isMove = false;
        this.mouseDelta = 0;
        this.mouseXPrev = event.localX;
        this.mouseYPrev = event.localY;
        if (this.mouseYPrev < 0 || this.mouseYPrev > 1000)
        {
            return;
        }
        if (this.mouseYPrev > 200)
        {
            this.intCurrent = 0;
        }
        if (this.mouseYPrev > 400)
        {
            this.intCurrent = 1;
        }
        if (this.mouseYPrev > 600)
        {
            this.intCurrent = 2;
        }
        if (this.mouseYPrev > 800)
        {
            this.intCurrent = 3;
        }
        if (!this.stage.hasEventListener(MouseEvent.MOUSE_MOVE))
        {
            this.stage.addEventListener(MouseEvent.MOUSE_MOVE, this.mouseMove_Handler);
        }
        return;
    }// end function

        protected function mouseMove_Handler(event:MouseEvent) : void
    {
        var _loc_2:* = 0;
        var _loc_3:* = 0;
        var _loc_4:* = null;
        if (event.localY < 0 || event.localY > 1000)
        {
            this.onMouseUP(event);
        }
        else
        {
            _loc_2 = event.localX;
            _loc_3 = _loc_2 - this.mouseXPrev;
            if (_loc_3 < -5 || _loc_3 > 5)
            {
                this.isMove = true;
            }
            _loc_4 = this.arSliders[this.intCurrent];
            _loc_4.startMove(_loc_3);
            this.mouseXPrev = _loc_2;
            this.mouseDelta = _loc_3;
        }
        return;
    }// end function

        protected function onMouseUP(event:MouseEvent) : void
    {
        this.stage.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMove_Handler);
        return;
    }// end function

        protected function onLibraryReady(event:Event) : void
    {
        setTimeout(this.strtRotate, 100);
        return;
    }// end function

        private function strtRotate() : void
    {
        var _loc_2:* = null;
        var _loc_1:* = 10;
        for each (_loc_2 in this.arSliders)
        {

        }
        return;
    }// end function

        public function initMe(param1:XML) : DisplayObject
    {
        var _loc_2:* = null;
        for each (_loc_5 in param1.attributes())
        {

            _loc_2 = _loc_4[_loc_3];
            if (this.hasOwnProperty(_loc_2.name().localName))
            {
                var _loc_5:* = _loc_2;
                this[_loc_2.name().localName] = _loc_2;
            }
        }
        for each (_loc_5 in param1.children())
        {

            _loc_2 = _loc_4[_loc_3];
            if (this.hasOwnProperty(_loc_2.name().localName))
            {
                var _loc_5:* = _loc_2;
                this[_loc_2.name().localName] = _loc_2;
            }
        }
        return this as DisplayObject;
    }// end function

        public function set slider(param1:XML) : void
    {
        var _loc_2:* = new SliderImages();
        this.arSliders.push(_loc_2);
        this.addChild(_loc_2.initMe(param1));
        return;
    }// end function

    }
}
