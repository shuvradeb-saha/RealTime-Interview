$(document).ready(function (){
    console.log("start");
    
    $('[name=update]').click(function(){  
        console.log("abc");
        let workingObject = $(this).parent().parent().parent();
        let problemId = workingObject.find('input').val();
        let userName = $('#userName').val();
        console.log('Problem id: ' + problemId);
        $.ajax({
            type: "GET",
            url : "/admin/"+ userName +"/problems/"+problemId,
            success: function(problem){
                dhukao(problem)
            },
            error: function(e){
                alert("Error");
            }
        });
    });


    function dhukao(problem){
        $('#_id').val(problem.problemId);
        $('#title').val(problem.problemTitle);
        $('#timeLimit').val(problem.timeLimit);
        $('#memoryLimit').val(problem.memoryLimit);
        $('#details').val(problem.problemDetails);
        $('#sampleInput').val(problem.sampleInput);
        $('#sampleOutput').val(problem.sampleOutput);
        $('#input').val(problem.input);
        $('#output').val(problem.output);
        $('#myModal').modal('show'); 
    }
}
);