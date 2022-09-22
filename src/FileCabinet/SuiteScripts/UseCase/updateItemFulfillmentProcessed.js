/**
 *@NApiVersion 2.1
 */
define([
      '../Repository/itemfulfillmentRepository.js'
], function (itemFulfillmentRepository) {

      function execute(itemFulfillmentId) {
            return itemFulfillmentRepository.markAsProcessed(itemFulfillmentId)
      }

      return {
            execute
      }
})