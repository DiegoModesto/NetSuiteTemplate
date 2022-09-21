/**
 *@NApiVersion 2.1
 */
define(['../Repository/itemfulfillmentRepository.js'], function (itemFulfillmentRepository) {

      function execute(itemfulfillmentId) {
            let itemfulfillment = itemFulfillmentRepository.loadById(itemfulfillmentId)

            if (!itemfulfillment) throw new Exception("ITEM_FULFILLMENT_NOT_LOADED")

            return itemfulfillment
      }

      return {
            execute
      }
})