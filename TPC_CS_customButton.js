/**
 * @NapiVersion 2.0
 * @NscriptType ClientScript
 */
define (['N/record','N/log','N/ui/dialog'] , function (record,log,dialog){
    function Salesrelatedrecords(){
        try{
            console.log("Button Clicked!")
            var SalesId = Number(location.search.match(/id=([^&]+)/)[1])
            var salesorder = record.load({
                type: record.Type.SALES_ORDER,
                id: SalesId,
                isDynamic: true
            })

            var dialogmessage = ''

            var linecount = salesorder.getLineCount({ sublistId : "links" })

            for ( var i= 0 ; i < linecount ; i++){
                var relatedrecordsType = salesorder.getSublistText({
                    sublistId: "links",
                    fieldId: "type",
                    line: i
                }) || "empty"

                var relatedrecordsNumber = salesorder.getSublistValue({
                    sublistId: "links",
                    fieldId: 'tranid',
                    line: i
                }) || 'empty'

                var relatedrecodsStatus = salesorder.getSublistText({
                    sublistId: "links",
                    fieldId : 'status',
                    line: i 
                }) || 'empty'

                var relatedrecordsAmount = salesorder.getSublistValue({
                    sublistId: "links",
                    fieldId: 'total',
                    line: i 
                }) || "empty"

                var relatedrecordsDate = salesorder.getSublistValue({
                    sublistId: "links",
                    fieldId: 'trandate',
                    line: i
                })

                dialogmessage +='Related Records Type: ' + relatedrecordsType + ' , ' +  '\n' +  'Related Record date: ' + relatedrecordsDate + ' , ' +  '\n' +  'Related records number : ' + relatedrecordsNumber  +  ' , '  + '\n' +  'Related records status : ' +  '\n' +  relatedrecodsStatus + '\n' +  'Related records Amount : ' + relatedrecordsAmount ;

                log.debug({
                    title: "Related Records: ",
                    details : dialogmessage
                })
            }

            dialog.alert({
                Title: "Related Records",
                message: dialogmessage
            })
            
        }
        catch(error){
            log.error({
                title: "Error occured in Related Records: " ,
                details: error.message
            })
        }

        
    }
    function pageInit(context){
        Salesrelatedrecords()
    }
    return {
        pageInit: pageInit,
        Salesrelatedrecords : Salesrelatedrecords
    }
})