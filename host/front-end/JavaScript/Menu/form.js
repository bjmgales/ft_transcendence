
function parseAlias(nbr, event){
	event.preventDefault(); // Empêche retour main_menu quand on submit

	const regex = /^[A-Za-z0-9\-_]+$/;
 	let inputs = document.querySelectorAll('#parent_form input');
	let err = document.querySelectorAll('#parent_form .invalid-feedback');
	let bool = true;
	let alias_array = [];

	for(let i = 0; i < inputs.length; i++){
		if ((inputs[i].value.length >= 4 && inputs[i].value.length <= 15) && regex.test(inputs[i].value)) {
			err[i].style.display = 'none';

    	}
		else{
			err[i].style.display = 'block';
			document.getElementById('duplicate_nick').classList.add('d-none');
			bool = false;
		}
		alias_array.push(inputs[i].value);
	}

	if(bool == true){
		document.getElementById('invalid-alias-msg').classList.add('d-none');
		if (isDuplicateNicknames(inputs) == true){
			document.getElementById('duplicate_nick').classList.remove('d-none');
		}
		else{
			document.getElementById('duplicate_nick').classList.add('d-none')
			originalNicknames = shuffleArray(alias_array);
			setBackground('/tournament-game');
			addToHistory('/tournament-game');
			previous_url_path = '/tournament-game';
			document.title = getTranslation('Tournament Game');
			startTournament(originalNicknames, nbr);
			return;
		}
	}
	else
		document.getElementById('invalid-alias-msg').classList.remove('d-none');
	return null;
}

function basicParse(code){
	const regex = /^[A-Za-z0-9\-_]+$/;
	return regex.test(code);
}

function gameHistoryParse(element){
	const regex = /^[A-Za-z0-9\-_/.,]+$/;
	return regex.test(element);
}

function signalParse(element){
	const regex = /^[A-Za-z0-9\-_/\\\r\n.=: +*]+$/;
	return regex.test(element);
}

function isDuplicateNicknames(nicknames){
	for (let i = 0; i < nicknames.length - 1; i++){
		for (let c = i + 1; c < nicknames.length; c++){
			if (nicknames[i].value == nicknames[c].value)
				return true;
		}
	}
	return false;
}

function parseOffersAnswers(signalJson){
	let bool = true;
	for (const[key, value] of Object.entries(signalJson)){
		if (key == 'offer' || key == 'answer'){
			let OAjson = JSON.parse(signalJson[key]);
			if (!OAjson.iceCandidates || !OAjson.type || !OAjson.sdp)
				return false;
			for (const[key, value] of Object.entries(OAjson)){
				if (key == "iceCandidates"){
					let iceCanJson = OAjson.iceCandidates[0];
					for (const[key, value] of Object.entries(iceCanJson))
						if (!basicParse(key) || !signalParse(value)){
							bool = false;
						}
						continue
				}
				if (!basicParse(key) || !signalParse(value)){
					bool = false;
				}
			}
			continue;
		}
		if (!basicParse(key) || !basicParse(value)){
			bool = false;
		}
	}
	return bool;
}
