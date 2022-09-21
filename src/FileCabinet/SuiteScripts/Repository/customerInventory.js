/**
 *@NApiVersion 2.1
 */
define([
      'N/record',
      '../Entity/customerInventory.js'
], function (record, customerInventoryEntity) {

      function create(customerInventory) {
            let custInvRec = record.create({ type: customerInventoryEntity.TableName })

            Object.keys(customerInventoryEntity.Fields).forEach((x, y) => {
                  custInvRec.setValue({
                        fieldId: customerInventoryEntity.Fields[x],
                        value: customerInventory[x]
                  })
            })

            return custInvRec.save()
      }

      return {
            create
      }
})