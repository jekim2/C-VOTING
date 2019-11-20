(function($, undefined){

    window.cVotingUtil = {
	};


    cVotingUtil.callPlugin = function(id, param){
        var bridge = window.KKJBridge;

        var data = {
            "id" : id,
            "param" : param
        };

        bridge.callPlugin(JSON.stringify(data));
    }

    cVotingUtil.testPlugin = function(){
        var param = {
            test_data : "data",
            callback : "callback" //콜백 받을 함수 명
        };

        cVotingUtil.callPlugin("TEST", param);
    }

    cVotingUtil.showDiscussionPage = function(data) {
        
        console.log("showDiscussionPage " , JSON.stringify(data));

        if (data !== null && data !== undefined && data !== '') {
            var param = {
                page_data :data 
                // callback : "callback" //콜백 받을 함수 명
            };
        
            cVotingUtil.callPlugin("SHOW_DISCUSSION", param);
        }   
            
    }

    cVotingUtil.callback = function(result) {
        console.log(JSON.stringify(result));
    }

    cVotingUtil.setStorage = function() {
        var param = {
            storage_name : "hahaha",
            data : [
                {"name" : "간간지"},
                {"age" : "197"},
                {"height" : "997"},
                {"phoneNum" : "01090000000"}
            ],
            callback : "callback" //콜백 받을 함수 명
        };

        cVotingUtil.callPlugin("SET_SHARED_STORAGE", param);
    }

    cVotingUtil.getStorage = function(callback) {

        var res = {"result" : true};
        var param = {
            storage_name : "",
            callback: "cVotingUtil.getData"
        }

        cVotingUtil.callPlugin("GET_SHARED_STORAGE", param);

        if (callback) {
            callback(res)
        }
    }

    cVotingUtil.getData = function(res,callback)  {
        console.log("res >>>>>>>>>" , JSON.stringify(res));
        if (callback) {
            callback(res);
        }
    } 



})(jQuery, undefined);