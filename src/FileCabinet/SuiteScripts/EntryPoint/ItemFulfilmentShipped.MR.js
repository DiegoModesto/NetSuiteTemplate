/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 */
define(['../Application/ItemFulfilmentShipped.js'], function (application) {

    function getInputData() {
        try {
            log.audit('Beggin of process')

            let savedSearch = application.getListOfItemFulfillment()

            log.debug('Saved search: ', savedSearch.runPaged({ pageSize: 50 }))

            return savedSearch
        } catch (error) {
            log.error('Error occours: GetInputData', error)
        }
    }

    function map(context) {
        log.debug('Context', context)

        try {
            let { id } = JSON.parse(context.value)

            application.generateCustomerInventory(id)
        } catch (error) {
            log.error('Error occours: Map', error)
        }
    }

    function summarize(summary) {
        log.debug('Summary: Finished process', summary)
    }

    return {
        getInputData: getInputData,
        map: map,
        summarize: summarize
    }
})
