/**
 *@NApiVersion 2.1
 */
define([
    '../UseCase/itemFulfillmentLoadById.js',
    '../UseCase/getCustomerInventoryListByItemFulfillment.js',
    '../UseCase/createcustomerInventoryList.js',
    '../UseCase/updateItemFulfillmentProcessed.js'
], function (itemFulfillmentLoadById, getCustomerInventoryListByItemFulfillment, createCustomerInventoryList, updateItemFulfillmentProcessed) {

    function getListOfItemFulfillment() {
        log.debug('Getting list of Item Fulfillment')
        return itemFulfillmentRepository
            .getListWithFilter(
                [
                    ["recordtype", "contains", "itemfulfillment"],
                    ["mainline", "is", "F"],
                    ["custbody_wbox_cust_inventory_processed", "is", "F"],
                    ["status", "anyof", "ItemShip:C"]
                ]
            )
    }

    function generateCustomerInventory(itemfulfillmentId) {
        let itemfulfillment = itemFulfillmentLoadById.execute(itemfulfillmentId)

        let listOfCustomerInventory = getCustomerInventoryListByItemFulfillment.execute(itemfulfillment)

        createCustomerInventoryList.execute(listOfCustomerInventory)

        updateItemFulfillmentProcessed.execute(itemfulfillmentId)
    }

    return {
        getListOfItemFulfillment,
        generateCustomerInventory
    }
})