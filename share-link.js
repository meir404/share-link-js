var cssId = 'share-link-css';
var script = document.querySelector('script[src*="share-link.js"]');
var relativePath = script.getAttribute('src').replace('share-link.js', '');

if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `${relativePath}/share-link.css`;
    link.media = 'all';
    head.appendChild(link);

}

function goTo(event, url, text) {
    var classType = event.getAttribute('class');
    if (classType.includes('whatsapp')) {
        var whatsappUrl = `https://wa.me/?text=${url}`;
        window.open(whatsappUrl, "MsgWindow", "width=500,height=500");
    }
    if (classType.includes('mail')) {
        var whatsappUrl = `mailto:?subject=${text}&body=${url};`;
        window.open(whatsappUrl, "MsgWindow");
    }
    if (classType.includes('pin')) {
        navigator.clipboard.writeText(url);
    }
    if (classType.includes('twitter')) {
        var whatsappUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        window.open(whatsappUrl, "MsgWindow", "width=500,height=500")
    }
    if (classType.includes('facebook')) {
        var whatsappUrl = `https://www.facebook.com/sharer.php?t=${text}&u=${url}`;
        window.open(whatsappUrl, "MsgWindow", "width=500,height=500");
    }
}

function shareLinkInit(event) {
    const div = document.createElement('div');
    div.classList.add("share-link-list");
    const linkList = event.getAttribute('linkTo');
    let linkUrl = event.getAttribute('url');
    if (!linkUrl.startsWith('http')) {
        linkUrl = location.origin + linkUrl;
    }
    const linkText = event.getAttribute('text');
    const open = event.parentElement.querySelector('.share-link-conntiner');
    if (!open) {
        if (linkList.includes('whatsapp')) {
            div.innerHTML += `<button type="button" class="share-link-button share-link-buttons-whatsapp" onclick="goTo(this,'${linkUrl}','${linkText}');" >
                                <img src="${relativePath}/shareicon_whatsapp_new.svg" alt="">
                            </button>`;
        }
        if (linkList.includes('mail')) {
            div.innerHTML += `<button type="button" class="share-link-button share-link-buttons-mail" onclick="goTo(this,'${linkUrl}','${linkText}');" >
                             <img src="${relativePath}/shareicon_mail_new.svg" alt="">
                             </button>`;
        }
        if (linkList.includes('pin')) {
            div.innerHTML += `<button type="button" class="share-link-button share-link-buttons-pin" onclick="goTo(this,'${linkUrl}','${linkText}');">
                          <img src="${relativePath}/shareicon_pin.svg" alt="">
                           </button>`;
        }
        if (linkList.includes('twitter')) {
            div.innerHTML += `<button type="button" class="share-link-button share-link-buttons-twitter" onclick="goTo(this,'${linkUrl}','${linkText}');">
                                 <img src="${relativePath}/shareicon_twitter_new.svg" alt="">
                           </button>`;
        }
        if (linkList.includes('facebook')) {
            div.innerHTML += ` <button type="button" class="share-link-button share-link-buttons-facebook" onclick="goTo(this,'${linkUrl}','${linkText}');">
                              <img src="${relativePath}/shareicon_facebook_new.svg" alt="">
                           </button>`;
        }
        const divContainer = document.createElement('div');
        divContainer.classList.add('share-link-conntiner')
        divContainer.append(div)
        event.after(divContainer);
    } else {
        open.remove();
    }
}