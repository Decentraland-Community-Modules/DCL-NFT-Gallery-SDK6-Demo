/*      FRAME DATA
    this file contains the data for each display piece that can be created for the scene.
    display pieces can hold a given amount of NFTs in each object definition ('nfts' array)
    and will station NFTs based on their defined order. 

    ADDING NEW DISPLAY DEFINITION:
        1) create definition - copy/paste one of the definitions below, rename it's type (this
            must be unique to all other types), and define the locations of the NFTs it will
            display
        2) create object - create the object in any modeling software and export it as a '.glb'
            type. you must name the object as 'GallerDisplay_'+(your type). so if your new display
            is of a 'sudo' type, your exported object would be named 'GallerDisplay_sudo'. this
            file should be stored in your scene's 'models' folder.

        after completing those two steps you can call your new display type through the nftDisplayData.ts
        file. please note that you will need to force reload the page whenever new models are added to
        DCL's preview (just hit the refresh button to load in your new models).
    
        some values are packed in a serialized format, ex:
            transform positions are composed of 3 numbers, but are stored
            as a string (set of characters). if you want to position a display
            at scene location 1,0,5 you would then write "1_0_5"

    Author: Alex Pazder, thecryptotrader69@gmail.com
*/
export const data_nft_display_objects =
[
    //  2D DISPLAYS
    //standard 2-sided display
    {
        //display identifier
        type: "Standard",
        //nft positions
        nfts:
        [
            { position: "0_2.65_-0.2", rotation: "0_0_0" },
            { position: "0_2.65_0.2", rotation: "0_180_0" }
        ]
    },
    //square 4-sided display
    {
        //display type
        type: "Square",
        //nft positions
        nfts:
        [
            { position: "0_2.65_-1.8", rotation: "0_0_0" },
            { position: "-1.8_2.65_0", rotation: "0_90_0" },
            { position: "0_2.65_1.8", rotation: "0_180_0" },
            { position: "1.8_2.65_0", rotation: "0_270_0" }
        ]
    },
    //  3D DISPLAYS
    //single central display
    {
        //display type
        type: "Pedestal",
        //nft positions
        nfts:
        [
            { position: "0_1.7_0", rotation: "0_0_0" }
        ]
    },
    //  3D DISPLAYS
    //single central display
    {
        //display type
        type: "Shelf",
        //nft positions
        nfts:
        [
            { position: "-0.5_0.5_-0.5", rotation: "0_0_0" },
            { position: "0.5_0.5_-0.5", rotation: "0_0_0" },
            { position: "-0.5_1.5_0.5", rotation: "0_0_0" },
            { position: "0.5_1.5_0.5", rotation: "0_0_0" }
        ]
    }
]