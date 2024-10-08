/***********BACKWARD/FORWARD NAVIGATION************/
              /** Without history push**/
async function isUserLeaving(){
    return new Promise(resolve => {
        document.querySelectorAll('button:not(.not-disabled), a').forEach(element => {element.setAttribute('disabled', true)});
        document.getElementById('leavingPopup').style.display = 'block';
        document.getElementById('leave_page_btn').onclick = () => {
            resolve(true);
            removeBeforeUnloadWarning();
        }
        document.getElementById('resume_btn').onclick =  () => resolve(false);
    })
}

async function handleSensitivePages(){
    if (previous_url_path == '/tournament-game' ||
        (previous_url_path == '/online-game' &&  data_channel != null)
            && localStorage.getItem('no_confirmation') != true)
        {
            let bool = await isUserLeaving();
            document.querySelectorAll('button:not(.not-disabled), a').forEach(element => {element.removeAttribute('disabled')});
            document.getElementById('leavingPopup').style.display = 'none';
            if (bool == false){
                history.pushState(null, null, '');
                history.replaceState(null, null, previous_url_path);
                localStorage.removeItem('no_confirmation');
                return bool;
            }
            else{
                isDisplayModal = false;
                tournamentFinalReset();
                resetConnection();
                document.getElementById('title_logo').style.display = "block";
                document.getElementById('main_menu_toolbar').style.display = "block";
                previous_url_path = '';
            }
        }
    localStorage.removeItem('no_confirmation');
    return true;
}

function addToHistory(pagePath){

    if (pagePath == '/home')
        window.addEventListener('keydown', detectKonamiCode);
    else
        window.removeEventListener('keydown', detectKonamiCode);

    if (pushHistory == true &&  window.location.pathname != getTranslation(pagePath))
        history.pushState(null, null, getTranslation(pagePath));
    else{
        history.replaceState(null, null, getTranslation(pagePath));
        pushHistory = true;
    }
}

async function handleLocation(){

    pushHistory = false;
    if (!originalUrl)
        path = window.location.pathname;
    else
        path = originalUrl;
    if (!(await handleSensitivePages()))
        return;
    nav.hideEveryDiv();
    pushHistory = false;
    originalUrl = null;
    switch (path){
        case '':
        case '/':
        case getSpecificTranslation('fr', '/home'):
        case getSpecificTranslation('es', '/home'):
        case '/home':
            nav.displayMenu();
            return;
        case getSpecificTranslation('fr', '/play'):
        case getSpecificTranslation('es', '/play'):
        case '/play':
            nav.displayPlay();
            return;
        case getSpecificTranslation('fr', '/classic'):
        case getSpecificTranslation('es', '/classic'):
        case '/classic':
            nav.displayClassicChoice()
            return;
        case getSpecificTranslation('fr', '/1vs1'):
        case getSpecificTranslation('es', '/1vs1'):
        case '/1vs1':
            nav.displayOneVsOneGameLocal();
            return;
        case getSpecificTranslation('fr', '/1vs2'):
        case getSpecificTranslation('es', '/1vs2'):
        case '/1vs2':
            nav.displayTwoVsOneGameLocal();
            return;
        case getSpecificTranslation('fr', '/online'):
        case getSpecificTranslation('es', '/online'):
        case '/online':
            if (isConnected())
                    nav.displayOnlineMenu();
            else{
                nav.displayMenu();
                displayStatusBarAlert(getTranslation('Forbidden Page'));
            }
            return;
        case getSpecificTranslation('fr', '/create-lobby'):
        case getSpecificTranslation('es', '/create-lobby'):
        case '/create-lobby':
            if (isConnected())
                nav.displayCreateLobby();
            else{
                nav.displayMenu();
                displayStatusBarAlert(getTranslation('Forbidden Page'));
            }
            return;
        case getSpecificTranslation('fr', '/join-lobby'):
        case getSpecificTranslation('es', '/join-lobby'):
        case '/join-lobby':
            if (isConnected())
                nav.displayJoinLobby();
            else{
                nav.displayMenu();
                displayStatusBarAlert(getTranslation('Forbidden Page'));
            }
            return;
        case getSpecificTranslation('fr', '/online-game'):
        case getSpecificTranslation('es', '/online-game'):
        case '/online-game':
            previous_url_path = "";
            nav.displayMenu();
            displayStatusBarWarning(getTranslation('Refresh Alert Online'))
            return;
        case getSpecificTranslation('fr', '/tournament'):
        case getSpecificTranslation('es', '/tournament'):
        case '/tournament':
            nav.displayTournamentSetup();
            return;
        case getSpecificTranslation('fr', '/tournament-nicknames'):
        case getSpecificTranslation('es', '/tournament-nicknames'):
        case '/tournament-nicknames':
            nav.displayTournamentForm();
            return;
        case getSpecificTranslation('fr', '/tournament-game'):
        case getSpecificTranslation('es', '/tournament-game'):
        case '/tournament-game':
                previous_url_path = "";
                nav.displayMenu();
                displayStatusBarWarning(getTranslation('Refresh Alert Tournament'))
            return;
        case getSpecificTranslation('fr', '/customize'):
        case getSpecificTranslation('es', '/customize'):
        case '/customize':
            nav.displayCustomize();
            return;
        case getSpecificTranslation('fr', '/statistics'):
        case getSpecificTranslation('es', '/statistics'):
        case '/statistics':
            nav.displayStats();
            return;
        case getSpecificTranslation('fr', '/game-history'):
        case getSpecificTranslation('es', '/game-history'):
        case '/game-history':
            if (isConnected())
                nav.displayHistory();
            else{
                nav.displayMenu();
                displayStatusBarAlert(getTranslation('Forbidden Page'));
            }
            return;
        case getSpecificTranslation('fr', '/local-stats'):
        case getSpecificTranslation('es', '/local-stats'):
        case '/local-stats':
            nav.displayLocalStats();
            return;
        case getSpecificTranslation('fr', '/online-stats'):
        case getSpecificTranslation('es', '/online-stats'):
        case '/online-stats':
            if (isConnected()){
                nav.displayOnlineStats();
            }
            else{
                nav.displayMenu();
                displayStatusBarAlert(getTranslation('Forbidden Page'));
            }
            return;
        case getSpecificTranslation('fr', '/settings'):
        case getSpecificTranslation('es', '/settings'):
        case '/settings':
            nav.displaySettings();
            return;
        case getSpecificTranslation('fr', '/credits'):
        case getSpecificTranslation('es', '/credits'):
        case '/credits':
            pushHistory = false;
            document.getElementById('footer_div').style.display ="block";
            nav.displayMenu();
            return;
        case getSpecificTranslation('fr', '/privacy'):
        case getSpecificTranslation('es', '/privacy'):
        case '/privacy':
            nav.displayRGPD();
            return;
        case getSpecificTranslation('fr', '/privacy-settings'):
        case getSpecificTranslation('es', '/privacy-settings'):
        case '/privacy-settings':
            displaySecondSettingsPage();
            return;
    }
    window.location.href = 'https://hostname:1025/404.html';
}
