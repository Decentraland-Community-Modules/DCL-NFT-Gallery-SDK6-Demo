/*      NFT FRAME
    single object components for either frames (2D)
    or objects (3D) that can be placed around the scene.

    Author: Alex Pazder, thecryptotrader69@gmail.com
*/
import { data_nft_frame, data_nft_object } from "./nftDisplayData";
import { Dictionary, List } from "./dict"
import { data_nft_display_objects } from "./nftDisplayObjectData";

//displays a single nft as an NFTShape, loaded from data
@Component("nft_frame")
export class nft_frame extends Entity 
{
    static isDebugging:boolean;

    public defIndex:number;
    public nftIndex:number;

    constructor(def:number, nft:number) 
    {
        //initial entity initialization
        super();
        displayerDefs.isDebugging = false;

        //set index
        this.defIndex = def;
        this.nftIndex = nft;

        //  set position and scale
        var pos = data_nft_frame[this.defIndex].nfts[this.nftIndex].position.split('_');
        var sca = data_nft_frame[this.defIndex].nfts[this.nftIndex].scale.split('_');
        var rot = data_nft_frame[this.defIndex].nfts[this.nftIndex].rotation.split('_');
        //  only load dynamic location if style is not 'free'
        if(data_nft_frame[this.defIndex].type == "Free")
        {
            this.addComponent(new Transform
            ({
                position: new Vector3(+pos[0],+pos[1],+pos[2]),
                scale: new Vector3(+sca[0],+sca[1],+sca[2]),
                rotation: new Quaternion().setEuler(+rot[0],+rot[1],+rot[2])
            }));
        }
        else
        {
            var defPos:Vector3 = displayerDefs.positionDict.getItem(data_nft_frame[this.defIndex].type+"_"+this.nftIndex.toString());
            var defRot:Quaternion = displayerDefs.rotationDict.getItem(data_nft_frame[this.defIndex].type+"_"+this.nftIndex.toString());
            this.addComponent(new Transform
            ({
                position: new Vector3((+pos[0])+defPos.x,(+pos[1])+defPos.y,(+pos[2])+defPos.z),
                scale: new Vector3(+sca[0],+sca[1],+sca[2]),
                rotation: new Quaternion().setEuler((+rot[0])+defRot.x,(+rot[1])+defRot.y,(+rot[2])+defRot.z)
            }));
        }

        //add NFT shape and set it's colour
        var col = data_nft_frame[this.defIndex].colour.split('_');
        
        if(data_nft_frame[this.defIndex].nfts[this.nftIndex].chain == "polygon")
        {
        }
        else
        {
            this.addComponent(
                new NFTShape(
                    data_nft_frame[this.defIndex].nfts[this.nftIndex].chain+"://"
                    +data_nft_frame[this.defIndex].nfts[this.nftIndex].contract+"/"
                    +data_nft_frame[this.defIndex].nfts[this.nftIndex].token,
                    {
                        color: new Color3(+col[0],+col[1],+col[2]),
                        style: this.getStyle(data_nft_frame[this.defIndex].style)
                    }
                )
            );
        }

        //add interaction: inspect nft in-game
        this.addComponent(
            //add click action listener
            new OnPointerDown
            (
                (e) => 
                {
                    //display standard info for NFT based on chain
                    if(data_nft_frame[this.defIndex].nfts[this.nftIndex].chain == "polygon")
                    {
                    }
                    else
                    {
                        //create dialog
                        openNFTDialog(data_nft_frame[this.defIndex].nfts[this.nftIndex].chain+"://"
                        +data_nft_frame[this.defIndex].nfts[this.nftIndex].contract+"/"
                        +data_nft_frame[this.defIndex].nfts[this.nftIndex].token);
                    }
                },
                {
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: "Inspect",
                    distance: 8,
                }
            )
        );

        //add interaction: open website
        this.addComponent(
            //add click action listener
            new OnPointerUp
            (
                (e) => 
                {
                    //external link based on chain
                    if(data_nft_frame[this.defIndex].nfts[this.nftIndex].chain == "polygon")
                    {
                        openExternalURL(
                            "https://opensea.io/assets/matic/"
                            +data_nft_frame[this.defIndex].nfts[this.nftIndex].contract+"/"
                            +data_nft_frame[this.defIndex].nfts[this.nftIndex].token
                        );
                    }
                    else
                    {
                        openExternalURL(
                            "https://opensea.io/assets/"
                            +data_nft_frame[this.defIndex].nfts[this.nftIndex].contract+"/"
                            +data_nft_frame[this.defIndex].nfts[this.nftIndex].token
                        );
                    }
                },
                {
                    button: ActionButton.SECONDARY,
                    showFeedback: true,
                    hoverText: "Website",
                    distance: 8,
                }
            )
        );

        if(displayerDefs.isDebugging) log("Loaded NFT: "+(data_nft_frame[this.defIndex].type+"_"+this.nftIndex.toString())
        +"; pos: "+this.getComponent(Transform).position.toString());
    }

    //all possible style codes
    private getStyle(style:string|undefined):PictureFrameStyle
    {
        switch(style)
        {
            case "Classic":
                return PictureFrameStyle.Classic;
            break;
            
            case "Baroque_Ornament":
                return PictureFrameStyle.Baroque_Ornament;
            break;
            
            case "Diamond_Ornament":
                return PictureFrameStyle.Diamond_Ornament;
            break;
            
            case "Minimal_Wide":
                return PictureFrameStyle.Minimal_Wide;
            break;
            
            case "Minimal_Grey":
                return PictureFrameStyle.Minimal_Grey;
            break;
            
            case "Blocky":
                return PictureFrameStyle.Blocky;
            break;
            
            case "Gold_Edges":
                return PictureFrameStyle.Gold_Edges;
            break;
            
            case "Gold_Carved":
                return PictureFrameStyle.Gold_Carved;
            break;
            
            case "Gold_Wide":
                return PictureFrameStyle.Gold_Wide;
            break;
            
            case "Gold_Rounded":
                return PictureFrameStyle.Gold_Rounded;
            break;
            
            case "Metal_Medium":
                return PictureFrameStyle.Metal_Medium;
            break;
            
            case "Metal_Wide":
                return PictureFrameStyle.Metal_Wide;
            break;
            
            case "Metal_Slim":
                return PictureFrameStyle.Metal_Slim;
            break;
            
            case "Metal_Rounded":
                return PictureFrameStyle.Metal_Rounded;
            break;
            
            case "Pins":
                return PictureFrameStyle.Pins;
            break;
            
            case "Minimal_Black":
                return PictureFrameStyle.Minimal_Black;
            break;
            
            case "Minimal_White":
                return PictureFrameStyle.Minimal_White;
            break;
            
            case "Tape":
                return PictureFrameStyle.Tape
            break;
            
            case "Wood_Slim":
                return PictureFrameStyle.Wood_Slim;
            break;
            
            case "Wood_Wide":
                return PictureFrameStyle.Wood_Wide;
            break;
            
            case "Wood_Twigs":
                return PictureFrameStyle.Wood_Twigs;
            break;
            
            case "Canvas":
                return PictureFrameStyle.Canvas;
            break;
            
            default:
                return PictureFrameStyle.None;
            break;
        }
    }
}

@Component("nft_object")
export class nft_object extends Entity 
{
    static isDebugging:boolean;

    public defIndex:number;
    public nftIndex:number;

    public interactionObj:Entity;

    constructor(def:number, nft:number) 
    {
        //initial entity initialization
        super();
        displayerDefs.isDebugging = false;

        //set index
        this.defIndex = def;
        this.nftIndex = nft;

        //  set position and scale
        var pos = data_nft_object[this.defIndex].nfts[this.nftIndex].position.split('_');
        var sca = data_nft_object[this.defIndex].nfts[this.nftIndex].scale.split('_');
        var rot = data_nft_object[this.defIndex].nfts[this.nftIndex].rotation.split('_');
        //  only load dynamic location if style is not 'free'
        if(data_nft_object[this.defIndex].type == "Free")
        {
            this.addComponent(new Transform
            ({
                position: new Vector3(+pos[0],+pos[1],+pos[2]),
                scale: new Vector3(+sca[0],+sca[1],+sca[2]),
                rotation: new Quaternion().setEuler(+rot[0],+rot[1],+rot[2])
            }));
        }
        else
        {
            var defPos:Vector3 = displayerDefs.positionDict.getItem(data_nft_object[this.defIndex].type+"_"+this.nftIndex.toString());
            var defRot:Quaternion = displayerDefs.rotationDict.getItem(data_nft_object[this.defIndex].type+"_"+this.nftIndex.toString());
            this.addComponent(new Transform
            ({
                position: new Vector3((+pos[0])+defPos.x,(+pos[1])+defPos.y,(+pos[2])+defPos.z),
                scale: new Vector3(+sca[0],+sca[1],+sca[2]),
                rotation: new Quaternion().setEuler((+rot[0])+defRot.x,(+rot[1])+defRot.y,(+rot[2])+defRot.z)
            }));
        }

        //add's display model
        this.addComponent(new GLTFShape("models/"+data_nft_object[this.defIndex].nfts[this.nftIndex].object+".glb"));

        //create interaction object
        this.interactionObj = new Entity();
        this.interactionObj.setParent(this);
        //  set object model
        if(data_nft_object[this.defIndex].nfts[this.nftIndex].interact_show == "True")
        {
            this.interactionObj.addComponent(new BoxShape());
        }
        else
        {
            this.interactionObj.addComponent(new GLTFShape("models/galleryInteractObject.glb"));
        }
        //  set position and scale
        var pos = data_nft_object[this.defIndex].nfts[this.nftIndex].interact_position.split('_');
        var sca = data_nft_object[this.defIndex].nfts[this.nftIndex].interact_scale.split('_');
        var rot = data_nft_object[this.defIndex].nfts[this.nftIndex].interact_rotation.split('_');
        this.interactionObj.addComponent(new Transform
        ({
            position: new Vector3(+pos[0],+pos[1],+pos[2]),
            scale: new Vector3(+sca[0],+sca[1],+sca[2]),
            rotation: new Quaternion().setEuler(+rot[0],+rot[1],+rot[2])
        }));

        //add interaction: inspect nft in-game
        this.interactionObj.addComponent(
            //add click action listener
            new OnPointerDown
            (
                (e) => 
                {
                    //display standard info for NFTbased on chain
                    if(data_nft_object[this.defIndex].nfts[this.nftIndex].chain == "polygon")
                    {

                    }
                    else
                    {
                        openNFTDialog(
                            data_nft_object[this.defIndex].nfts[this.nftIndex].chain+"://"
                            +data_nft_object[this.defIndex].nfts[this.nftIndex].contract+"/"
                            +data_nft_object[this.defIndex].nfts[this.nftIndex].token
                        );
                    }
                },
                {
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: "Inspect",
                    distance: 8,
                }
            )
        );

        //add interaction: open website
        this.interactionObj.addComponent(
            //add click action listener
            new OnPointerUp
            (
                (e) => 
                {
                    //external link based on chain
                    if(data_nft_object[this.defIndex].nfts[this.nftIndex].chain == "polygon")
                    {
                        openExternalURL(
                            "https://opensea.io/assets/matic/"
                            +data_nft_object[this.defIndex].nfts[this.nftIndex].contract+"/"
                            +data_nft_object[this.defIndex].nfts[this.nftIndex].token
                        );
                    }
                    else
                    {
                        openExternalURL(
                            "https://opensea.io/assets/"
                            +data_nft_object[this.defIndex].nfts[this.nftIndex].contract+"/"
                            +data_nft_object[this.defIndex].nfts[this.nftIndex].token
                        );
                    }
                },
                {
                    button: ActionButton.SECONDARY,
                    showFeedback: true,
                    hoverText: "Website",
                    distance: 8,
                }
            )
        );

        if(displayerDefs.isDebugging) log("NFT: "+this.defIndex.toString()+"-"+this.nftIndex.toString()+", pos: "+this.getComponent(Transform).position.toString());
    }
}

//stores positional data for each displayer object's node point
export class displayerDefs
{
    static isDebugging:boolean;

    public static positionDict = new Dictionary<Vector3>();
    public static rotationDict = new Dictionary<Quaternion>();

    //used to load in all frame definitions
    public static Initialize()
    {
        displayerDefs.isDebugging = false;

        //initialize collections
        displayerDefs.positionDict = new Dictionary<Vector3>();
        displayerDefs.rotationDict = new Dictionary<Quaternion>();

        //populate data
        for(var index:number=0; index<data_nft_display_objects.length; index++)
        {
            for(var val:number=0; val<data_nft_display_objects[index].nfts.length; val++)
            {
                var pos = data_nft_display_objects[index].nfts[val].position.split('_');
                displayerDefs.positionDict.add(data_nft_display_objects[index].type+"_"+val.toString(), new Vector3(+pos[0],+pos[1],+pos[2]));
                var rot = data_nft_display_objects[index].nfts[val].rotation.split('_');
                displayerDefs.rotationDict.add(data_nft_display_objects[index].type+"_"+val.toString(), new Quaternion().setEuler(+rot[0],+rot[1],+rot[2]));

                
                if(displayerDefs.isDebugging) log
                (
                    "loaded NFT displayer "+(data_nft_display_objects[index].type+"_"+val.toString())+" ("+index.toString()+"-"+val.toString()+")"
                    +": pos="+displayerDefs.positionDict.getItem(data_nft_display_objects[index].type+"_"+val.toString()).toString()
                    +", rot="+displayerDefs.rotationDict.getItem(data_nft_display_objects[index].type+"_"+val.toString()).toString()
                );
            }
        }
    }
}