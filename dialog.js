var PCDialog = {
    title: "提示",
    content: "内容",
    width: "400",
    height: "200",
    css: "",
    inited: false,
    drawing: false,
    callbackFn: null,
    initPage: function() {
        if (!this.inited) {
            var a = new String();
            a = '<div id="floatBoxBg" style="height:' + jQuery(document).height() + 'px;filter:alpha(opacity=0);opacity:0;"></div>';
            a += '<iframe id="iframeTop" frameborder="0" allowTransparency="true" style="background:none"></iframe><div id="floatBox" class="floatBox">';
            a += '<div class="floatTitle"><h4></h4><span class="floatCloseBtn"></span></div>';
            a += '<div class="floatContent"></div>';
            a += "</div>";
            jQuery("body").append(a);
            jQuery("#floatBox .floatTitle .floatCloseBtn").bind("click",
            function(b) {
                b.stopPropagation();
                PCDialog.hide()
            });
            jQuery("#floatBox").jqDrag(".floatTitle h4");
            this.inited = true
        }
    },
    open: function(e, d, c, a, f, b) {
        this.title = e;
        if (typeof(d) == "string") {
            this.content = d
        }
        if (typeof(c) == "string") {
            this.width = c
        }
        if (typeof(a) == "string") {
            this.height = a
        }
        if (typeof(f) == "function") {
            this.callbackFn = f
        }
        if (typeof(b) == "string") {
            this.css = b
        }
        if (document.all && document.readyState != "complete") {
            return
        }
        this.show()
    },
    show: function() {
        this.initPage();
        jQuery("#floatBox .floatTitle h4").html(this.title);
        var c = this.content.substring(0, this.content.indexOf(":"));
        var b = this.content.substring(this.content.indexOf(":") + 1, this.content.length);
        switch (c) {
        case "url":
            var a = b.split("?");
            jQuery("#floatBox .floatContent").ajaxStart(function() {
                jQuery(this).html("loading...")
            });
            jQuery.ajax({
                type: a[0],
                url: a[1],
                data: a[2],
                error: function() {
                    jQuery("#floatBox .floatContent").html("error...")
                },
                success: function(d) {
                    jQuery("#floatBox .floatContent").html(d)
                }
            });
            break;
        case "text":
            jQuery("#floatBox .floatContent").html(b);
            break;
        case "id":
            jQuery("#floatBox .floatContent").html(jQuery("#" + b + "").html());
            break;
        case "iframe":
            jQuery("#floatBox .floatContent").html('<iframe name="floatIframe" allowtransparency="true" src="' + b + '" width="100%" height="' + (parseInt(this.height)) + 'px" scrolling="auto" frameborder="0" marginheight="0" marginwidth="0" style="background:none"></iframe>');
            break;
        default:
            jQuery("#floatBox .floatContent").html(b);
            break
        }
        jQuery("#floatBoxBg").show();
        jQuery("#floatBox").show();
        jQuery("#floatBoxBg").animate({
            opacity:
            "0.1"
        },
        "normal");
        jQuery("#floatBox").attr("class", "floatBox " + this.css);
        jQuery("#floatBox").css({
            width: this.width + "px",
            height: this.height + "px"
        });
        jQuery("#floatBox").css("left", ((jQuery(document.body).width()) / 2 - (parseInt(jQuery("#floatBox").width()) / 2)) + "px");
        jQuery("#floatBox").css("top", (getScreenHeight() - (parseInt(jQuery("#floatBox").height()) / 1.6)) + "px");
        jQuery("#floatBox").fadeIn()
    },
    close: function() {
        try {
            jQuery(".floatCloseBtn").trigger("click")
        } catch(a) {}
    },
    isOpen: function() {
        try {
            if (!this.inited) {
                return false
            }
            return new Number(jQuery("#floatBoxBg").css("opacity")) > 0
        } catch(a) {
            return false
        }
    },
    hide: function() {
        if (typeof(this.callbackFn) == "function") {
            this.callbackFn()
        }
        jQuery("#floatBoxBg").animate({
            opacity: "0"
        },
        "normal",
        function() {
            jQuery(this).hide()
        });
        jQuery("#floatBox").fadeOut(500)
    }
};
function getScreenHeight() {
    var a = 0;
    if (typeof(document.documentElement.scrollTop) != "undefinded" && document.documentElement.scrollTop > 0) {
        a = document.documentElement.scrollTop
    } else {
        if (typeof(document.body.scrollTop) != "undefinded" && document.body.scrollTop > 0) {
            a = document.body.scrollTop
        }
    }
    return (window.screen.availHeight) / 2 + a
} (function(e) {
    e.fn.jqDrag = function(f) {
        return b(this, f, "d")
    };
    e.fn.jqResize = function(f) {
        return b(this, f, "r")
    };
    e.jqDnR = {
        dnr: {},
        e: 0,
        drag: function(f) {
            if (g.k == "d") {
                d.css({
                    left: g.X + f.pageX - g.pX,
                    top: g.Y + f.pageY - g.pY
                })
            } else {
                d.css({
                    width: Math.max(f.pageX - g.pX + g.W, 0),
                    height: Math.max(f.pageY - g.pY + g.H, 0)
                })
            }
            return false
        },
        stop: function() {
            d.css("opacity", g.o);
            e(document).unbind("mousemove", a.drag).unbind("mouseup", a.stop)
        }
    };
    var a = e.jqDnR,
    g = a.dnr,
    d = a.e,
    b = function(j, i, f) {
        return j.each(function() {
            i = (i) ? e(i, j) : j;
            i.bind("mousedown", {
                e: j,
                k: f
            },
            function(h) {
                var m = h.data,
                l = {};
                d = m.e;
                if (d.css("position") != "relative") {
                    try {
                        d.position(l)
                    } catch(k) {}
                }
                g = {
                    X: l.left || c("left") || 0,
                    Y: l.top || c("top") || 0,
                    W: c("width") || d[0].scrollWidth || 0,
                    H: c("height") || d[0].scrollHeight || 0,
                    pX: h.pageX,
                    pY: h.pageY,
                    k: m.k,
                    o: d.css("opacity")
                };
                d.css({
                    opacity: 1
                });
                e(document).mousemove(e.jqDnR.drag).mouseup(e.jqDnR.stop);
                return false
            })
        })
    },
    c = function(f) {
        return parseInt(d.css(f)) || false
    }
})(jQuery);
