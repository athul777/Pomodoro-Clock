$(document).ready(function () {
    var sessionTimeCounter = 25;
    var breakTimeCounter = 5;
    var sessionTextHead = 'Session';
    var timer;
    var maintextTime = sessionTimeCounter;
    var testBool = false;
    var runningBool = false;
    var numSec = sessionTimeCounter * 60;
    var numSec2 = breakTimeCounter * 60;
    
    $('#mainTextTime').html(sessionTimeCounter);
    $('#sessionTextHead').html(sessionTextHead);
    $('#session-time').html(sessionTimeCounter);
    $('#break-time').html('0' + breakTimeCounter);
    //the minus and plus buttons
    $('#break-minus').click(function () {
        if (breakTimeCounter > 1 && testBool === false) {
            breakTimeCounter = breakTimeCounter - 1;
            if (breakTimeCounter < 10) {
                $('#break-time').html('0' + breakTimeCounter);
            }
            else {
                $('#break-time').html(breakTimeCounter);
            }
            numSec2 = breakTimeCounter * 60;
        }
    });
    $('#break-plus').click(function () {
        if (breakTimeCounter < 1440 && testBool === false) {
            breakTimeCounter = breakTimeCounter + 1;
            if (breakTimeCounter < 10) {
                $('#break-time').html('0' + breakTimeCounter);
            }
            else {
                $('#break-time').html(breakTimeCounter);
            }
            numSec2 = breakTimeCounter * 60;
        }
    });
    $('#session-minus').click(function () {
        if (sessionTimeCounter > 1 && testBool === false) {
            sessionTimeCounter = sessionTimeCounter - 1;
            if (sessionTimeCounter < 10) {
                $('#session-time').html('0' + sessionTimeCounter);
            }
            else {
                $('#session-time').html(sessionTimeCounter);
            }
            numSec = sessionTimeCounter * 60;
            $('#mainTextTime').html(sessionTimeCounter);
        }
    });
    $('#session-plus').click(function () {
        if (sessionTimeCounter < 1440 && testBool === false) {
            sessionTimeCounter = sessionTimeCounter + 1;
            if (sessionTimeCounter < 10) {
                $('#session-time').html('0' + sessionTimeCounter);
            }
            else {
                $('#session-time').html(sessionTimeCounter);
            }
            numSec = sessionTimeCounter * 60;
            $('#mainTextTime').html(sessionTimeCounter);
        }
    });

    //converts seconds to hours + minutes + seconds
    function convertTo (num) {
        var hours = Math.floor(num/3600);
        var minutes = Math.floor((num%3600)/60);
        var seconds = num%60;
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        var finalCount = hours + ':' + minutes + ':' + seconds;
        return finalCount;
    }

    //for the start button
    function start () {
        if (runningBool === false) {
            timer = setInterval(timeReduce, 1000);
            runningBool = true;
        }
    }

    //dcrements the time, changes between session and break, and adds sounds
    function timeReduce () {
        var soundSource = 'http://soundbible.com/grab.php?id=187&type=mp3';
        var soundAlert = new Audio(soundSource);
        if (sessionTextHead === 'Session') {
            var displayTime = convertTo(numSec);
            $('#mainTextTime').html(displayTime);
            
            if (numSec === 0) {
                sessionTextHead = 'Break';
                soundAlert.play();
                $('#sessionTextHead').html(sessionTextHead);
                $('.sessionArea').css('background-color', '#F2EBC7');
                $('#mainTextTime').css('color', '#343642');
                $('#sessionTextHead').css('color', '#343642');
                numSec = sessionTimeCounter*60;
            }
            numSec = numSec - 1;
        }

        else if (sessionTextHead === 'Break') {
            var displayTime2 = convertTo(numSec2);
            $('#mainTextTime').html(displayTime2);
            
            if (numSec2 === 0) {
                soundAlert.play();
                sessionTextHead = 'Session';
                $('#sessionTextHead').html(sessionTextHead);
                $('.sessionArea').css('background-color', '#962D3E');
                $('#mainTextTime').css('color', 'white');
                $('#sessionTextHead').css('color', 'white');
                numSec2 = breakTimeCounter*60;
            }
            numSec2 = numSec2 - 1;
        }
    }
    
    //stop button
    function stop () {
        clearInterval(timer);
        timer = null;
        testBool = false;
        runningBool = false;
    }
    
    //reset button
    function reset () {
        stop();
        if (sessionTextHead === 'Session') {
            numSec = sessionTimeCounter*60;
            $('#mainTextTime').html(convertTo(numSec));
        }
        else if (sessionTextHead === 'Break') {
            numSec2 = breakTimeCounter*60;
            numSec = sessionTimeCounter*60;
            $('#mainTextTime').html(convertTo(numSec));
            $('#sessionTextHead').html(sessionTextHead);
            $('.sessionArea').css('background-color', '#962D3E');
            $('#mainTextTime').css('color', 'white');
            $('#sessionTextHead').css('color', 'white');
            sessionTextHead = 'Session';
            $('#sessionTextHead').html(sessionTextHead);
        }
    }

    $('#start-timer').click(function () {
        testBool = !testBool;
        start();
    });
    
    $('#pause-timer').click(function () {
        stop();
    });
    
    $('#reset-timer').click(function () {
        reset();
    })
});