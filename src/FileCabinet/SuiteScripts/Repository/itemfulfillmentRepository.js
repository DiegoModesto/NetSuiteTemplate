/**
 *@NApiVersion 2.1
 */
define([
      'N/record',
      'N/search'
], function (record, search, itemFulfillmentEntity) {

      const searchColumns = [
            search.createColumn({ name: "mainline", label: "*" }),
            search.createColumn({ name: "internalId", label: "internalId" }),
            search.createColumn({ name: "trandate", label: "Date" }),
            search.createColumn({ name: "asofdate", label: "As-Of Date" }),
            search.createColumn({ name: "postingperiod", label: "Period" }),
            search.createColumn({ name: "taxperiod", label: "Tax Period" }),
            search.createColumn({ name: "type", label: "Type" }),
            search.createColumn({ name: "tranid", label: "Document Number" }),
            search.createColumn({ name: "entity", label: "Name" }),
            search.createColumn({ name: "account", label: "Account" }),
            search.createColumn({ name: "memo", label: "Memo" }),
            search.createColumn({ name: "amount", label: "Amount" }),
            search.createColumn({
                  name: "ordertype",
                  sort: search.Sort.ASC,
                  label: "Order Type"
            }),
      ]

      function getListWithFilter(paramFilters) {
            let savedSearch = search.create({
                  type: search.Type.TRANSACTION,
                  filters: [
                        ["recordtype", "contains", "itemfulfillment"],
                        'AND',
                        ["mainline", "is", "F"],
                        'AND',
                        ["custbody_wbox_cust_inventory_processed", "is", "F"],
                        'AND',
                        ["status", "anyof", "ItemShip:C"]
                  ],
                  columns: searchColumns
            })

            /*paramFilters.forEach((item, index) => {
                  savedSearch.filters.push(item)
                  if (index === (paramFilters.length - 1)) return
                  savedSearch.filters.push('AND')
            })*/

            log.debug('SavedSearch', savedSearch)

            return savedSearch
      }

      function loadById(itemfulfillmentId) {
            return record.load({ id: itemfulfillmentId, type: record.Type.ITEM_FULFILLMENT })
      }

      function markAsProcessed(itemfulfillmentId) {
            return record.submitFields({
                  type: record.Type.ITEM_FULFILLMENT,
                  id: itemfulfillmentId,
                  values: { 'custbody_wbox_cust_inventory_processed': 'T' },
            })
      }

      return {
            getListWithFilter,
            loadById,
            markAsProcessed
      }
})