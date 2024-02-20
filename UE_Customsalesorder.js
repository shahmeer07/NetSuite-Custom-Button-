/**
 * @NapiVersion 2.0
 * @NScriptType UserEventScript
 */

define(['N/ui/dialog', 'N/record', 'N/runtime'], function(dialog, record, runtime) {
    function beforeLoad(context) {
       try{
        if (context.type === context.UserEventType.VIEW) {
            var currentUser = runtime.getCurrentUser();
            log.debug({
                title: "CurrentUser",
                details: currentUser.role
            });
            if (currentUser.role !== 3){
                return
            }

            // var currentUser = runtime.getCurrentUser();
            // var allowedRoles = ['Administrator'];
            // if (allowedRoles.indexOf(String(currentUser.role)) === -1) {
            //     return;
            // }
            var form = context.form;
            form.addButton({
                id: 'custpage_related_records_btn',
                label: 'Related Records',
                functionName: 'ShowRelatedRecordDialog' 
            });
            form.clientScriptModulePath = 'SuiteScripts/Shahmeer Khan/CS_Customsalesorder.js';
        }
       }
       catch(e){
        log.error({
            title : e.title,
            details: e.message
        })
       }
    }
    return {
        beforeLoad: beforeLoad
    };
});
