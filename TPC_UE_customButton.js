/**
 * @NapiVersion 2.0
 * @NScriptType UserEventScript 
 */
define (['N/log' , 'N/search','N/runtime'] , function (log,search,runtime){

    function beforeLoad(context){
        try{
            if (context.type === context.UserEventType.VIEW){
                const currentUser = runtime.getCurrentUser()
                if (currentUser.role !== 2 && currentUser.role !== 3 ){
                    return
                }

                var form = context.form 
                form.addButton({
                    id : 'custpage_relatedrecords',
                    label : 'Related Records',
                    functionName : 'Salesrelatedrecords'
                })
                form.clientScriptModulePath = "SuiteScripts/shahmeer/TPC_CS_customButton.js"
            }
        }
        catch(error){
            log.error({
                title: "Error occured in beforeload function :",
                details: error.message 
            })
        }
    }
    return {
        beforeLoad : beforeLoad
    }
})