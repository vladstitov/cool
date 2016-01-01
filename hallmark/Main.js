var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by VladHome on 1/1/2016.
 */
package;
{
     * ;
     * ;
     * ;
     * ;
     * ;
     * ;
    var Main_1 = (function (_super) {
        __extends(Main_1, _super);
        function Main_1() {
            _super.apply(this, arguments);
            this.var = banner;
            this.var = cont;
            this.var = preloader;
            this.var = counter;
            this.int = 0;
            this.var = xmll;
            this.function = Main_1();
        }
        return Main_1;
    })(Sprite);
    {
        this.preloader = new LoaderRotation();
        this.addEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
        var _loc_1 =  * ;
        new URLLoader(new URLRequest("settings.xml"));
        _loc_1.addEventListener(Event.COMPLETE, this.onoaderComplete);
        Registry.getInstance();
        var _loc_2 =  * ;
        new Shape();
        _loc_2.graphics.beginFill(3355443, 0.5);
        _loc_2.graphics.drawRect(0, 0, 768, 1366);
        _loc_2.graphics.endFill();
        var _loc_3 =  * ;
        this.preloader.getChildAt(0);
        _loc_3.x = 768 / 2;
        _loc_3.y = 1366 / 2;
        this.preloader.addChildAt(_loc_2, 0);
        addChild(this.preloader);
        Registry.getInstance().dispatcherGlobal.addEventListener(Registry.LIBRARYREADY, this.loadReady);
        return;
    } // end function
    function onAddedToStage(event) {
        this.stage.scaleMode = StageScaleMode.NO_SCALE;
        return;
    } // end function
    function onoaderComplete(event) {
        var _loc_2 =  * ;
        new XML(event.target.data);
        this.xmll = _loc_2.body.children();
        this.parseXML();
        return;
    } // end function
    function parseXML() {
        var CL;
        var cl;
        var DO;
        var _loc_2 =  * ;
        this;
        _loc_2.counter = this.counter + 1;
        var node =  * ;
        this.xmll[this.counter++];
        try {
            CL = getDefinitionByName(node.name());
            cl = new CL;
            if (cl) {
                DO = cl.initMe(node);
                this.addChild(DO);
                addChild(this.preloader);
            }
        }
        catch (e) {
        }
        if (this.counter < this.xmll.length()) {
            setTimeout(this.parseXML, 30);
        }
        return;
    } // end function
    function loadReady(event) {
        this.removeChild(this.preloader);
        return;
    } // end function
}
//# sourceMappingURL=Main.js.map