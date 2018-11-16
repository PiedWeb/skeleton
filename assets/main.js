
require("../node_modules/piedweb-devoluix-theme/src/scss/main.scss");
import "typeface-poppins";

/**
 * File from piedweb-devoluix-theme
 * Feel Free to edit it, it's yours now
 *
 * Memo:
 * Dom arrive before Onload
 * document.addEventListener('DOMContentLoaded', (event) => { vs window.onload = function () {
 */

import BootstrapCookieConsent from "bootstrap-cookie-consent";
import { tns } from "tiny-slider";
import baguetteBox from "baguettebox.js";
var bsn = require("bootstrap.native/dist/bootstrap-native-v4");
import {
  fullHeight,
  navbarOnScroll,
  wideImgCentered,
  smoothScrollHash,
  clickable,
  responsiveBackgrounds,
  imgLazyLoad,
  readableEmail,
  bsVideo,
  smoothScroll,
  jsLinks
} from "../node_modules/piedweb-devoluix-theme/src/js/helpers.js";



/**
 * Main
 */

document.addEventListener("DOMContentLoaded", function() {
    onDomLoaded();
});

window.onload = function () {

    navbarOnScroll(); // not explicit, add .nostick on scroll

    onPageLoaded();
}


// First functions to be apply
function onDomLoaded() {

    responsiveBackgrounds();

    if (!("fetch" in window) && document.querySelector(".fullscreen") !== null) {
        fullHeight(".fullscreen");
    }

    if (document.querySelector(".ic") !== null) {
        wideImgCentered(".ic");
    }

    smoothScroll(window.location);

    jsLinks(); // not explicit

    readableEmail("contact-email");

    formToSky();
}

// Apply this function when the page is fully loaded
function onPageLoaded() {

    if (document.querySelector(".mimg") !== null) {
      baguetteBox.run(".mimg", {
        captions: function(element) {
          return element.getElementsByTagName("img")[0].alt;
        }
      });
  }

  if (document.querySelector(".tns") !== null) {
    tns({
      container: ".tns",
      controls: false,
      nav: false,
      autoWidth: true,
      loop: false,
      mouseDrag: true,
      slideBy: "page",
      swipeAngle: false,
      items: 1
    });
  }

  smoothScrollHash();

  bsVideo(); // not explicit name

  document.querySelectorAll(".clickable").forEach(function(item) {
    item.addEventListener("click", function() {
      clickable(item);
    });
  });


  getBlockFromSky();

  imgLazyLoad();
}


/*
 * Helper functions
 */

function getBlockFromSky() {
    document.querySelectorAll('[data-sky]').forEach(item => {
        //console.log(item.getAttribute('data-sky'));
        fetch(item.getAttribute('data-sky'), {
          headers: {"Content-Type": "application/json", "Accept": "text/plain"},
          method: "POST",
          // Later: maybe implement sending data form data-post
          // body: JSON.stringify({"contact": (document.getElementById("contact") !== null ? 1: 0)}),
          credentials: "same-origin"
        }).then(function(response) {
          return response.text()
        }).then(function(body) {
            item.removeAttribute('data-sky');
            item.innerHTML = body;

            // add function to reDo on document dom ready
            onPageLoaded();
            onDomLoaded();
        });
    });
}


/*
 * ajaxify-form
 * todo: Js class
 */

function formToSky() {
  document.querySelectorAll('.ajax-form').forEach(item => {
      if (item.querySelector('form') !== null) {
          item.querySelector('form').addEventListener("submit", e => {
            e.preventDefault();
            console.log(e);
            sendFormToSky(e);
          });
       }
    });
}

function sendFormToSky(form) {
        var $submitButton = getSubmitButton(form);
        if ($submitButton !== null) {
            var initialButton = getSubmitButton(form).outerHTML;
            $submitButton.outerHTML = '<i class="fa fa-spinner fa-spin"></i>';
        }

          //var formData = new FormData();
          var toSend = '';
          for (var i = 0; i < form.srcElement.length; ++i) {
                toSend += encodeURI(form.srcElement[i].name)+"="+encodeURI(form.srcElement[i].value)+'&';
          }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.addEventListener("load", function() {
            form.srcElement.outerHTML = xmlhttp.responseText;
            formToSky();
        }, false);
        xmlhttp.open("POST",form.srcElement.action,false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(toSend);
}

function renderError(error) {
    var msg = '';
    for (var key in error) {
       if (error.hasOwnProperty(key)) {
          var obj = error[key];
          for (var prop in obj) {
             if (obj.hasOwnProperty(prop)) {
                 msg += key + " : " + obj[prop] + '<br>';
             }
          }
       }
    }
    return msg;
}

function getSubmitButton(form) {
    if (form.srcElement.querySelector('[type=submit]') !== null) {
        return form.srcElement.querySelector('[type=submit]');
    }
    if (form.srcElement.getElementsByTagName('button') !== null) {
        return form.srcElement.getElementsByTagName('button');
    }
    return null;
}
/*
 * /ajaxify-form
 */
