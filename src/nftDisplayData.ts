/*      NFT DATA 
    data here represents all NFTs that will be displayed in the scene.
    each capsule contains basic details for the NFT, such as: name,
    display position/rotation, link, and address. the current code
    below creates an object of each display type to showcase current
    options. 

    there are 2 data segements (1 for 2D frames and another for 3D
    objects). data structure varies slightly between these 2 options,
    so ensure you are using the correct definition and do not copy/paste
    between each type.

    ADDING A NEW NFT DISPLAY: 
        simply copy/paste one of the exsisting definitions and update its
        values. each definition is documented to make it easy to understand
        what each value does.

        some values are packed in a serialized format, ex:
            transform positions are composed of 3 numbers, but are stored
            as a string (set of characters). if you want to position a display
            at scene location 1,0,5 you would then write "1_0_5"
    
    display types:
        you can view all display types in the nftDisplayObjectData.ts file. while
        this module contains only a few prebuilt nft displayers, that file is 
        documented to make it easy to add your own. displayer definitions are not
        seperated by 2D or 3D, and can accept any type. all default display types include:
    
        "Free" : no display object, just a free standing NFT frame. you can add any amount
            of nft definitions to a single display definition
        "Standard" : wall-like display with 2 NFT slots
        "Square" :  pillar-like display with 4 NFT slots
        "Pedestal" : pedestal for displaying a single object
        "Shelf" : shelf with 4 NFT slots

    display styles:
        display styles apply to the frame of a 2D display. we're currently piggie-backing
        off the built-in nft-frame from the DCL SDK to generate the frame objects as it will
        make things easy to convert to this module. all the default styles from DCL are
        available, you can view them here: 
            https://docs.decentraland.org/development-guide/display-a-certified-nft/

    the first definition of each segment (2d frame and 3d object) are documented with more 
    information.

    Author: Alex Pazder, thecryptotrader69@gmail.com
*/
export const data_nft_frame =
[
    //free-form display (no model frame)
    {
        //displayer details
        type:       "Free",
        style:      "Canvas",
        //displayer positioning
        position:   "12_1.5_12",
        scale:      "3_3_3",
        rotation:   "0_0_0",
        //displayer colour
        colour:     "1_1_1",
        //nfts to display (in a 'Free' display type you can hold any number of NFT definitions)
        nfts:
        [
            //NFT 1
            { 
                //details of the targeted NFT, currently on ethereum is supported
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"15853",
                //positioning details of NFT (these offsets are compounded by the type definition)
                position:"-0.25_0_0", scale: "1_1_1", rotation: "0_0_0"
            },
            //NFT 2
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"12271",
                position:"0.25_0_0", scale: "1_1_1", rotation: "0_0_0"
            }
        ]
    },
    //standard 2-sided display (2 piece 2D)
    {
        //display type
        type:       "Standard",
        style:      "Canvas",
        //display positioning details
        position:   "20_0_12",
        scale:      "1_1_1",
        rotation:   "0_0_0",
        //display colour
        colour:     "1_1_1",
        //nft details (in a defined display type you must hold the number of NFTs defined in it's data definition)
        nfts:
        [
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"15853",
                position:"0_0_0", scale: "5_5_5", rotation: "0_0_0"
            },
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"12271",
                position:"0_0_0", scale: "5_5_5", rotation: "0_180_0"
            }
        ]
    },
    //square 4-sided display (4 piece 2D)
    {
        //display type
        type:       "Square",
        style:      "Canvas",
        //display positioning details
        position:   "28_0_12",
        scale:      "1_1_1",
        rotation:   "0_0_0",
        //display colour
        colour:     "1_1_1",
        //nft details
        nfts:
        [
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"15853",
                position:"0_0_0", scale: "5_5_5", rotation: "0_0_0"
            },
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"12271",
                position:"0_0_0", scale: "5_5_5", rotation: "0_90_0"
            },
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"15853",
                position:"0_0_0", scale: "5_5_5", rotation: "0_180_0"
            },
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"12271",
                position:"0_0_0", scale: "5_5_5", rotation: "0_270_0"
            }
        ]
    }
]
export const data_nft_object =
[
    //free-form display (no model frame)
    {
        //display type
        type:       "Free",
        //display positioning details
        position:   "12_0_28",
        scale:      "1_1_1",
        rotation:   "0_0_0",
        //display colour
        colour:     "1_1_1",
        //nft details
        nfts:
        [
            { 
                //details of the targeted NFT, currently on ethereum is supported
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"15853", object: "dcl_hat",
                //positioning details of NFT (these offsets are compounded by the type definition)
                position:"0_0_0", scale: "1_1_1", rotation: "0_180_0",
                //interaction objects provide callbacks for a user when they press a button to view the NFT's details
                //  to help with debugging placement, you can set 'interact_show' as true to make the object visible (it will be a white box) 
                interact_position:"0_1.8_0", interact_scale: "0.25_0.25_0.25", interact_rotation: "0_0_0", interact_show: "False"
            },
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"12271", object: "dcl_shirt",
                position:"0_0_0", scale: "1_1_1", rotation: "0_180_0",
                interact_position:"0_1.25_0", interact_scale: "0.4_0.6_0.25", interact_rotation: "0_0_0", interact_show: "False"
            }
        ]
    },
    //central display (1 piece 3D)
    {
        //display type
        type:       "Pedestal",
        //display positioning details
        position:   "20_0_28",
        scale:      "1_1_1",
        rotation:   "0_0_0",
        //display colour
        colour:     "1_1_1",
        //nft details
        nfts:
        [
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"15853", object: "dcl_hat",
                position:"0_-1.5_0", scale: "1_1_1", rotation: "0_180_0",
                interact_position:"0_1.8_0", interact_scale: "0.25_0.25_0.25", interact_rotation: "0_0_0", interact_show: "False"
            }
        ]
    },
    //central display (1 piece 3D)
    {
        //display type
        type:       "Shelf",
        //display positioning details
        position:   "28_0_28",
        scale:      "1_1_1",
        rotation:   "0_0_0",
        //display colour
        colour:     "1_1_1",
        //nft details
        nfts:
        [
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"15853", object: "dcl_hat",
                position:"0_-1.5_0", scale: "1_1_1", rotation: "0_180_0",
                interact_position:"0_1.8_0", interact_scale: "0.25_0.25_0.25", interact_rotation: "0_0_0", interact_show: "False"
            },
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"15853", object: "dcl_hat",
                position:"0_-1.5_0", scale: "1_1_1", rotation: "0_180_0",
                interact_position:"0_1.8_0", interact_scale: "0.25_0.25_0.25", interact_rotation: "0_0_0", interact_show: "False"
            },
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"15853", object: "dcl_hat",
                position:"0_-1.5_0", scale: "1_1_1", rotation: "0_180_0",
                interact_position:"0_1.8_0", interact_scale: "0.25_0.25_0.25", interact_rotation: "0_0_0", interact_show: "False"
            },
            { 
                chain:"ethereum", contract:"0xd35147be6401dcb20811f2104c33de8e97ed6818", token:"15853", object: "dcl_hat",
                position:"0_-1.5_0", scale: "1_1_1", rotation: "0_180_0",
                interact_position:"0_1.8_0", interact_scale: "0.25_0.25_0.25", interact_rotation: "0_0_0", interact_show: "False"
            }
        ]
    }
]