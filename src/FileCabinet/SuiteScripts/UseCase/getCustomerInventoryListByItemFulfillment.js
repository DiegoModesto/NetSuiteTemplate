/**
 *@NApiVersion 2.1
 */
define([], function () {

      const customerInventoryList = []

      function execute(itemfulfillment) {

            const itemFulfillmentId = itemfulfillment.getValue({ fieldId: 'id' })
            const customerId = itemfulfillment.getValue({ fieldId: 'entity' })
            const salesOrderId = itemfulfillment.getValue({ fieldId: 'createdfrom' })
            const subsidiaryId = itemfulfillment.getValue({ fieldId: 'subsidiary' })

            let itemfulfilCount = itemfulfillment.getLineCount({ sublistId: 'item' })

            //Loop to get All Lines in Itemfulfillment
            for (let invIndex = 0; invIndex < itemfulfilCount; invIndex++) {

                  let itemId = itemfulfillment.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'item',
                        line: invIndex
                  })

                  let inventoryDetail = itemfulfillment.getSublistSubrecord({
                        sublistId: 'item',
                        fieldId: 'inventorydetail',
                        line: invIndex
                  })

                  let invtDetCount = inventoryDetail.getLineCount({
                        sublistId: 'inventoryassignment'
                  })

                  //Loop to get ALL Lines inner Inventory Details
                  for (let detIndex = 0; detIndex < invtDetCount; detIndex++) {
                        let serialNumberId = inventoryDetail.getSublistValue({
                              sublistId: 'inventoryassignment',
                              fieldId: 'issueinventorynumber',
                              line: detIndex
                        })

                        let statusId = inventoryDetail.getSublistValue({
                              sublistId: 'inventoryassignment',
                              fieldId: 'inventorystatus',
                              line: detIndex
                        })

                        //Add the info of Customer Inventory Item
                        customerInventoryList.push({
                              SerialNumber: serialNumberId,
                              SalesOrder: salesOrderId,
                              ItemFulfillment: itemFulfillmentId,
                              Status: statusId,
                              Customer: customerId,
                              BaseCountry: subsidiaryId,
                              SKU: itemId,
                        })
                  }
            }

            return customerInventoryList
      }

      return {
            execute
      }
})