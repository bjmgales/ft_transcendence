
function resetConnection(){
    if (RTC_a != null)
        RTC_a.close();
    if (RTC_o != null)
        RTC_o.close();
    if (data_channel != null)
        data_channel.close();
    RTC_a = null;
    RTC_o = null;
    data_channel = null;
    document.getElementById('init_p2p').removeAttribute('disabled');
    document.getElementById('submit_inv_code').removeAttribute('disabled');
}

function handleDisconnection(){
    let popup = document.getElementById('disconnectionPopup');

    if (isDisplayModal){
	    popup.style.display = 'block';
        document.getElementById('alert_sound').play();
        stop_ping = true;
        resetConnection();
    }
}
