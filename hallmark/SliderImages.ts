/**
 * Created by VladHome on 1/1/2016.
 */
package comps
{
    import __AS3__.vec.*;
    import flash.display.*;
    import flash.events.*;
    import flash.text.*;

    public class SliderImages extends Sprite
    {
        protected var position:Number = 0;
        protected var arImages:Array;
        protected var vecImages:Vector.<Bitmap>;
        protected var friction:Number = 1;
        protected var speed:Number;

        public function SliderImages()
    {
        var _loc_3:* = null;
        this.arImages = new Array();
        this.vecImages = new Vector.<Bitmap>;
        this.mouseChildren = false;
        Registry.getInstance().dispatcherGlobal.addEventListener(Registry.LIBRARYREADY, this.libraryReady);
        var _loc_1:* = 5;
        var _loc_2:* = 0;
        while (_loc_2 < _loc_1)
        {

            _loc_3 = new Bitmap();
            _loc_3.x = _loc_2 * 200;
            this.vecImages.push(_loc_3);
            this.addChild(_loc_3);
            _loc_2++;
        }
        return;
    }// end function

        protected function libraryReady(event:Event) : void
    {
        this.loadImages();
        return;
    }// end function

        public function initMe(param1:XML) : DisplayObject
    {
        var _loc_2:* = null;
        for each (_loc_2 in param1.attributes())
        {

            if (this.hasOwnProperty(_loc_2.name().localName))
            {
                this[_loc_2.name().localName] = _loc_2;
            }
        }
        for each (_loc_2 in param1.children())
        {

            if (this.hasOwnProperty(_loc_2.name().localName))
            {
                this[_loc_2.name().localName] = _loc_2;
            }
        }
        return this as DisplayObject;
    }// end function

        public function set id(param1:String) : void
    {
        var _loc_2:* = new TextField();
        _loc_2.text = param1;
        this.addChild(_loc_2);
        return;
    }// end function

        protected function moveImages(param1:Number) : void
    {
        var _loc_2:* = this.vecImages.length;
        var _loc_3:* = 0;
        while (_loc_3 < _loc_2)
        {

            this.vecImages[_loc_3].x = this.vecImages[_loc_3].x + param1;
            if (this.vecImages[_loc_3].x > 800)
            {
                this.vecImages[_loc_3].x = -200 + (this.vecImages[_loc_3].x - 800);
                this.vecImages[_loc_3].bitmapData = Registry.getInstance().getImage();
            }
            else if (this.vecImages[_loc_3].x < -200)
            {
                this.vecImages[_loc_3].x = 800 + (this.vecImages[_loc_3].x + 200);
                this.vecImages[_loc_3].bitmapData = Registry.getInstance().getImage();
            }
            _loc_3++;
        }
        return;
    }// end function

        public function startMove(param1:Number) : void
    {
        this.speed = param1;
        this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
        return;
    }// end function

        public function stopMove() : void
    {
        this.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);
        return;
    }// end function

        protected function onEnterFrame(event:Event) : void
    {
        if (this.speed > -3 && this.speed < 3)
        {
            this.stopMove();
        }
        this.moveImages(this.speed);
        return;
    }// end function

        private function loadImages() : void
    {
        var _loc_1:* = null;
        for each (_loc_1 in this.vecImages)
        {

            _loc_1.bitmapData = Registry.getInstance().getImage();
        }
        return;
    }// end function

    }
}
