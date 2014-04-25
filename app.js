// Name: Tim Habersack
// Date: 2014-04-24
// Notes: 1 => Red Player; 2 => Yellow Player

$(document).ready(function() { 

	$('.dropper').click(function()
	{
		var $x = $(this).attr('data-x');
		var $player = $('.players-turn').attr('data-player');

		drop_token($player,$x);

		// Then we crunch the data to array and see if player won
		var $won = 0;
		// if player didnt win, update .players-turn
		if($won==0)
		{
			switch_player($player);
		}

	})
});

function switch_player($current_player)
{
	if($current_player==1)
	{
		$('.players-turn').attr('data-player','2');
		$('.players-turn').removeClass('label-danger').addClass('label-warning').html('YELLOW PLAYERS TURN');
	}
	else
	{
		$('.players-turn').attr('data-player','1');
		$('.players-turn').removeClass('label-warning').addClass('label-danger').html('RED PLAYERS TURN');
	}
}

function drop_token($player,$x)
{
	var $stopping_point = 5;
	for($y=5;$y>=0;$y--)
	{
		var $spot = slot_reader($x,$y);
		if($spot!=0)
		{
			break;
		}
		$stopping_point = $y;
	}
	console.log('token drops to x:'+$x+' y:'+$stopping_point);

	// now we mark the spot
	color_slot($player,$x,$stopping_point);

	// disable drop button if $stopping_point == 5
	if($stopping_point==5)
	{
		$("button.dropper[data-x='"+$x+"']").attr('disabled','disabled');
	}
}

// fills in spot on grid with players color
function color_slot($player,$x,$y)
{
	var $target = $("button[data-x='"+$x+"'][data-y='"+$y+"']");
	if($player==1)
	{
		$target.attr('class','btn btn-danger');
	}
	else
	{
		$target.attr('class','btn btn-warning');
	}
}

// returns the owner of the slot at those coords
function slot_reader($x,$y)
{
	var $target = $("button[data-x='"+$x+"'][data-y='"+$y+"']");

	var $ret = 0;
	if($target.hasClass('btn-danger'))
	{
		$ret = 1;
	}
	else if($target.hasClass('btn-warning'))
	{
		$ret = 2;
	}
	return $ret;
}