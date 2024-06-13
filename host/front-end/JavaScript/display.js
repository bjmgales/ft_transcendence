nav.displayMenu = function()
{
    nav.hideEveryDiv();

    let main_page = document.getElementById('main_page');
    main_page.style.display = 'block';

    let main_menu_page = document.getElementById('main_menu_page');
    main_menu_page.style.display = "block";

    let main_menu_buttons = document.getElementById('main_menu_buttons');
    main_menu_buttons.style.display = "block";

    document.getElementById('rgpd_block').style.display = "none";

    // let main_menu_img = document.getElementsByClassName('.btn_img');
    // main_menu_img.forEach(element => {element.style.display = "block"});

    stop_flag = true; // stop tournament
    active = false; // turn off the game

    freeInputAndForms();
    tournamentFinalReset();
    resetConnection();

    refreshStats();
    refreshStatsDisplaySwitch();
    refreshLogin();
    // console.log(pushHistory);
    if (pushHistory == true && window.location.pathname != getTranslation('/home'))
        history.pushState(null, null, getTranslation('/home'));
    else{
        history.replaceState(null, null, getTranslation('/home'));
    }

    document.title = getTranslation('Home');
}

nav.removeMenu = function()
{
    let main_menu_page = document.getElementById('main_page');
    main_menu_page.style.display = "none";
}

function refreshSite()
{
    window.location.reload();
}

function setBackgroundColor(color)
{
    let background = document.body;
    let modal_disco = document.getElementById('modal_color_disco');
    let modal_leaving = document.getElementById('modal_color_leaving');
    let login_dropdown = document.getElementById('login_dropdown');

    if (color == "white"){
        login_dropdown.style.setProperty("background-color", "white");
        background.style.setProperty("background-color", "white");
        modal_disco.style.setProperty("background-color", "white");
        modal_leaving.style.setProperty("background-color", "white");
    }
    else{
        login_dropdown.style.setProperty("background-color", "black");
        background.style.setProperty("background-color", "black");
        modal_disco.style.setProperty("background-color", "black");
        modal_leaving.style.setProperty("background-color", "black");
    }
}

function setMaterialsColor(color)
{
    let forms_select = document.getElementsByClassName("form-select");
    let dropdowns = document.getElementsByClassName("dropdown");
    let lines = document.getElementsByClassName("line");
    let materials = [...forms_select, ...dropdowns, ...lines];

    for (let i = 0; i != materials.length; i++)
    {
        if (color == "white")
            materials[i].style["background-color"] = "white", materials[i].style["color"] = "black";
        else
            materials[i].style["background-color"] = "black", materials[i].style["color"] = "white";
    }
}

function setImagesColor(color)
{
    let images = document.getElementsByClassName("image");
    let svg = document.querySelectorAll('.svg');
    for (let i = 0; i != images.length; i++)
    {
        if (color == "white")
            images[i].style.filter="invert(100%)";
        else
            images[i].style.filter="invert(0%)";
    }

    svg.forEach(element => {
        if (element.classList.contains('foot')){
            element.style.filter="invert(100%)";
            return;
        }
        if (color == "white")
            element.style.filter="invert(100%)";
        else
            element.style.filter="invert(0%)";
    });
}

function setTextColor(color)
{
    let grey_texts = document.getElementsByClassName("text");
    let white_texts = document.getElementsByClassName("text-white");
    let black_texts = document.getElementsByClassName("text-black");

    let texts = [...white_texts, ...black_texts, ...grey_texts];

    for (let i = 0; i != texts.length; i++)
    {
        if (color == "white")
            texts[i].classList.replace("text", "text-white"), texts[i].classList.replace("text-black", "text-white");
        else
            texts[i].classList.replace("text", "text-black"), texts[i].classList.replace("text-white", "text-black");
    }
}

function setImageSize(size)
{
    let images = document.querySelectorAll('[data-isnormal]');

    for (let i = 0; i != images.length; i++)
    {
        let value = images[i].getAttribute(size);
        images[i].style.maxWidth = value;
    }
}

function setTextSize(size)
{
    let texts = document.querySelectorAll('[data-tsnormal]');

    if (size == "data-tsnormal")
        document.getElementById('text_size_btn_selector').selectedIndex = 0;
    else
        document.getElementById('text_size_btn_selector').selectedIndex = 1;

    for (let i = 0; i != texts.length; i++)
    {
        let value = texts[i].getAttribute(size);
        texts[i].style.fontSize = value;
    }
}

function setHighContrast(value)
{
    btn = document.querySelectorAll('.btn, .btn_img, .btn_icon, .slider, .selector, #title_logo, #top_logo');
    btn_icon = document.querySelectorAll('.btn_icon');
    dark_btn = document.querySelectorAll('.dark_btn');
    footer = document.getElementById('footer_div');
    high_contrast_btn = document.getElementById('high_contrast_btn_yn');

    if (high_contrast == "true")
    {
        dark_btn.forEach(element =>{
            element.classList.remove('btn-outline-dark')
            element.classList.add('btn-outline-light')
            element.removeEventListener('mouseout', backBtnColor_toBlack);
		    element.removeEventListener('mouseover', backBtnColor_toWhite);
            element.addEventListener('mouseover', backBtnColor_toBlack);
		    element.addEventListener('mouseout', backBtnColor_toWhite);
        });

        btn.forEach(element => {
            element.classList.add('focus-white');
            element.classList.remove('focus-black');
        });

        btn_icon.forEach(element => {
            element.classList.add('focus-black');
            element.classList.remove('focus-white');
        });
        high_contrast_btn.setAttribute('data-oname', 'Enabled');
        high_contrast_btn.style.backgroundColor = "#AD1400";
        high_contrast_btn.style.color = "white";
        footer.backgroundColor="#1a1a1a";
        setBackgroundColor("black");
        setTextColor("white");
        setMaterialsColor("black");
        setImagesColor("white");
    }
    else
    {
        dark_btn.forEach(element =>{
            element.classList.remove('btn-outline-light')
            element.classList.add('btn-outline-dark')
            element.removeEventListener('mouseover', backBtnColor_toBlack);
		    element.removeEventListener('mouseout', backBtnColor_toWhite);

            element.addEventListener('mouseout', backBtnColor_toBlack);
		    element.addEventListener('mouseover', backBtnColor_toWhite);
        });

        btn.forEach(element => {
            element.classList.add('focus-black')
            element.classList.remove('focus-white');
        });

        footer.backgroundColor="#AD1400";
        high_contrast_btn.setAttribute('data-oname', 'Disabled');
        high_contrast_btn.style.backgroundColor = "";
        high_contrast_btn.style.color = "black";

        setBackgroundColor("white");
        setTextColor("black");
        setMaterialsColor("white");
        setImagesColor("black");
    }
}

function setDescriptiveImages(value)
{
    let descriptions = document.querySelectorAll('[title]');

    if (value == "enable")
    {
        document.getElementById('image_desc_btn_yn').setAttribute('data-oname', 'Enabled');
        document.getElementById('image_desc_btn_yn').style.backgroundColor = "";
        document.getElementById('image_desc_btn_yn').classList.replace('text-black', 'text-white');
    }
    else
    {
        document.getElementById('image_desc_btn_yn').setAttribute('data-oname', 'Disabled');
        document.getElementById('image_desc_btn_yn').style.backgroundColor = "";
        document.getElementById('image_desc_btn_yn').classList.replace('text-white', 'text-black');
        for (let i = 0; i != descriptions.length; i++)
            descriptions[i].setAttribute('title', "");
    }
    refreshLanguage();
}

function refreshDisplay()
{
    setHighContrast();

    if (text_size == "normal")
        setTextSize("data-tsnormal"), setImageSize("data-isnormal");
    else
        setTextSize("data-tslarge"), setImageSize("data-islarge");

    if (descriptive_images == "true")
        setDescriptiveImages("enable");
    else
        setDescriptiveImages("disable");

    let test = document.querySelectorAll('.btn .border');

    for (let i = 0; i < test.length; i++){
        test[i].onmouseover.style.transform = '';
    }

    if (localStorage.getItem('status') == "connected")
    {
        document.getElementById('one_vs_one_online_btn').removeAttribute('disabled');
        document.getElementById('history_btn').removeAttribute('disabled');
        document.getElementById('online_stats_btn').removeAttribute('disabled');
    }
    else
    {
        document.getElementById('one_vs_one_online_btn').setAttribute('disabled', true);
        document.getElementById('history_btn').setAttribute('disabled', true);
        document.getElementById('online_stats_btn').setAttribute('disabled', true);
    }
    ARIAButtonState();
    ARIASoundsSlider();
}

function displayDropdownMenu(){
    let dropdown_toggler = document.getElementById('intra_login');
    let login_dropdown = document.getElementById('login_dropdown');
    login_dropdown.classList.remove('d-none');
    addOutsideDropdown();
}
function addOutsideDropdown(){
    document.addEventListener('click', outsideDropdownClick)
}
function removeOutsideDropdown(){
    document.removeEventListener('click', outsideDropdownClick)
}
function outsideDropdownClick(event){
    let dropdown_toggler = document.getElementById('intra_login');

    if (!dropdown_toggler.contains(event.target)){
        login_dropdown.classList.add('d-none');
        removeOutsideDropdown();
    }
}
