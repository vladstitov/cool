/**
 * Created by VladHome on 1/1/2016.
 */
﻿package
{
    import Main.*;
    import comps.*;
    import flash.display.*;
    import flash.events.*;
    import flash.net.*;
    import flash.utils.*;

    public class Main extends Sprite
    {
        protected var banner:Banner;
        protected var cont:ContainerSliders;
        protected var preloader:LoaderRotation;
        private var counter:int = 0;
        private var xmll:XMLList;

        public function Main()
    {
        this.preloader = new LoaderRotation();
        this.addEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
        var _loc_1:* = new URLLoader(new URLRequest("settings.xml"));
        _loc_1.addEventListener(Event.COMPLETE, this.onoaderComplete);
        Registry.getInstance();
        var _loc_2:* = new Shape();
        _loc_2.graphics.beginFill(3355443, 0.5);
        _loc_2.graphics.drawRect(0, 0, 768, 1366);
        _loc_2.graphics.endFill();
        var _loc_3:* = this.preloader.getChildAt(0);
        _loc_3.x = 768 / 2;
        _loc_3.y = 1366 / 2;
        this.preloader.addChildAt(_loc_2, 0);
        addChild(this.preloader);
        Registry.getInstance().dispatcherGlobal.addEventListener(Registry.LIBRARYREADY, this.loadReady);
        return;
    }// end function

        protected function onAddedToStage(event:Event) : void
    {
        this.stage.scaleMode = StageScaleMode.NO_SCALE;
        return;
    }// end function

        protected function onoaderComplete(event:Event) : void
    {
        var _loc_2:* = new XML(event.target.data);
        this.xmll = _loc_2.body.children();
        this.parseXML();
        return;
    }// end function

        protected function parseXML() : void
    {
        var CL:Class;
        var cl:IMyDisplayObject;
        var DO:DisplayObject;
        var _loc_2:* = this;
        _loc_2.counter = this.counter + 1;
        var node:* = this.xmll[this.counter++];
        try
        {
            CL = getDefinitionByName(node.name()) as Class;
            cl = new CL;
            if (cl)
            {
                DO = cl.initMe(node);
                this.addChild(DO);
                addChild(this.preloader);
            }
        }
        catch (e:Error)
        {
        }
        if (this.counter < this.xmll.length())
        {
            setTimeout(this.parseXML, 30);
        }
        return;
    }// end function

        public function loadReady(event:Event) : void
    {
        this.removeChild(this.preloader);
        return;
    }// end function

    }
}
