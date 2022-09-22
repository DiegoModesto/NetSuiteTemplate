/**
 *@NApiVersion 2.1
 */
define([
      '../Repository/customerInventory.js'
], function (customerInventoryRepository) {

      function execute(customerInventoryList) {
            if (!Array.isArray(customerInventoryList)) throw new Exception("YOU_NEED_PASS_A_LIST")
            let custInvListIds = []

            customerInventoryList.forEach(custInv => {
                  custInvListIds.push(
                        customerInventoryRepository.create(custInv)
                  )
            })

            return custInvListIds
      }

      return {
            execute
      }
})