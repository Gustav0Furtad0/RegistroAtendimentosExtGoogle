var rootelement
var colors

$(window).on("load", () => {
    let x = document.cookie;

    if (!x)
        document.cookie = "colors=dark";
    else {
        colors = getCookie("colors");
        console.log(colors);
        if (colors != "dark") {
            lightmode();
        }
    }
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function lightmode(bt){
    if (bt) {
        if (colors == "dark") { 
            colors = "white"
            document.cookie = "colors=white";
            console.log(getCookie("colors"))
        }
        else {
            colors = "dark"
            document.cookie = "colors=dark";
            console.log(getCookie("colors"))
        }
    }

    rootelement = getComputedStyle(document.documentElement)

    var color1 =  rootelement.getPropertyValue('--principal');
    var color2 =  rootelement.getPropertyValue('--secondary');
    var color3 =  rootelement.getPropertyValue('--textprimary');
    var color4 =  rootelement.getPropertyValue('--textsecondary');

    rootelement = document.documentElement

    if (color1 == ' #1f1f1f')
        rootelement.style.setProperty('--principal', ' #ffffff')
    else
        rootelement.style.setProperty('--principal', ' #1f1f1f')
    
    if (color2 == ' #303030')
        rootelement.style.setProperty('--secondary', ' #e6e6e6')
    else
        rootelement.style.setProperty('--secondary', ' #303030')

    if (color3 == ' #ffffff')
        rootelement.style.setProperty('--textprimary', ' #1f1f1f')
    else
        rootelement.style.setProperty('--textprimary', ' #ffffff')

    if (color4 == ' #e6e6e6')
        rootelement.style.setProperty('--textsecondary', ' #303030')
    else
        rootelement.style.setProperty('--textsecondary', ' #e6e6e6')
};

function tamanhofonte(tam) {
    rootelement = getComputedStyle(document.documentElement);

    let fontsize = rootelement.getPropertyValue('--multfont');

    fontsize = fontsize.substring(0, fontsize.length - 2);

    rootelement = document.documentElement;

    if (tam) {
        fontsize ++;
        rootelement.style.setProperty('--multfont', `${fontsize}px`);
    } else {
        if (fontsize > 0) {
            fontsize --;
            rootelement.style.setProperty('--multfont', `${fontsize}px`);
        }
    }
}