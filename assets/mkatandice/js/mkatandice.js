// @codekit-prepend "../../../bower_components/katan-js/min/katan+raphael.min.js", "island1_gameboard.js", "island1_legend.js", "island2_gameboard.js";

$(function() {
    function calculateTotalScore() {
        // Calculate total score
        var totalScore = 0,
            count = 0;
        var scores = $('.show-grid input');
        scores.each(function (i) {
            var score = 0;
            if ($(this).val()) {
                if ($(this).val() == '0') {
                    score = -2;
                } else {
                    score = parseInt($(this).val());
                }
                count++;
            }
            totalScore += score;
        });
        $('#score_total').text(totalScore);
        $('#score_total_nav').text(totalScore);

        var status = (count > 12) ? 'danger' : ((count > 7) ? 'warning' : 'success');
        var progressHTML = '<div class="progress-bar progress-bar-' + status + '" style="width:' +
            6.67*count + '%;border-right: 1px solid #f5f5f5">' + totalScore + ' pts</div>';
        $('#main .progress').html(progressHTML);
    }

    function setCellStyle(elem) {
        // Change cell color after input
        if (elem && elem.val()) {
            elem.parent('td').addClass('has-value');
        } else {
            elem.parent('td').removeClass('has-value');
        }

        if (elem && elem.val() == '0') {
            elem.val(-2);
            elem.addClass('no-points');
        } else if (elem && elem.val() < 0) {
            elem.addClass('no-points');
        } else {
            elem.removeClass('no-points');
        }
    }

    function rollDice() {
        var sides = {
            '1': 'brick',
            '2': 'ore',
            '3': 'wool',
            '4': 'lumber',
            '5': 'grain',
            '6': 'gold'
        };

        with(Math) {
            var roll = 1 + floor(random() * 6);
        }
        return sides[roll];
    }

    function clearDiceRack() {
        $('.navbar-dice td').removeClass();
        $('.navbar-dice td i').remove();
    }

    // Calculate total after value is input
    $('.show-grid input').bind('keyup change', function() {
        calculateTotalScore();
        setCellStyle($(this));
    });

    $('#reset').bind('click', function(ev) {
        ev.preventDefault();
        $('#reset-modal').modal('show');
    });

    var rolls_left = 3;
    $('#roll-dice').bind('click', function() {
        if (rolls_left > 0) {
            var dice = $('.navbar-dice td');
            dice.each(function (i){
                if (!$(this).hasClass('hold')) {
                    $(this).html('<i class="katan-' + rollDice() + '"></i>');
                    $(this).addClass('animated rollIn'); // bounceInDown
                }

                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                    function() {
                        $(this).delay(400).queue(function() {
                            $(this).removeClass('animated rollIn').dequeue();
                        });
                    }
                );
            });

            rolls_left = rolls_left - 1;
        } else {
            rolls_left = 3;
            clearDiceRack();
        }

        var counter = $(this).children('#rolls_left_nav');
        counter.addClass('animated wobble');
        counter.delay(1500).queue(function() {
            counter.removeClass('animated wobble').dequeue();
        });
        $(this).children('.badge').text(rolls_left);
    });

    $('#roll-dice').bind('dblclick', function() {
        alert('reset');
    });

    $('.navbar-dice td').bind('click', function() {
        $(this).toggleClass('hold');
        var resElem = $(this).children('i');

        if (resElem.hasClass('katan-brick')) {
            $(this).toggleClass('katan-brick-hold');
        }

        else if (resElem.hasClass('katan-lumber')) {
            $(this).toggleClass('katan-lumber-hold');
        }

        else if (resElem.hasClass('katan-ore')) {
            $(this).toggleClass('katan-ore-hold');
        }

        else if (resElem.hasClass('katan-wool')) {
            $(this).toggleClass('katan-wool-hold');
        }

        else if (resElem.hasClass('katan-grain')) {
            $(this).toggleClass('katan-grain-hold');
        }

        else if (resElem.hasClass('katan-gold')) {
            $(this).toggleClass('katan-gold-hold');
        }
    });

    $('#myTab a[href="#map-nav"]').tab('show');
    $('#myTab a[href="#scoreboard-nav"]').tab('show');
    $('#myTab a[href="#legend-nav"]').tab('show');

    $('#reset-modal').modal({
        show: false
    });

    $('#reset-confirm').bind('click', function (e) {
        console.log($(this));
        e.preventDefault();
        location.reload();
    });
});