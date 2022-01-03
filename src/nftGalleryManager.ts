/*     GALLERY MANAGER
    this module allows users to place and display their NFTs
    across a scene. data is read in from nftData.ts, display
    frames/shelves are placed, and NFT objects are generated. 

    currently dcl only supports the ethereum chain, but this
    module is set up so it can be easly changed to include 
    matic/polygon when the APIs become available.

    Author: Alex Pazder, thecryptotrader69@gmail.com
*/
import { Dictionary, List } from "./dict"
import { nft_frame, displayerDefs, nft_object } from "./nftFrame"
import { data_nft_frame, data_nft_object } from "./nftDisplayData"

@Component("nftGalleryManager")
export class nftGalleryManager extends Entity 
{
    public static linkDict:Dictionary<string>;

    //current unique index for NFT
    private indCounter;
    private GetIndex():number { return this.indCounter++; }

    //info panel elements
    private canvas:UICanvas;

    //used to initialize tile's data
    constructor()
    {
        //initial entity initialization
        super();
        nftGalleryManager.linkDict = new Dictionary<string>();
        displayerDefs.Initialize();

        //reset counter
        this.indCounter = 0;

        //initialize info panel
        this.canvas = new UICanvas();

        //spawn and place display building
        this.addComponent(new GLTFShape("models/gridFloor.glb"));
        this.addComponent(new Transform
        ({
            position: new Vector3(0,0,0),
            scale: new Vector3(1,1,1),
            rotation: new Quaternion().setEuler(0,0,0)
        }));
        
        //create each display object
        //  all 2D
        for(var index:number=0; index<data_nft_frame.length; index++)
        {
            this.CreateFrameDisplay(index);
        }
        //  all 3D
        for(var index:number=0; index<data_nft_object.length; index++)
        {
            this.CreateObjectDisplay(index);
        }
    }

    //adds a multi-display parent to the scene, populating it with NFT frames (2D)
    public CreateFrameDisplay(defIndex:number)
    {
        //create object
        var obj = new Entity();
        obj.setParent(this);
        //  only load in a displayer object if type is not 'free'
        if(data_nft_frame[defIndex].type != "Free")
        {
            obj.addComponent(new GLTFShape("models/galleryDisplay_"+data_nft_frame[defIndex].type+".glb"));
        }
        //  set position and scale
        var pos = data_nft_frame[defIndex].position.split('_');
        var sca = data_nft_frame[defIndex].scale.split('_');
        var rot = data_nft_frame[defIndex].rotation.split('_');
        obj.addComponent(new Transform
        ({
            position: new Vector3(+pos[0],+pos[1],+pos[2]),
            scale: new Vector3(+sca[0],+sca[1],+sca[2]),
            rotation: new Quaternion().setEuler(+rot[0],+rot[1],+rot[2])
        }));

        //create each NFT frame and reset parent
        for(var nftIndex:number=0; nftIndex<data_nft_frame[defIndex].nfts.length; nftIndex++)
        {
            var nft:nft_frame = new nft_frame(defIndex, nftIndex);
            nft.setParent(obj);

            log(data_nft_frame[defIndex].nfts[nftIndex].chain+"-NFT Frame: "+defIndex.toString()+"-"+nftIndex.toString()+", pos: "+nft.getComponent(Transform).position.toString());
        }
    }

    //adds a multi-display parent to the scene, populating it with NFT objects (3D)
    public CreateObjectDisplay(defIndex:number)
    {
        //create object
        var obj = new Entity();
        obj.setParent(this);
        //  only load in a displayer object if type is not 'free'
        if(data_nft_object[defIndex].type != "Free")
        {
            obj.addComponent(new GLTFShape("models/galleryDisplay_"+data_nft_object[defIndex].type+".glb"));
        }
        //  set position and scale
        var pos = data_nft_object[defIndex].position.split('_');
        var sca = data_nft_object[defIndex].scale.split('_');
        var rot = data_nft_object[defIndex].rotation.split('_');
        obj.addComponent(new Transform
        ({
            position: new Vector3(+pos[0],+pos[1],+pos[2]),
            scale: new Vector3(+sca[0],+sca[1],+sca[2]),
            rotation: new Quaternion().setEuler(+rot[0],+rot[1],+rot[2])
        }));

        //create each NFT frame and reset parent
        for(var nftIndex:number=0; nftIndex<data_nft_object[defIndex].nfts.length; nftIndex++)
        {
            var nft:nft_object = new nft_object(defIndex, nftIndex);
            nft.setParent(obj);

            log(data_nft_object[defIndex].nfts[nftIndex].chain+"-NFT Object: "+defIndex.toString()+"-"+nftIndex.toString()+", pos: "+nft.getComponent(Transform).position.toString());
        }
    }
}