async function startTournament(newNicksArray, i){
	stop_flag = false;
	turn = false;

	while (stop_flag == false && turn == false){
		tournamentResetBlocks();
		nicknames = newNicksArray;
		winner_array = [];
		max_game = i / 2;

		if (nicknames == null)
			return;

		document.getElementById('main_menu_page').style.opacity = '1';
		document.getElementById('main_menu_toolbar').style.opacity = '0';
		document.getElementById('submit_alias').setAttribute('disabled', true);
		document.getElementById('tournament_nickname_menu').style.display = 'none';
		document.getElementById('tournament_announcer').style.display = 'block';

		await displayTournamentStage(nicknames);

		if (stop_flag == true){
			tournamentResetBlocks();
			document.getElementById('submit_alias').removeAttribute('disabled');
			return;
		}
		if (i != 2)
			await displayNextGame(game_nbr, nicknames)
	}
}

async function tournamentGameStart(){
	removeMenu();
	let keys_anim = document.querySelectorAll('.keysup, .keysdown');
    (keys_anim).forEach(element => { element.style.transition = 'opacity 1s';});
	document.getElementById('main_page').style.display = 'none';
	let game_toolbar = document.getElementById('game_toolbar');
	let game_page_tournament = document.getElementById('game_page_tournament');
	let game_backgrounds = document.getElementById('game_backgrounds');

	let player_block = document.getElementById('nick_reminder');
	player_block.innerHTML = document.getElementById('nick_announce').innerHTML;

	let next_game_btn = document.getElementById('t_next_game');
	let start_game_btn = document.getElementById('t_start_game');

	start_game_btn.style.display = 'block';
	next_game_btn.style.display = 'none';

	game_toolbar.style.opacity = '0';
	game_toolbar.style.display = 'block';
	game_toolbar.style.transition = 'opacity 1s';

	game_backgrounds.style.opacity = '0';
	game_page_tournament.style.opacity = '0';
	game_page_tournament.style.display = 'block';
    game_backgrounds.style.display = 'block';
	game_page_tournament.style.transition = 'opacity 1s';
	game_backgrounds.style.transition = 'opacity 1s';

	await sleep (10);

	game_page_tournament.style.opacity = '1';
	game_backgrounds.style.opacity = '1';
	game_toolbar.style.opacity = '1';
	resumeKeysAnim();

	await sleep(1000);
	turn = true;
}
