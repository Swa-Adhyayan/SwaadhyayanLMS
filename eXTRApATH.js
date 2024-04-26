function showLearningActivity(activityurl,htmlUrl=""){
            let classID = $("#isCustomClass").attr("value");
            let activityPath = "";
            if(htmlUrl=="Exercise"){
            	activityPath = "https://swaadhyayan.com/data/e-Learning/otherActivity/"+activityurl+"/index.html";
            }else if(htmlUrl=="VirtualTour"){
            	activityPath = "https://swaadhyayan.com/data/e-Learning/otherActivity/"+activityurl+"/index.php";
            }else{
            	activityPath = "https://swaadhyayan.com/data/e-Learning/?"+activityurl;
            }
            let activity = "<iframe id='activity-js-viewer' src='"+activityPath+"' frameborder='0' style='width:100%; height:100%;'></iframe>";
            $('.learningContent').html( activity );
}