$(document).ready(function () {
    var selectedQuestion = '';
    var selectedAnswer = '';
    var audio = $('#audioPlayer');
    setTimeout(function () {
        $('#preloader').css('display', 'none');
        $('.content').css('left', '0');
    }, 1000)
    
    $('.queClick').each(function () {
        var parent = $(this).parent();
        var childrens = parent.children();
        
        $(this).click(function (e) {
            if(!$(childrens[0]).hasClass('disable')){
                $('.question .circle').each(function () {
                    $(this).removeClass('selected');
                })
                $(childrens[1]).addClass("selected");
                selectedQuestion = parent.attr('data-question-id');
            }
        });
    })
    $('.option').each(function () {
        var parent = $(this).parent();
        var childrens = parent.children();
        $(this).click(function () {
            if (selectedQuestion !== '') {
                if(!$(childrens[0]).hasClass('disable')){
                    $(childrens[0]).addClass("selected");
                selectedAnswer = parent.attr('data-answer-id');
                if (selectedAnswer == selectedQuestion) {
                    $('.lines svg polyline:eq(' + (selectedAnswer - 1) + ')').css("display", "inline");
                    $('.questions .question:eq(' + (selectedAnswer - 1) + ') .circle').removeClass('selected');
                    $('.questions .question:eq(' + (selectedAnswer - 1) + ') .circle, .questions .question:eq(' + (selectedAnswer - 1) + ') img').addClass('disable');
                    $(childrens[0]).removeClass("selected");
                    $(childrens[0]).addClass("disable");
                    $(childrens[1]).addClass("disable");
                    selectedAnswer = '';
                    selectedQuestion = '';
                    $(audio).attr('src', 'assets/sounds/correct.mp3');
                    var playAudio = new Audio('assets/sounds/correct.mp3');
                    playAudio.play();
                    let comp = completed();
                    if(comp){
                        $('.showAns').addClass('disable');
                    }
                }
                if(selectedAnswer != selectedQuestion){
                    $(childrens[0]).removeClass("selected");
                    $(audio).attr('src', 'assets/sounds/incorrect.mp3');
                    var playAudio = new Audio('assets/sounds/incorrect.mp3');
                    playAudio.play();
                    $(childrens[2]).css('display','block');
                    setTimeout(function(){
                        $(childrens[2]).css('display','none');
                    },1000)
                }
                }
                
            }
        })

    })

    $('.showAns').click(function(){
        if(!$(this).hasClass('disable')){
            $('.lines svg polyline').each(function(){
                $(this).css("display", "inline");
            });
            $('.queClick, .option').each(function(){
                $(this).addClass('disable');
            });
            $('.question .circle, .answer .circle').each(function(){
                $(this).removeClass('selected');
            })
            $(this).addClass('disable')
            selectedAnswer = '';
            selectedQuestion = '';
        }
    })

    $('.reload').click(function(){
        selectedAnswer = '';
        selectedQuestion = '';
        $('.lines svg polyline').each(function(){
            $(this).css("display", "none");
        });
        $('.queClick, .option').each(function(){
            $(this).removeClass('disable');
        })
        $('.showAns').removeClass('disable')
    })

    function completed(){
        let comp = false;
        $('.queClick').each(function(){
            if($(this).hasClass('disable')){
                comp = true;
            }else{
                comp = false;
            }
        });
        return comp
    }

    $('.open_resource_popup').click(function(){
        $('.popup').css('display','block');
    });
    $('.close_btn').click(function(){
        $('.popup').css('display','none');
    });
    $('.open_help_popup').click(function(){
        $('.help_popup').css('display','block');
    });
    $('.close_help_btn').click(function(){
        $('.help_popup').css('display','none');
    })
});