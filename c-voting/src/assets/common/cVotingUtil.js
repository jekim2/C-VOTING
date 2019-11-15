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

})(jQuery, undefined);