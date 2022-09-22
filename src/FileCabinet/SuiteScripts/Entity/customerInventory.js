/**
 *@NApiVersion 2.1
 */
define([], function () {
      return {
            TableName: 'customrecord_wbx_customer_inventory',
            Fields: {
                  SerialNumber: 'custrecord_wbx_ci_serial_number',
                  SalesOrder: 'custrecord_wbx_ci_sales_order',
                  ItemFulfillment: 'custrecord_wbx_ci_item_ful',
                  //Status: 'custrecord_wbx_ci_status',
                  Customer: 'custrecord_wbx_ci_customer',
                  BaseCountry: 'custrecord_wbx_ci_country',
                  SKU: 'custrecord_wbx_ci_sku',
            }
      }
})