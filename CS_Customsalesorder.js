/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */

define(['N/record','N/ui/dialog'] , function (record,dialog){

    function ShowRelatedRecordDialog(){
        try{
            console.log("Button clicked!")
        var salesOrderId = Number(location.search.match(/id=([^&]+)/)[1])
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId,
            isDynamic: true
        })
        var linecount = salesOrder.getLineCount({ sublistId : 'links'})
        var dialogMessage = ' '
        for (var i=0 ; i < linecount ; i++){
            var relatedrecordType = salesOrder.getSublistText({
                sublistId : 'links',
                fieldId: 'type',
                line: i 
            }) || 'empty'
            var relatedrecordnumber = salesOrder.getSublistValue({
                sublistId : 'links',
                fieldId: 'tranid',
                line: i
            }) || 'empty'

            var relatedrecordstatus = salesOrder.getSublistValue({
                sublistId : 'links',
                fieldId: 'status',
                line: i
            }) || 'empty'

            
            var relatedrecorddate = salesOrder.getSublistValue({
                sublistId : 'links',
                fieldId: 'trandate',
                line: i
            }) || 'empty'

            dialogMessage +='Related Records Type: ' + relatedrecordType + ' , ' +  '\n' +  'Related Record date: ' + relatedrecorddate + ' , ' +  '\n' +  'Related records number : ' + relatedrecordnumber  +  ' , '  + '\n' +  'Related records status : ' +  '\n' +  relatedrecordstatus ;
            
            
            

            log.debug({
                title: "line related records details: ",
                details: dialogMessage
            })
        }

         

        dialog.alert({
            title: "Related Records",
            message: dialogMessage
        })
        }
        catch(e){
            log.error({
                title: e.title,
                details: e.message
            })
        }
    }


    function pageInit(context){
        ShowRelatedRecordDialog()
    }
    return {
        pageInit: pageInit,
        ShowRelatedRecordDialog: ShowRelatedRecordDialog
    }
})
