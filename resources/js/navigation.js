"use strict";

const ajaxRequest = new (function () {

    function closeReq () {
        isXHRloading = false;
    }

    function abortReq () {
        if (!isXHRloading) { return; }
        oReq.abort();
        closeReq();
        removePreloaders();
    }

    function ajaxError () {
        alert("Unknown error.");
        removePreloaders();
    }

    function removePreloaders(){
        let prs = document.getElementsByClassName("pr");
        setTimeout(function(){
            [].forEach.call(prs, function(pr){
                pr.style.opacity = 0;
            });
        }, 300);

    }

    function ajaxLoad () {
        var vMsg, nStatus = this.status;

        switch (nStatus) {
            case 200:
                vMsg = JSON.parse(this.responseText);
                document.title = oPageInfo.title = vMsg.page;  //ajax-content
                oPageInfo.class = vMsg.class;
                document.getElementById(vMsg.target).innerHTML = vMsg.html;
                if (bUpdateURL) {
                    history.pushState(oPageInfo, oPageInfo.title, oPageInfo.url);
                    bUpdateURL = false;
                }


                let tabs = document.querySelectorAll('.nav li');
                [].forEach.call(tabs, function(li){
                    li.classList.remove('active');
                    if(window.helper.findGetParameter('active_tab') === li.dataset.tab){
                        li.classList.add('active');
                    } else if(window.helper.findGetParameter('active_tab') === null && li.dataset.default){
                        li.classList.add('active');
                    }
                });
                rebuildLinks();
                document.dispatchEvent(new Event('ajaxLoaded', {bubbles: true}));
                removePreloaders();
                break;
            default:
                removePreloaders();
                vMsg = nStatus + ": " + (oHTTPStatus[nStatus] || "Unknown");
                switch (nStatus) {
                    case 401:
                        //window.auth.getLoginScreen();
                        break;
                    case 500:
                        /* Server Error 5xx */
                        alert("Server Error #" + vMsg);
                        break;
                    default:
                        /* Unknown status */
                        ajaxError();
                }
        }
        closeReq();
    }

    function filterURL (sURL, sViewMode) {
        return sURL.replace(rSearch, "") + ("?" + sURL.replace(rHost, "&").replace(rView, sViewMode ? "&" + sViewKey + "=" + sViewMode : "").slice(1)).replace(rEndQstMark, "");
    }

    function getPage (sPage, callback = null, force = false) {
        if(!force){
            if(window.isXHRloading){ return false; }
        }

        window.isXHRloading = true;
        if (sPage) {
            oPageInfo.url = filterURL(sPage, null);
        }
        window.axios({
            method: 'get',
            url: filterURL(oPageInfo.url, "json")
        }).then(function (resp) {
            document.title = oPageInfo.title = resp.data.page;
            oPageInfo.class = resp.data.class;

            document.getElementById(resp.data.target).innerHTML = resp.data.html;
            window.applySelects();
            //document.getElementById(resp.data.target).innerHTML = resp.data.html;
            if (bUpdateURL) {
                history.pushState(oPageInfo, oPageInfo.title, oPageInfo.url);
                bUpdateURL = false;
            }
            let tabs = document.querySelectorAll('.nav li');
            [].forEach.call(tabs, function (li) {
                li.classList.remove('active');
                if (window.helper.findGetParameter('active_tab') === li.dataset.tab) {
                    li.classList.add('active');
                } else if (window.helper.findGetParameter('active_tab') === null && li.dataset.default) {
                    li.classList.add('active');
                }
            });
            rebuildLinks(resp);
            document.dispatchEvent(new Event('ajaxLoaded', {bubbles: true}));
            removePreloaders();
            window.isXHRloading = false;
        }).catch(function (error) {
            console.log(error);
            window.isXHRloading = false;
        }).finally(function () {
            window.isXHRloading = false;
        });

    }

    function requestPage (sURL) {
        if (history.pushState) {
            bUpdateURL = true;
            getPage(sURL);
        } else {
            /* Ajax навигация не поддерживается */
            location.assign(sURL);
        }
    }

    function processLink() {

        if (this.className.search(sAjaxClass) > -1) {
            try{
             this.querySelector(":scope > .pr").style.opacity = 1;
            } catch (e) {
            }

            requestPage(this.href);
            return false;
        }
        return true;
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
    }

    function init (resp = null) {
        oPageInfo.title = document.title;
        history.replaceState(oPageInfo, oPageInfo.title, oPageInfo.url);
        for (var oLink, nIdx = 0, nLen = document.links.length; nIdx < nLen; document.links[nIdx++].onclick = processLink);

        // if(document.querySelector("#partner_index_page") !== null){
        //     partner.init();
        // }

        window.helper.initPageMethods(oPageInfo.class, resp);


        //window.helper.log('Ссылки переработаны');
    }

    const

        /* customizable constants */
        sTargetId = "ajax-content", sViewKey = "view_as", sAjaxClass = "ajax-nav",

        /* not customizable constants */
        rSearch = /\?.*$/, rHost = /^[^\?]*\?*&*/, rView = new RegExp("&" + sViewKey + "\\=[^&]*|&*$", "i"), rEndQstMark = /\?$/,
        oLoadingBox = document.createElement("div"), oCover = document.createElement("div"), oLoadingImg = new Image(),
        oPageInfo = {
            title: null,
            class: 'cash',
            url: location.href
        }, oHTTPStatus = /* http://www.iana.org/assignments/http-status-codes/http-status-codes.xml */ {
            100: "Continue",
            101: "Switching Protocols",
            102: "Processing",
            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-Authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            207: "Multi-Status",
            208: "Already Reported",
            226: "IM Used",
            300: "Multiple Choices",
            301: "Moved Permanently",
            302: "Found",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            306: "Reserved",
            307: "Temporary Redirect",
            308: "Permanent Redirect",
            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Timeout",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Request Entity Too Large",
            414: "Request-URI Too Long",
            415: "Unsupported Media Type",
            416: "Requested Range Not Satisfiable",
            417: "Expectation Failed",
            422: "Unprocessable Entity",
            423: "Locked",
            424: "Failed Dependency",
            425: "Unassigned",
            426: "Upgrade Required",
            427: "Unassigned",
            428: "Precondition Required",
            429: "Too Many Requests",
            430: "Unassigned",
            431: "Request Header Fields Too Large",
            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Timeout",
            505: "HTTP Version Not Supported",
            506: "Variant Also Negotiates (Experimental)",
            507: "Insufficient Storage",
            508: "Loop Detected",
            509: "Unassigned",
            510: "Not Extended",
            511: "Network Authentication Required"
        };

    var oReq, bUpdateURL = false;
    oLoadingBox.id = "ajax-loader";
    oCover.onclick = abortReq;
    oCover.innerHTML = '<i class="fa fa-refresh fa-spin text-md text-muted"></i>';
    oLoadingBox.appendChild(oCover);

    onpopstate = function (oEvent) {
        bUpdateURL = false;
        oPageInfo.title = oEvent.state.title;
        oPageInfo.url = oEvent.state.url;
        getPage();
    };

    window.addEventListener ? addEventListener("load", init, false) : window.attachEvent ? attachEvent("onload", init) : (onload = init);

    // Public methods

    this.open = requestPage;
    this.stop = abortReq;
    window.rebuildLinks = init;
    window.goto = getPage;
    window.filterUrl = filterURL;
    window.oPageInfo = oPageInfo;
    window.getQueryVar = getQueryVariable;

})();
