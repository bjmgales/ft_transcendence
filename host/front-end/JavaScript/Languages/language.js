function getElement(lang, text)
{
    for (let i = 0; i != lang.length; i++)
    {
        if (lang[i][0] == text)
            return (lang[i][1]);
    }
}

function getTranslation(text)
{
    if (language == "en")
    {
        for (let i = 0; i != en.length; i++)
        {
            if (en[i][0] == text)
                return (en[i][1]);
        }
    }
    if (language == "fr")
    {
        for (let i = 0; i != fr.length; i++)
        {
            if (fr[i][0] == text)
                return (fr[i][1]);
        }
    }
}

function refreshLanguage()
{
    let lang = localStorage.getItem("language");
    let words = document.querySelectorAll('[data-oname]');
    let placeholders = document.querySelectorAll('[placeholder]');
    let alt_text = document.querySelectorAll('[alt]');
    let titles = document.querySelectorAll('[data-title');

    if (lang == "en")
    {
        document.getElementById('language_btn_selector').selectedIndex = 0;

        for (let i = 0; i != words.length; i++)
            words[i].innerHTML = getElement(en, words[i].getAttribute("data-oname"));
        for (let i = 0; i != placeholders.length; i++)
            placeholders[i].setAttribute('placeholder', getElement(en, placeholders[i].getAttribute("data-oname")));
        for (let i = 0; i != alt_text.length; i++){
            if (getElement(en, alt_text[i].getAttribute('data-title') == undefined))
                alt_text[i].setAttribute('alt', getElement(en, alt_text[i].getAttribute('data-oname')));
            else
                alt_text[i].setAttribute('alt', getElement(en, alt_text[i].getAttribute('data-title')));
        }
        if (descriptive_images == "true")
        {
            for (let i = 0; i != titles.length; i++)
            {
                if (getElement(en, titles[i].getAttribute("data-oname")) == undefined){
                    titles[i].setAttribute('title', getElement(en, titles[i].getAttribute("data-title")));
                }
                else
                    titles[i].setAttribute('title', getElement(en, titles[i].getAttribute("data-oname")));
            }
        }
    }
    if (lang == "fr")
    {
        document.getElementById('language_btn_selector').selectedIndex = 1;

        for (let i = 0; i != words.length; i++)
            words[i].innerHTML = getElement(fr, words[i].getAttribute("data-oname"));
        for (let i = 0; i != placeholders.length; i++)
            placeholders[i].setAttribute('placeholder', getElement(fr, placeholders[i].getAttribute("data-oname")));
       for (let i = 0; i != alt_text.length; i++){
            if (getElement(en, alt_text[i].getAttribute('data-title') == undefined))
                alt_text[i].setAttribute('alt', getElement(fr, alt_text[i].getAttribute('data-oname')));
            else
                alt_text[i].setAttribute('alt', getElement(fr, alt_text[i].getAttribute('data-title')));
        }

        if (descriptive_images == "true")
        {
            for (let i = 0; i != titles.length; i++)
            {
                if (getElement(fr, titles[i].getAttribute("data-oname")) == undefined)
                    titles[i].setAttribute('title', getElement(fr, titles[i].getAttribute("data-title")));
                else
                    titles[i].setAttribute('title', getElement(fr, titles[i].getAttribute("data-oname")));
            }
        }
    }
}

function initializeLanguage()
{
    if (localStorage.getItem("language") == null)
        localStorage.setItem("language", "en"), language = "en";
    else
        language = localStorage.getItem("language");
}
