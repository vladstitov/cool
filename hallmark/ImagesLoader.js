var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by VladHome on 1/1/2016.
 */
package;
helpers;
{
     * ;
     * ;
     * ;
     * ;
    var ImagesLoader_1 = (function (_super) {
        __extends(ImagesLoader_1, _super);
        function ImagesLoader_1() {
            _super.apply(this, arguments);
            this.var = arUrls;
            this.var = count;
            this.int = 0;
            this.var = interator;
            this.int = 0;
            this.var = _length;
            this.var = ldrImage;
            this.var = vecBitmap;
        }
        return ImagesLoader_1;
    })(Object);
    ;
    var objData;
    var reqImage;
    function ImagesLoader() {
        this.ldrImage = new Loader();
        this.vecBitmap = new Vector.();
        this.reqImage = new URLRequest();
        var _loc_1 =  * ;
        new URLLoader(new URLRequest("images/getAllImages.php"));
        _loc_1.addEventListener(Event.COMPLETE, this.loaderComplete_Handler);
        this.ldrImage.contentLoaderInfo.addEventListener(Event.COMPLETE, this.ldrImageCOMPLETE);
        return;
    } // end function
    function ldrImageCOMPLETE(event) {
        this.vecBitmap.push(Bitmap(this.ldrImage.content).bitmapData);
        this.loadNextImage();
        return;
    } // end function
    function loaderComplete_Handler(event) {
        this.objData = JSON.parse(event.target.data);
        this.loadNextImage();
        return;
    } // end function
    function loadNextImage() {
        var _loc_1 =  * ;
        null;
        var _loc_2 =  * ;
        null;
        var _loc_3 =  * ;
        null;
        for (_loc_1 in this.objData) {
            _loc_2 = _loc_5[_loc_1];
            if (_loc_2.length == 0) {
                delete _loc_5[_loc_1];
                continue;
            }
            _loc_3 = "images/" + _loc_1 + "/" + _loc_2.pop();
            if (_loc_3.substr(-4) != ".jpg" && _loc_3.substr(-4) != ".png") {
                this.loadNextImage();
                return;
            }
            this.reqImage.url = _loc_3;
            this.ldrImage.load(this.reqImage);
            return;
        }
        Registry.getInstance().dispatcherGlobal.dispatchEvent(new Event(Registry.LIBRARYREADY));
        return;
    } // end function
    length();
    int;
    {
        return this._length;
    } // end function
    selectedIndex();
    int;
    {
        return this.interator;
    } // end function
    function getNextImage() {
        var _loc_1 =  * ;
        this;
        this.interator = (this.interator + 1);
        _loc_1.interator = this.interator + 1;
        if (this.interator >= this.vecBitmap.length) {
            this.interator = 0;
        }
        return this.vecBitmap[this.interator];
    } // end function
}
//# sourceMappingURL=ImagesLoader.js.map