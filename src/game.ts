/*      NFT GALLERY START
    this handles the initialization of the gallery module. 

    Author: Alex Pazder, thecryptotrader69@gmail.com
*/

//import module manager
import { nftGalleryManager } from "./nftGalleryManager";

//create and intialize instance of manager
var managerObj:nftGalleryManager = new nftGalleryManager();
engine.addEntity(managerObj);