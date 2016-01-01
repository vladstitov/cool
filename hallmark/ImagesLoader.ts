/**
 * Created by VladHome on 1/1/2016.
 */
﻿package helpers
{
    import __AS3__.vec.*;
    import flash.display.*;
    import flash.events.*;
    import flash.net.*;

    public class ImagesLoader extends Object
    {
        private var arUrls:Array;
        private var count:int = 0;
        private var interator:int = 0;
        private var _length:int;
        protected var ldrImage:Loader;
        protected var vecBitmap:Vector.<BitmapData>;
        protected var objData:Object;
        protected var reqImage:URLRequest;

        public function ImagesLoader()
    {
        this.ldrImage = new Loader();
        this.vecBitmap = new Vector.<BitmapData>;
        this.reqImage = new URLRequest();
        var _loc_1:* = new URLLoader(new URLRequest("images/getAllImages.php"));
        _loc_1.addEventListener(Event.COMPLETE, this.loaderComplete_Handler);
        this.ldrImage.contentLoaderInfo.addEventListener(Event.COMPLETE, this.ldrImageCOMPLETE);
        return;
    }// end function

        protected function ldrImageCOMPLETE(event:Event) : void
    {
        this.vecBitmap.push(Bitmap(this.ldrImage.content).bitmapData);
        this.loadNextImage();
        return;
    }// end function

        protected function loaderComplete_Handler(event:Event) : void
    {
        this.objData = JSON.parse(event.target.data);
        this.loadNextImage();
        return;
    }// end function

        protected function loadNextImage() : void
    {
        var _loc_1:* = null;
        var _loc_2:* = null;
        var _loc_3:* = null;
        for (_loc_1 in this.objData)
        {

            _loc_2 = _loc_5[_loc_1];
            if (_loc_2.length == 0)
            {
                delete _loc_5[_loc_1];
                continue;
            }
            _loc_3 = "images/" + _loc_1 + "/" + _loc_2.pop();
            if (_loc_3.substr(-4) != ".jpg" && _loc_3.substr(-4) != ".png")
            {
                this.loadNextImage();
                return;
            }
            this.reqImage.url = _loc_3;
            this.ldrImage.load(this.reqImage);
            return;
        }
        Registry.getInstance().dispatcherGlobal.dispatchEvent(new Event(Registry.LIBRARYREADY));
        return;
    }// end function

        public function get length() : int
    {
        return this._length;
    }// end function

        public function get selectedIndex() : int
    {
        return this.interator;
    }// end function

        public function getNextImage() : BitmapData
    {
        var _loc_1:* = this;
        this.interator = (this.interator + 1);
        _loc_1.interator = this.interator + 1;
        if (this.interator >= this.vecBitmap.length)
        {
            this.interator = 0;
        }
        return this.vecBitmap[this.interator];
    }// end function

    }
}
