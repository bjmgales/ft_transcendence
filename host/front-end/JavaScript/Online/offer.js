async function gatherIceCandidatesO(){

	return new Promise(resolve => {

		let candidate_o = [];

		RTC_o.onicecandidate = function(event){
			if (event.candidate)
				candidate_o.push(event.candidate);
			else
				resolve(candidate_o);
		}
	})
}


async function offerGenerator(){
	try{
		RTC_o = new RTCPeerConnection(getIceConfig());
		data_channel = RTC_o.createDataChannel('mgpDataChannel');

		let  sdp_offer = await RTC_o.createOffer();
		await RTC_o.setLocalDescription(sdp_offer);

		let candidates = await gatherIceCandidatesO();

		let jsonOffer = {
			sdp: sdp_offer.sdp,
			type: sdp_offer.type,
			iceCandidates: candidates,
		}
		let offer = JSON.stringify(jsonOffer)
		sendOffer(offer)
		data_channel.onopen = () => hostConnectionHandler();
	}
	catch(error){
		console.error(`Error: ${error}`);
		document.getElementById('invitation_code').value = `Error: ${error}`;
	}
}

async function sendOffer(offer){
	const endpoint = 'https://hostname:8080/backend/signal/';
    const login = localStorage.getItem('login');

	const request = await fetch(endpoint, {
        method: 'POST',
		credentials: 'include',
		headers: {
            'Content-Type': 'application/json',
			'X-CSRFToken': csrfToken
        },
		body : JSON.stringify({
				'login' : login,
				'offer' : offer,
				hashLogin: localStorage.getItem('hashLogin'),
				token: localStorage.getItem('token'),
		}),
	})

	let response = await request.text();
	if (request.status == 500){
			localStorage.setItem('status', 'not connected')
			refreshLogin();
			document.getElementById('login_btn').style.display = 'block';
			nav.displayMenu();
       		displayStatusBarAlert(getTranslation('42 Security Disconnection'));
			return;
		}
    if (!response){
		resetConnection();
		nav.displayMenu();
		displayStatusBarAlert(getTranslation('Connection Init Failed'));
        return;
    }
	document.getElementById('invitation_code').value = response;
}


async function fetchAnswer(){
	const endpoint = 'https://hostname:8080/backend/signal/getAnswer/';
    const login = localStorage.getItem('login');
	let code = document.getElementById('invitation_code').value;

	try{

		document.getElementById('init_p2p').setAttribute('disabled', true);
		const request = await fetch(endpoint, {
        	method: 'POST',
			credentials: 'include',
			headers: {
            	'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken,
        	},
			body : JSON.stringify({
				code: code,
				'login' : login,
				hashLogin: localStorage.getItem('hashLogin'),
				token: localStorage.getItem('token'),
			}),
		})
		if (request.status == 404){
			displayStatusBarAlert(getTranslation('Peer 404'));
			document.getElementById('init_p2p').removeAttribute('disabled');
			return;
		}
		else if (request.status == 500){
			localStorage.setItem('status', 'not connected')
			refreshLogin();
			document.getElementById('login_btn').style.display = 'block';
			nav.displayMenu();
       		displayStatusBarAlert(getTranslation('42 Security Disconnection'));
			return;
		}
		let response = await request.json();
		if (!parseOffersAnswers(response)){
			displayStatusBarAlert(getTranslation("Wrong Code Format"));
			resetConnection();
			return;
		}
		localStorage.setItem('opponent_login', response['login']);
		initConnection(response['answer']);
	}
	catch(error){
		console.error(error);
		displayStatusBarAlert(getTranslation('Peer 404'));
	}

}

async function initConnection(answer){

	try{

		answer = JSON.parse(answer);
		if (answer.type == 'offer'){
			displayStatusBarAlert(getTranslation('Wrong Code Format'));
			resetConnection();
			nav.displayMenu();
       		return;
		}
		await RTC_o.setRemoteDescription(new RTCSessionDescription(answer));

		for (let candidate of answer.iceCandidates)
			await RTC_o.addIceCandidate(candidate);

	}
	catch(error){
		console.error(`${error}`);
		displayStatusBarAlert(getTranslation("Peer Connection Alert"));
	}

}
