function displayGamePage_ai()
{
    let game_page = document.getElementById('game_page_ai');
    game_page.style.display = "block";

    removeMenu();
}

function displayGamePage_classic()
{
    let game_page = document.getElementById('one_vs_one_online_page');
    game_page.style.display = "block";

    let peer_offer = document.getElementById('peer_offer');
    let g_id_reminder = document.getElementById('game_id_reminder');
    g_id_reminder.value = peer_offer.value;
    removeMenu();
}

function displayGamePage_tournament()
{
    let game_page = document.getElementById('game_page_tournament');
    game_page.style.display = "block";
    removeMenu();
}

document.getElementById('switch_classic').onclick = gameTypeSwitch;
document.getElementById('switch_tournament').onclick = gameTypeSwitch;

function gameTypeSwitch(){
    let text = this.nextElementSibling;
    let other_text;
    if (this.id == 'switch_classic'){
        other_switch = document.getElementById('switch_tournament');
        other_text = document.getElementById('t_switch_text');
    }
    else{
        other_switch = document.getElementById  ('switch_classic');
        other_text = document.getElementById('c_switch_text');

    }


    if (this.checked){
        text.innerHTML = getTranslation('Bonus Mode');
        gameMode = 'bonus'
    }
    else{
        text.innerHTML = getTranslation('Normal Mode');
        gameMode = 'normal';
    }
    other_switch.checked = this.checked;
    other_text.innerHTML = text.innerHTML;
}
