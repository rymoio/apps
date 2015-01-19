$(function() {
    function calculateTotalScore() {
        // Calculate total score
        var totalScore = 0;
        var scores = $('.show-grid input');
        scores.each(function (i) {
            var score = 0;
            if ($(this).val()) {
                if ($(this).val() == '0') {
                    score = -2;
                } else {
                    score = parseInt($(this).val());
                }
            }
            totalScore += score;
        });
        $('#score_total').text(totalScore);
        $('#score_total_nav').text(totalScore);
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
                    $(this).html('<i class="glyph-icon resources-' + rollDice() + '"></i>');
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

        if (resElem.hasClass('resources-brick')) {
            $(this).toggleClass('resources-brick-hold');
        }

        else if (resElem.hasClass('resources-lumber')) {
            $(this).toggleClass('resources-lumber-hold');
        }

        else if (resElem.hasClass('resources-ore')) {
            $(this).toggleClass('resources-ore-hold');
        }

        else if (resElem.hasClass('resources-wool')) {
            $(this).toggleClass('resources-wool-hold');
        }

        else if (resElem.hasClass('resources-grain')) {
            $(this).toggleClass('resources-grain-hold');
        }

        else if (resElem.hasClass('resources-gold')) {
            $(this).toggleClass('resources-gold-hold');
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