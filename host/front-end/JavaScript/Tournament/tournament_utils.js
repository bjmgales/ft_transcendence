
function setTournamentSelector(){
	localStorage.getItem('t_player_nbr') ? document.getElementById('tournament_players_selector').value = localStorage.getItem('t_player_nbr') : document.getElementById('tournament_players_selector').value = '16';
}
function shuffleArray(nicknames){
	let before_shuffle = nicknames.slice();
	let after_shuffle = [];
	for (let i = 0; i < nicknames.length; i++){
		let c = Math.floor(Math.random() * before_shuffle.length);
		after_shuffle.push(before_shuffle[c]);
		before_shuffle.splice(c, 1);
	}
	return after_shuffle;
}

function formDuplicator(value){
	document.getElementById('form_block').querySelector('#t_form_label').textContent = getTranslation("ARIA Tournament Form Label") + ' ' + 1 + ':';
	let to_remove = document.querySelectorAll('#parent_form .remover');

	for (let c = 1; c < to_remove.length; c++){
		to_remove[c].remove();
	}

	let i;

	for (i = 0; i < value - 1; i++){
		let clone_form = document.getElementById('form_block').cloneNode(true);
		clone_form.id = 'form_block' + i;
		let childrens = clone_form.querySelectorAll('[id]');
		for (let j = 0; j < childrens.length; j++)
		    childrens[j].id = childrens[j].id + i;
		let label_child = clone_form.querySelector('#t_form_label' + i)
		let form_child = clone_form.querySelector('#alias_input' + i)
		label_child.textContent = getTranslation("ARIA Tournament Form Label") + ' ' + (i + 2) + ':';
		form_child.setAttribute('aria-labelledby', 't_form_label' + i);
		document.getElementById('parent_form').append(clone_form);
    }
	return i;
}

function fillNicknames(nicknames){
	document.getElementById('1stGameNicks').textContent = ` ${nicknames[0]} vs ${nicknames[1]} `;
	document.getElementById('2ndGameNicks').textContent = ` ${nicknames[2]} vs ${nicknames[3]} `;
	document.getElementById('3rdGameNicks').textContent = ` ${nicknames[4]} vs ${nicknames[5]} `;
	document.getElementById('4thGameNicks').textContent = ` ${nicknames[6]} vs ${nicknames[7]} `;
	document.getElementById('5thGameNicks').textContent = ` ${nicknames[8]} vs ${nicknames[9]} `;
	document.getElementById('6thGameNicks').textContent = ` ${nicknames[10]} vs ${nicknames[11]} `;
	document.getElementById('7thGameNicks').textContent = ` ${nicknames[12]} vs ${nicknames[13]} `;
	document.getElementById('8thGameNicks').textContent = ` ${nicknames[14]} vs ${nicknames[15]} `;
}

function tournamentResetBlocks(){

	document.getElementById('main_page').style.display = 'block';
	document.getElementById('main_menu_page').style.display = 'block';
	document.getElementById('main_page').style.transition = '';
	document.getElementById('main_menu_page').style.transition = '';
	document.getElementById('main_page').style.opacity = '';
	document.getElementById('main_menu_page').style.opacity = '';

	let ro16 = document.getElementById('Roundof16')
	ro16.style.visibility = 'hidden';
	ro16.style.opacity = '1';
	ro16.style.transition = 'opacity 0s';

	let rounds = document.querySelectorAll('.rounds_state');

	for (let i = 1; i < rounds.length; i++){
		rounds[i].style.visibility = '';
		rounds[i].style.transition = 'opacity 0s';
		rounds[i].style.opacity = '1';
	}

	let game_nbr = document.querySelectorAll('.game_nbr')

	for (let i = 0; i < game_nbr.length; i++){
		game_nbr[i].style.visibility = '';
		game_nbr[i].style.transition = 'opacity 0s';
		game_nbr[i].style.opacity = '1';

	}

	let players = document.querySelectorAll('.nicks');

	for (let i = 0; i < players.length; i++){
		players[i].style.visibility = '';
		players[i].style.transition = 'opacity 0s';
		players[i].style.opacity = '1';
		players[i].textContent = '';
	}
}

function tournamentFullReset(){
	nicknames = [];
	winner_array = [];
	loser_array = [];
	game_nbr = 1;
	max_game = null;
	tournamentResetBlocks();
}

function tournamentFinalReset(){
	stop_flag = true;
	final = false;
	tournamentFullReset();
	freeInputAndForms();
	removeBeforeUnloadWarning();
	document.getElementById('submit_alias').removeAttribute('disabled');
	document.getElementById('tournament_announcer').style.display = 'none';

	document.getElementById('main_menu_toolbar').style.transition = '';
	document.getElementById('main_menu_toolbar').style.opacity = '1';
}

function hideUnused(currStage){
    let stages;
    switch (currStage){
        case 2:
            stages = document.querySelectorAll(".ro16, .ro8, .ro4");
            break;
        case 4:
            stages = document.querySelectorAll(".ro16, .ro8");
            break;
        case 8:
            stages = document.querySelectorAll(".ro16");
            break;
    }

    stages.forEach(elem => {
        elem.style.display = "none";
    });
}