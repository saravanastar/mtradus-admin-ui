var imgLiquid=imgLiquid||{VER:"0.9.944"};imgLiquid.bgs_Available=!1,imgLiquid.bgs_CheckRunned=!1,imgLiquid.injectCss=".imgLiquid img {visibility:hidden}",function(i){function e(){if(!imgLiquid.bgs_CheckRunned){imgLiquid.bgs_CheckRunned=!0;var e=i('<span style="background-size:cover" />');i("body").append(e),!function(){var i=e[0];if(i&&window.getComputedStyle){var t=window.getComputedStyle(i,null);t&&t.backgroundSize&&(imgLiquid.bgs_Available="cover"===t.backgroundSize)}}(),e.remove()}}i.fn.extend({imgLiquid:function(t){this.defaults={fill:!0,verticalAlign:"center",horizontalAlign:"center",useBackgroundSize:!0,useDataHtmlAttr:!0,responsive:!0,delay:0,fadeInTime:0,removeBoxBackground:!0,hardPixels:!0,responsiveCheckTime:500,timecheckvisibility:500,updateOnWindowResize:!0,onStart:null,onFinish:null,onItemStart:null,onItemFinish:null,onItemError:null},e();var a=this;return this.options=t,this.settings=i.extend({},this.defaults,this.options),this.settings.onStart&&this.settings.onStart(),this.each(function(e){function t(){-1===c.css("background-image").indexOf(encodeURI(m.attr("src")))&&c.css({"background-image":'url("'+encodeURI(m.attr("src"))+'")'}),c.css({"background-size":u.fill?"cover":"contain","background-position":(u.horizontalAlign+" "+u.verticalAlign).toLowerCase(),"background-repeat":"no-repeat"}),i("a:first",c).css({display:"block",width:"100%",height:"100%"}),i("img",c).css({display:"none"}),u.onItemFinish&&u.onItemFinish(e,c,m),c.addClass("imgLiquid_bgSize"),c.addClass("imgLiquid_ready"),g()}function d(){function t(){m.data("imgLiquid_error")||m.data("imgLiquid_loaded")||m.data("imgLiquid_oldProcessed")||(c.is(":visible")&&m[0].complete&&m[0].width>0&&m[0].height>0?(m.data("imgLiquid_loaded",!0),setTimeout(l,e*u.delay)):setTimeout(t,u.timecheckvisibility))}if(m.data("oldSrc")&&m.data("oldSrc")!==m.attr("src")){var a=m.clone().removeAttr("style");return a.data("imgLiquid_settings",m.data("imgLiquid_settings")),m.parent().prepend(a),m.remove(),m=a,m[0].width=0,void setTimeout(d,10)}return m.data("imgLiquid_oldProcessed")?void l():(m.data("imgLiquid_oldProcessed",!1),m.data("oldSrc",m.attr("src")),i("img:not(:first)",c).css("display","none"),c.css({overflow:"hidden"}),m.fadeTo(0,0).removeAttr("width").removeAttr("height").css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block"}),m.on("error",s),m[0].onerror=s,t(),u.updateOnWindowResize===!0&&u.useBackgroundSize===!1&&i(window).on("resize",n),void o())}function o(){(u.responsive||m.data("imgLiquid_oldProcessed"))&&m.data("imgLiquid_settings")&&(u=m.data("imgLiquid_settings"),c.actualSize=c.get(0).offsetWidth+c.get(0).offsetHeight/1e4,c.sizeOld&&c.actualSize!==c.sizeOld&&l(),c.sizeOld=c.actualSize,setTimeout(o,u.responsiveCheckTime))}function n(){d()}function s(){m.data("imgLiquid_error",!0),c.addClass("imgLiquid_error"),u.onItemError&&u.onItemError(e,c,m),g()}function r(){var i={};if(a.settings.useDataHtmlAttr){var e=c.attr("data-imgLiquid-fill"),t=c.attr("data-imgLiquid-horizontalAlign"),d=c.attr("data-imgLiquid-verticalAlign");("true"===e||"false"===e)&&(i.fill=Boolean("true"===e)),void 0===t||"left"!==t&&"center"!==t&&"right"!==t&&-1===t.indexOf("%")||(i.horizontalAlign=t),void 0===d||"top"!==d&&"bottom"!==d&&"center"!==d&&-1===d.indexOf("%")||(i.verticalAlign=d)}return imgLiquid.isIE&&a.settings.ieFadeInDisabled&&(i.fadeInTime=0),i}function l(){var i,t,a,d,o,n,s,r,l=0,h=0,f=c.width(),v=c.height();void 0===m.data("owidth")&&m.data("owidth",m[0].width),void 0===m.data("oheight")&&m.data("oheight",m[0].height),u.fill===f/v>=m.data("owidth")/m.data("oheight")?(i="100%",t="auto",a=Math.floor(f),d=Math.floor(f*(m.data("oheight")/m.data("owidth")))):(i="auto",t="100%",a=Math.floor(v*(m.data("owidth")/m.data("oheight"))),d=Math.floor(v)),o=u.horizontalAlign.toLowerCase(),s=f-a,"left"===o&&(h=0),"center"===o&&(h=.5*s),"right"===o&&(h=s),-1!==o.indexOf("%")&&(o=parseInt(o.replace("%",""),10),o>0&&(h=s*o*.01)),n=u.verticalAlign.toLowerCase(),r=v-d,"top"===n&&(l=0),"center"===n&&(l=.5*r),"bottom"===n&&(l=r),-1!==n.indexOf("%")&&(n=parseInt(n.replace("%",""),10),n>0&&(l=r*n*.01)),u.hardPixels&&(i=a,t=d),m.css({width:i,height:t,"margin-left":Math.floor(h),"margin-top":Math.floor(l)}),m.data("imgLiquid_oldProcessed")||(m.fadeTo(u.fadeInTime,1),m.data("imgLiquid_oldProcessed",!0),u.removeBoxBackground&&c.css("background-image","none"),c.addClass("imgLiquid_nobgSize"),c.addClass("imgLiquid_ready")),u.onItemFinish&&u.onItemFinish(e,c,m),g()}function g(){e===a.length-1&&a.settings.onFinish&&a.settings.onFinish()}var u=a.settings,c=i(this),m=i("img:first",c);return m.length?(m.data("imgLiquid_settings")?(c.removeClass("imgLiquid_error").removeClass("imgLiquid_ready"),u=i.extend({},m.data("imgLiquid_settings"),a.options)):u=i.extend({},a.settings,r()),m.data("imgLiquid_settings",u),u.onItemStart&&u.onItemStart(e,c,m),void(imgLiquid.bgs_Available&&u.useBackgroundSize?t():d())):void s()})}})}(jQuery),!function(){var i=imgLiquid.injectCss,e=document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}();