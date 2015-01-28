// @codekit-prepend "../../../bower_components/raphael/raphael.js", "../../../bower_components/katan-js/katan.js", "island_legend.js", "island1_gameboard.js", "island2_gameboard.js";

$(function() {
    function calculateTotalScore(island) {
        // Calculate total score
        var totalScore = 0,
            count = 0;

        if (island.toLowerCase() == 'one') {
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
            createProgressBar(island, count, totalScore);

        } else if (island.toLowerCase() == 'two') {
            totalScore = $('.btn-checkbox.active').length;
            createProgressBar(island, count, totalScore);
        }
    }

    function createProgressBar(island, count, score) {
        if (island.toLowerCase() == 'one') {
            var fsection = $('#progress-section-full');
            if (fsection && fsection.length > 0) fsection.remove();

            var status = (count > 12) ? 'danger' : ((count > 7) ? 'warning' : 'success');
            var suffix = (score == 1) ? ' pt' : ' pts';
            var percent = (count == 15) ? 100.0 : (6.67 * count);
            var progressHTML = '<div id="progress-section-full" class="progress-bar progress-bar-' + status +
                '" style="min-width:3em;width:' + percent + '%">' + score + suffix + '</div>';
            $('#main .progress').prepend(progressHTML);

            $('#turns-remaining').text(15 - parseInt(count));
            if (count == 15) $('#turns-remaining').removeClass('label-info').addClass('label-danger');

        } else if (island.toLowerCase() == 'two') {
            for (var i = 1; i <= score; i++) {
                var section = $('#progress-section-' + i);

                if (section.hasClass('progress-bar-inactive')) {
                    section.removeClass('progress-bar-inactive');
                }
            }

            for (var j = 15; j > score; j--) {
                var section = $('#progress-section-' + j);

                if (!section.hasClass('progress-bar-inactive')) {
                    section.addClass('progress-bar-inactive');
                }
            }
        }
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

    function setHighScore() {
        return;
    }

    function getHighScores() {
        return;
    }

    // Calculate total after value is input
    $('.show-grid input').on('keyup change', function(ev) {
        calculateTotalScore('one');
        setCellStyle($(this));
    });

    // Calculate total after button click
    // Bootstrap applies to default handler to the <body> tag so we need to grab it there...
    $('body').on('click', '.btn-checkbox', function() {
        $(this).toggleClass('active');
        calculateTotalScore('two');
    });

    var rolls_left = 3;
    $('#roll-dice').on('click', function() {
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
            var scoreModal = $('#score-modal');
            if (scoreModal && scoreModal.length > 0) {
                scoreModal.modal('show');
                scoreModal.on('hidden.bs.modal', function (e) {
                    rolls_left = 3;
                    clearDiceRack();
                });
            } else {
                rolls_left = 3;
                clearDiceRack();
            }
        }

        // update rolls left
        // var counter = $(this).children('#rolls_left_nav');
        // counter.addClass('animated wobble');
        // counter.delay(1500).queue(function() {
        //     counter.removeClass('animated wobble').dequeue();
        // });
        $(this).children('.badge').text(rolls_left);
    });

    $('.navbar-dice td').on('click', function() {
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

    // control tab content
    $('#myTab a[href="#map-nav"]').tab('show');
    $('#myTab a[href="#scoreboard-nav"]').tab('show');
    $('#myTab a[href="#legend-nav"]').tab('show');

    /**
     * MODAL CONTROLS
     */
    $('#score-modal').on('show.bs.modal', function (e) {
        var currentRoll = $('#navbar-dice-roll').clone().removeClass('pull-right').addClass('table-centered');
        $('#modal-current-roll').empty().append(currentRoll);
    });

    $('#modal-input-inc').click(function () {
        var curScore = $('#modal-input-score').val();
        var curScoreInt = (curScore) ? parseInt(curScore) : 0;
        curScoreInt++;
        $('#modal-input-score').val(curScoreInt);
    });

    $('#modal-input-dec').click(function () {
        var curScore = $('#modal-input-score').val();
        var curScoreInt = (curScore) ? parseInt(curScore) : 0;
        curScoreInt--;
        $('#modal-input-score').val(curScoreInt);
    });

    $('#score-add').click(function (ev) {
        ev.preventDefault();

        var curScore = $('#modal-input-score').val();
        var curScoreInt = (curScore) ? parseInt(curScore) : 0;
        var hasScoreLen = $('.show-grid input').filter(function() {
            return this.value;
        }).length;
        var tabIndex = parseInt(hasScoreLen) + 1;

        $('.show-grid input[tabindex=' + tabIndex + ']').focus().val(curScoreInt).change();

        $('#score-modal').modal('hide');
        $('#modal-input-score').val('');
    });

    // attempt to resize the map for smaller screens...
    window.onload = calculateScreenSize;
    window.onresize = calculateScreenSize;

    function calculateScreenSize() {
        // if (c) c.canvas.setAttribute('preserveAspectRatio', 'xMinYMin meet');
        // var sW = screen.availWidth;
        // if (sW <= 320) {
        //     c.setViewBox(0, 0, 375, 325, true);
        // } else {
        //     c.setViewBox(0, 0, 325, 325, true);
        // }
    }
});