/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */

define(['N/record','N/ui/dialog'] , function (record,dialog){

    function ShowRelatedRecordDialog(){
        console.log("Button clicked!")
        var salesOrderId = Number(location.search.match(/id=([^&]+)/)[1])
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        })
        var customerId = salesOrder.getValue({ fieldId: 'entity' })
        var customername = salesOrder.getText({ fieldId : 'entity'})
        var customertype = salesOrder.getValue({ fieldId : 'isperson'})
        var customeremail = salesOrder.getValue({ fieldId:'email'})
        var salesrep = salesOrder.getText({fieldId: 'salesrep'})

        var dialogMessage = 'Customer ID : ' + customerId + '\n' +
                        'Customer Name : ' + customername + '\n' +
                        'Customer Type : ' + customertype + '\n' +
                        'Customer Email : ' + customeremail + '\n' +
                        'Sales Representative : ' + salesrep  ; 

        dialog.alert({
            title: "Related Records",
            message: dialogMessage
        })
    }


    function pageInit(context){
        ShowRelatedRecordDialog()
    }
    return {
        pageInit: pageInit,
        ShowRelatedRecordDialog: ShowRelatedRecordDialog
    }
})
