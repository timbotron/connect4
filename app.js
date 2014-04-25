// Name: Tim Habersack
// Date: 2014-04-24
// Notes: 1 => Red Player; 2 => Yellow Player

$(document).ready(function() { 

	$('.dropper').click(function()
	{
		var $x = $(this).attr('data-x');
		var $player = $('.players-turn').attr('data-player');

		drop_token($player,$x);

		var $won = 0;
		// Then we crunch the data to array and see if player won
		$won = did_they_win($player);
		// if player didnt win, update .players-turn
		if($won==0)
		{
			switch_player($player);
		}
		else
		{
			// GAME OVER
			$("button.dropper").attr('disabled','disabled');
		}

	})
});

function did_they_win($player)
{
	var $grid = grid_me();
	for($y=0;$y<6;$y++)
	{
		for($x=0;$x<7;$x++)
		{
			console.log('checking x:'+$x+' y:'+$y);

			// first lets check for simple horizontal
			if(($x+3)<7)
			{
				// then worth it to continue
				if($player == $grid[$x][$y])
				{
					if($player == $grid[$x+1][$y])
					{
						if($player == $grid[$x+2][$y])
						{
							if($player == $grid[$x+3][$y])
							{
								//WINNER
								return 1;
							}
						}
					}
				}
			}


		}
	}

	return 0;
}

// Read the entire board into an array. will make checking win conditions much faster
function grid_me()
{
	var $ret = new Array(7);
	for($i=0;$i<$ret.length;$i++)
	{
		$ret[$i] = new Array(6);
	}
	for($y=0;$y<6;$y++)
	{
		for($x=0;$x<7;$x++)
		{
			$ret[$x][$y] = slot_reader($x,$y);
		}
	}
	return $ret;
}

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