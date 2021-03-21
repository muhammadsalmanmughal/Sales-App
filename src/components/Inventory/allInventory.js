import React, { useState, useEffect } from 'react'
import firebase from '../../config/Firebase/firebase';

const AllInventory = () => {
    const [inventoryItems, setInventoryItems] = useState()

    const getAllInventoryItems = () => {
        firebase
            .firestore()
            .collection("Item_Master")
            .onSnapshot(function (querySnapshot) {
                const inventoryList = [];
                querySnapshot.forEach(function (doc) {
                    console.log('functions Doc', doc.data)
                    if (doc.exists) {
                        const comp = doc.data();
                        // inventoryList.push({ ...comp, itemName:itemName , itemeSize: itemSize, unitOfMeassure:unitOfMeassure});

                        inventoryList.push(comp);

                        // setIsCustomer(true)
                    } else {
                        // setIsCustomer(false)
                    }
                });
                setInventoryItems(inventoryList)
            });
    }
    useEffect(() => {
        getAllInventoryItems()
    }, [])
    return (
        <div>
            <h1>All Inventory</h1>
            {console.log('All inventory from firebase', inventoryItems&&inventoryItems)}
            {/* <ul> */}

            {inventoryItems&&inventoryItems.map((items, key) => {
                {return items.itemsList&&items.itemsList.map((invenItems, keys)=>{
                    return (
                        <ul>
    
                            <li contentEditable>
                                {invenItems.itemSize}
                            </li>
                            <li>
                                {invenItems.itemName}
                            </li>
                            <li>
                                {invenItems.unitOfMeassure}
                            </li>
                        </ul>
                    )
                })}
                // {console.log('map items', items)}
              
            })}
            {/* </ul> */}
        </div>
    )
}
export default AllInventory