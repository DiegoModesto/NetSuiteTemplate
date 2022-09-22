/**
 *@NApiVersion 2.1
 */
define([
    '../Repository/itemfulfillmentRepository.js',
    '../UseCase/itemFulfillmentLoadById.js',
    '../UseCase/getCustomerInventoryListByItemFulfillment.js',
    '../UseCase/createcustomerInventoryList.js',
    '../UseCase/updateItemFulfillmentProcessed.js'
], function (itemFulfillmentRepository, itemFulfillmentLoadById, getCustomerInventoryListByItemFulfillment, createCustomerInventoryList, updateItemFulfillmentProcessed) {

    function getListOfItemFulfillment() {
        log.debug('Getting list of Item Fulfillment')

        return itemFulfillmentRepository
            .getListWithFilter(
                [
                    ["recordtype", "contains", "itemfulfillment"],
                    ["mainline", "is", "T"],
                    ["custbody_wbox_cust_inventory_processed", "is", "F"],
                    ["status", "anyof", "ItemShip:C"],
                    ["customermain.custentity_wbx_ci_tracking", "is", "T"]
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