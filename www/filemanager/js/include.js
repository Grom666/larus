var encodeURL, show_animation, hide_animation, apply, apply_none, apply_img, apply_any, apply_video, apply_link, apply_file_rename, apply_file_duplicate, apply_folder_rename;
!function (e, a, t) {
    "use strict";
    function n(a) {
        show_animation();
        var t = new Image;
        t.src = a, e(t).on("load", function () {
            hide_animation()
        })
    }

    function i() {
        e("#textfile_create_area").parent().parent().remove();
        var a = e("#lang_filename").val() + ': <input type="text" id="create_text_file_name" style="min-height:30px"><br><hr><textarea id="textfile_create_area" style="width:100%;height:150px;"></textarea>';
        bootbox.dialog(a, [
            {label: e("#cancel").val(), "class": "btn"},
            {label: e("#ok").val(), "class": "btn-inverse", callback: function () {
                var a = e("#create_text_file_name").val(), t = e("#textfile_create_area").val();
                if (null !== a) {
                    a = y(a);
                    var n = e("#sub_folder").val() + e("#fldr_value").val();
                    e.ajax({type: "POST", url: "execute.php?action=create_file", data: {path: n, name: a, new_content: t}}).done(function (a) {
                        "" != a && bootbox.alert(a, function () {
                            setTimeout(function () {
                                window.location.href = e("#refresh").attr("href") + "&" + (new Date).getTime()
                            }, 500)
                        })
                    })
                }
            }}
        ], {header: e("#lang_new_file").val()})
    }

    function r(a) {
        e("#textfile_edit_area").parent().parent().remove();
        var t = a.find(".rename-file-paths").attr("data-path");
        e.ajax({type: "POST", url: "ajax_calls.php?action=get_file&sub_action=edit&preview_mode=text", data: {path: t}}).done(function (n) {
            bootbox.dialog(n, [
                {label: e("#cancel").val(), "class": "btn"},
                {label: e("#ok").val(), "class": "btn-inverse", callback: function () {
                    var a = e("#textfile_edit_area").val();
                    e.ajax({type: "POST", url: "execute.php?action=save_text_file", data: {path: t, new_content: a}}).done(function (e) {
                        "" != e && bootbox.alert(e)
                    })
                }}
            ], {header: a.find(".name_download").val()})
        })
    }

    function o() {
        e.ajax({type: "POST", url: "ajax_calls.php?action=get_lang", data: {}}).done(function (a) {
            bootbox.dialog(a, [
                {label: e("#cancel").val(), "class": "btn"},
                {label: e("#ok").val(), "class": "btn-inverse", callback: function () {
                    var a = e("#new_lang_select").val();
                    e.ajax({type: "POST", url: "ajax_calls.php?action=change_lang", data: {choosen_lang: a}}).done(function (a) {
                        "" != a ? bootbox.alert(a) : setTimeout(function () {
                            window.location.href = e("#refresh").attr("href") + "&" + (new Date).getTime()
                        }, 500)
                    })
                }}
            ], {header: e("#lang_lang_change").val()})
        })
    }

    function l(a) {
        e("#files_permission_start").parent().parent().remove();
        var t;
        t = a.find(".rename-file-paths").attr(a.hasClass("directory") ? "data-path" : "data-path"), e.ajax({type: "POST", url: "ajax_calls.php?action=chmod", data: {path: t}}).done(function (a) {
            bootbox.dialog(a, [
                {label: e("#cancel").val(), "class": "btn"},
                {label: e("#ok").val(), "class": "btn-inverse", callback: function () {
                    var a = e("#chmod_form #chmod_value").val();
                    if ("" != a && "undefined" != typeof a) {
                        var n = e("#chmod_form input[name=apply_recursive]:checked").val();
                        ("" == n || "undefined" == typeof n) && (n = "none"), e.ajax({type: "POST", url: "execute.php?action=chmod", data: {path: t, new_mode: a, is_recursive: n}}).done(function (e) {
                            "" != e && bootbox.alert(e)
                        })
                    }
                }}
            ], {header: e("#lang_file_permission").val()})
        })
    }

    function c(a) {
        var t = [];
        if (t.user = 0, t.group = 0, t.all = 0, "undefined" != typeof a && 1 == a) {
            var n = e("#chmod_form #chmod_value").val();
            t.user = n.substr(0, 1), t.group = n.substr(1, 1), t.all = n.substr(2, 1), e.each(t, function (a) {
                ("" == t[a] || 0 == e.isNumeric(t[a]) || parseInt(t[a]) < 0 || parseInt(t[a]) > 7) && (t[a] = "0")
            }), e("#chmod_form input:checkbox").each(function () {
                var a = e(this).attr("data-group"), n = e(this).attr("data-value");
                s(t[a], n) ? e(this).prop("checked", !0) : e(this).prop("checked", !1)
            })
        } else e("#chmod_form input:checkbox:checked").each(function () {
            var a = e(this).attr("data-group"), n = e(this).attr("data-value");
            t[a] = parseInt(t[a]) + parseInt(n)
        }), e("#chmod_form #chmod_value").val(t.user.toString() + t.group.toString() + t.all.toString())
    }

    function s(a, t) {
        var n = [];
        return n[1] = [1, 3, 5, 7], n[2] = [2, 3, 6, 7], n[4] = [4, 5, 6, 7], a = parseInt(a), t = parseInt(t), -1 != e.inArray(a, n[t])
    }

    function d() {
        bootbox.confirm(e("#lang_clear_clipboard_confirm").val(), e("#cancel").val(), e("#ok").val(), function (a) {
            1 == a && e.ajax({type: "POST", url: "ajax_calls.php?action=clear_clipboard", data: {}}).done(function (a) {
                "" != a ? bootbox.alert(a) : e("#clipboard").val("0"), v(!1)
            })
        })
    }

    function p(a, t) {
        if ("copy" == t || "cut" == t) {
            var n;
            n = a.find(".rename-file-paths").attr(a.hasClass("directory") ? "data-path" : "data-path"), e.ajax({type: "POST", url: "ajax_calls.php?action=copy_cut", data: {path: n, sub_action: t}}).done(function (a) {
                "" != a ? bootbox.alert(a) : (e("#clipboard").val("1"), v(!0))
            })
        }
    }

    function f(a) {
        bootbox.confirm(e("#lang_paste_confirm").val(), e("#cancel").val(), e("#ok").val(), function (t) {
            if (1 == t) {
                var n;
                n = "undefined" != typeof a ? a.find(".rename-folder").attr("data-path") : e("#sub_folder").val() + e("#fldr_value").val(), e.ajax({type: "POST", url: "execute.php?action=paste_clipboard", data: {path: n}}).done(function (a) {
                    "" != a ? bootbox.alert(a) : (e("#clipboard").val("0"), v(!1), setTimeout(function () {
                        window.location.href = e("#refresh").attr("href") + "&" + (new Date).getTime()
                    }, 300))
                })
            }
        })
    }

    function u(a, t) {
        var n;
        n = a.find(a.hasClass("directory") ? ".rename-folder" : ".rename-file");
        var i = n.attr("data-path");
        a.parent().hide(100), e.ajax({type: "POST", url: "ajax_calls.php?action=copy_cut", data: {path: i, sub_action: "cut"}}).done(function (n) {
            if ("" != n)bootbox.alert(n); else {
                var i;
                i = "undefined" != typeof t ? t.hasClass("back-directory") ? t.find(".path").val() : t.find(".rename-folder").attr("data-path") : e("#sub_folder").val() + e("#fldr_value").val(), e.ajax({type: "POST", url: "execute.php?action=paste_clipboard", data: {path: i}}).done(function (t) {
                    "" != t ? (bootbox.alert(t), a.parent().show(100)) : (e("#clipboard").val("0"), v(!1), a.parent().remove())
                })
            }
        }).error(function () {
            a.parent().show(100)
        })
    }

    function v(a) {
        1 == a ? e(".paste-here-btn, .clear-clipboard-btn").removeClass("disabled") : e(".paste-here-btn, .clear-clipboard-btn").addClass("disabled")
    }

    function m(t) {
        var n = e(".breadcrumb").width() + t, i = e("#view"), r = e("#help");
        if (e(".uploader").css("width", n), i.val() > 0) {
            if (1 == i.val())e("ul.grid li, ul.grid figure").css("width", "100%"); else {
                var o = Math.floor(n / 380);
                0 == o && (o = 1, e("h4").css("font-size", 12)), n = Math.floor(n / o - 3), e("ul.grid li, ul.grid figure").css("width", n)
            }
            r.hide()
        } else a.touch && r.show()
    }

    function h() {
        var a = e(this);
        0 == e("#view").val() && (1 == a.attr("toggle") ? (a.attr("toggle", 0), a.animate({top: "0px"}, {queue: !1, duration: 300})) : (a.attr("toggle", 1), a.animate({top: "-30px"}, {queue: !1, duration: 300})))
    }

    function _(e) {
        var a = new RegExp("(?:[?&]|&)" + e + "=([^&]+)", "i"), t = window.location.search.match(a);
        return t && t.length > 1 ? t[1] : null
    }

    function g() {
        1 == e("#popup").val() ? window.close() : ("function" == typeof parent.$(".modal").modal && parent.$(".modal").modal("hide"), "undefined" != typeof parent.jQuery && parent.jQuery ? "function" == typeof parent.jQuery.fancybox && parent.jQuery.fancybox.close() : "function" == typeof parent.$.fancybox && parent.$.fancybox.close())
    }

    function b(e) {
        for (var e, a = [/[\300-\306]/g, /[\340-\346]/g, /[\310-\313]/g, /[\350-\353]/g, /[\314-\317]/g, /[\354-\357]/g, /[\322-\330]/g, /[\362-\370]/g, /[\331-\334]/g, /[\371-\374]/g, /[\321]/g, /[\361]/g, /[\307]/g, /[\347]/g], t = ["A", "a", "E", "e", "I", "i", "O", "o", "U", "u", "N", "n", "C", "c"], n = 0; n < a.length; n++)e = e.replace(a[n], t[n]);
        return e
    }

    function y(a) {
        return null != a ? ("true" == e("#transliteration").val() && (a = b(a), a = a.replace(/[^A-Za-z0-9\.\-\[\] _]+/g, "")), "true" == e("#convert_spaces").val() && (a = a.replace(/ /g, e("#replace_with").val()), a = a.toLowerCase()), a = a.replace('"', ""), a = a.replace("'", ""), a = a.replace("/", ""), a = a.replace("\\", ""), a = a.replace(/<\/?[^>]+(>|$)/g, ""), e.trim(a)) : null
    }

    function w(a, t, n, i, r) {
        null !== n && (n = y(n), e.ajax({type: "POST", url: "execute.php?action=" + a, data: {path: t, name: n.replace("/", "")}}).done(function (e) {
            return"" != e ? (bootbox.alert(e), !1) : ("" != r && window[r](i, n), !0)
        }))
    }

    function x(a, t) {
        var n = e("li.dir", "ul.grid").filter(":visible"), i = e("li.file", "ul.grid").filter(":visible"), r = [], o = [], l = [], c = [];
        n.each(function () {
            var a = e(this), n = a.find(t).val();
            if (e.isNumeric(n))for (n = parseFloat(n); "undefined" != typeof r[n] && r[n];)n = parseFloat(parseFloat(n) + parseFloat(.001)); else n = n + "a" + a.find("h4 a").attr("data-file");
            r[n] = a.html(), o.push(n)
        }), i.each(function () {
            var a = e(this), n = a.find(t).val();
            if (e.isNumeric(n))for (n = parseFloat(n); "undefined" != typeof l[n] && l[n];)n = parseFloat(parseFloat(n) + parseFloat(.001)); else n = n + "a" + a.find("h4 a").attr("data-file");
            l[n] = a.html(), c.push(n)
        }), e.isNumeric(o[0]) ? o.sort(function (e, a) {
            return parseFloat(e) - parseFloat(a)
        }) : o.sort(), e.isNumeric(c[0]) ? c.sort(function (e, a) {
            return parseFloat(e) - parseFloat(a)
        }) : c.sort(), a && (o.reverse(), c.reverse()), n.each(function (a) {
            var t = e(this);
            t.html(r[o[a]])
        }), i.each(function (a) {
            var t = e(this);
            t.html(l[c[a]])
        })
    }

    function k(e, a) {
        return featherEditor.launch({image: e, url: a}), !1
    }

    function C() {
        e(".lazy-loaded").lazyload()
    }

    var j = "9.9.6", T = !0, I = 0, O = function () {
        var e = 0;
        return function (a, t) {
            clearTimeout(e), e = setTimeout(a, t)
        }
    }(), S = function (a) {
        var t = e("#base_url").val() + e("#cur_dir").val(), n = a.find("a.link").attr("data-file");
        return"" != n && null != n && (t += n), n = a.find("h4 a.folder-link").attr("data-file"), "" != n && null != n && (t += n), t
    }, U = {contextActions: {copy_url: function (a) {
        var t = S(a);
        bootbox.alert('URL:<br/><div class="input-append" style="width:100%"><input id="url_text' + I + '" type="text" style="width:80%; height:30px;" value="' + encodeURL(t) + '" /><button id="copy-button' + I + '" class="btn btn-inverse copy-button" style="width:20%; height:30px;" data-clipboard-target="url_text' + I + '" data-clipboard-text="Copy Me!" title="copy"></button></div>'), e("#copy-button" + I).html('<i class="icon icon-white icon-share"></i> ' + e("#lang_copy").val());
        var n = new ZeroClipboard(e("#copy-button" + I));
        n.on("ready", function (a) {
            n.on("wrongFlash noFlash", function () {
                ZeroClipboard.destroy()
            }), n.on("aftercopy", function (a) {
                e("#copy-button" + I).html('<i class="icon icon-ok"></i> ' + e("#ok").val()), e("#copy-button" + I).attr("class", "btn disabled"), I++
            }), n.on("error", function (e) {
            })
        })
    }, unzip: function (a) {
        var t = e("#sub_folder").val() + e("#fldr_value").val() + a.find("a.link").attr("data-file");
        e.ajax({type: "POST", url: "ajax_calls.php?action=extract", data: {path: t}}).done(function (a) {
            "" != a ? bootbox.alert(a) : window.location.href = e("#refresh").attr("href") + "&" + (new Date).getTime()
        })
    }, edit_img: function (a) {
        var t = a.attr("data-name"), n = e("#base_url_true").val() + e("#cur_dir").val() + t, i = e("#aviary_img");
        i.attr("data-name", t), show_animation(), i.attr("src", n).load(k(i.attr("id"), n))
    }, duplicate: function (a) {
        var t = a.find("h4").text().trim();
        bootbox.prompt(e("#lang_duplicate").val(), e("#cancel").val(), e("#ok").val(), function (e) {
            if (null !== e && (e = y(e), e != t)) {
                var n = a.find(".rename-file");
                w("duplicate_file", n.attr("data-path"), e, n, "apply_file_duplicate")
            }
        }, t)
    }, select: function (a) {
        {
            var t, n = S(a), i = e("#field_id").val();
            e("#return_relative_url").val()
        }
        if (console.log(n), n = n.replace(e("#base_url").val(), ""), n = n.replace(e("#cur_dir").val(), ""), t = 1 == e("#popup").val() ? window.opener : window.parent, "" != i)if (1 == e("#crossdomain").val())t.postMessage({sender: "responsivefilemanager", url: n, field_id: i}, "*"); else {
            var r = e("#" + i, t.document);
            r.val(n).trigger("change"), "function" == typeof t.responsive_filemanager_callback && t.responsive_filemanager_callback(i), g()
        } else apply_any(n)
    }, copy: function (e) {
        p(e, "copy")
    }, cut: function (e) {
        p(e, "cut")
    }, paste: function () {
        f()
    }, chmod: function (e) {
        l(e)
    }, edit_text_file: function (e) {
        r(e)
    }}, makeContextMenu: function () {
        var a = this;
        e.contextMenu({selector: "figure:not(.back-directory), .list-view2 figure:not(.back-directory)", autoHide: !0, build: function (n) {
            n.addClass("selected");
            var i = {callback: function (e, t) {
                a.contextActions[e](n)
            }, items: {}};
            return(n.find(".img-precontainer-mini .filetype").hasClass("png") || n.find(".img-precontainer-mini .filetype").hasClass("jpg") || n.find(".img-precontainer-mini .filetype").hasClass("jpeg")) && t && (i.items.edit_img = {name: e("#lang_edit_image").val(), icon: "edit_img", disabled: !1}), n.hasClass("directory") && 0 != e("#type_param").val() && (i.items.select = {name: e("#lang_select").val(), icon: "", disabled: !1}), i.items.copy_url = {name: e("#lang_show_url").val(), icon: "url", disabled: !1}, (n.find(".img-precontainer-mini .filetype").hasClass("zip") || n.find(".img-precontainer-mini .filetype").hasClass("tar") || n.find(".img-precontainer-mini .filetype").hasClass("gz")) && (i.items.unzip = {name: e("#lang_extract").val(), icon: "extract", disabled: !1}), n.find(".img-precontainer-mini .filetype").hasClass("edit-text-file-allowed") && (i.items.edit_text_file = {name: e("#lang_edit_file").val(), icon: "edit", disabled: !1}), n.hasClass("directory") || 1 != e("#duplicate").val() || (i.items.duplicate = {name: e("#lang_duplicate").val(), icon: "duplicate", disabled: !1}), n.hasClass("directory") || 1 != e("#copy_cut_files_allowed").val() ? n.hasClass("directory") && 1 == e("#copy_cut_dirs_allowed").val() && (i.items.copy = {name: e("#lang_copy").val(), icon: "copy", disabled: !1}, i.items.cut = {name: e("#lang_cut").val(), icon: "cut", disabled: !1}) : (i.items.copy = {name: e("#lang_copy").val(), icon: "copy", disabled: !1}, i.items.cut = {name: e("#lang_cut").val(), icon: "cut", disabled: !1}), 0 == e("#clipboard").val() || n.hasClass("directory") || (i.items.paste = {name: e("#lang_paste_here").val(), icon: "clipboard-apply", disabled: !1}), n.hasClass("directory") || 1 != e("#chmod_files_allowed").val() ? n.hasClass("directory") && 1 == e("#chmod_dirs_allowed").val() && (i.items.chmod = {name: e("#lang_file_permission").val(), icon: "key", disabled: !1}) : i.items.chmod = {name: e("#lang_file_permission").val(), icon: "key", disabled: !1}, i.items.sep = "----", i.items.info = {name: "<strong>" + e("#lang_file_info").val() + "</strong>", disabled: !0}, i.items.name = {name: n.attr("data-name"), icon: "label", disabled: !0}, "img" == n.attr("data-type") && (i.items.dimension = {name: n.find(".img-dimension").html(), icon: "dimension", disabled: !0}), i.items.size = n.hasClass("directory") ? {name: n.find(".file-size").html() + " - " + n.find(".nfiles").val() + " " + e("#lang_files").val() + " - " + n.find(".nfolders").val() + " " + e("#lang_folders").val(), icon: "size", disabled: !0} : {name: n.find(".file-size").html(), icon: "size", disabled: !0}, i.items.date = {name: n.find(".file-date").html(), icon: "date", disabled: !0}, i
        }, events: {hide: function () {
            e("figure").removeClass("selected")
        }}}), e(document).on("contextmenu", function (a) {
            return e(a.target).is("figure") ? void 0 : !1
        })
    }, bindGridEvents: function () {
        function a(a) {
            window[a.attr("data-function")](a.attr("data-file"), e("#field_id").val())
        }

        var t = e("ul.grid");
        t.on("click", ".modalAV", function (a) {
            var t = e(this);
            a.preventDefault();
            var n = e("#previewAV"), i = e(".body-preview");
            n.removeData("modal"), n.modal({backdrop: "static", keyboard: !1}), t.hasClass("audio") ? i.css("height", "80px") : i.css("height", "345px"), e.ajax({url: t.attr("data-url"), success: function (e) {
                i.html(e)
            }})
        }), t.on("click", ".file-preview-btn", function (a) {
            var t = e(this);
            a.preventDefault(), e.ajax({url: t.attr("data-url"), success: function (e) {
                bootbox.alert(e)
            }})
        }), t.on("click", ".preview", function () {
            var a = e(this);
            return 0 == a.hasClass("disabled") && e("#full-img").attr("src", decodeURIComponent(a.attr("data-url"))), !0
        }), t.on("click", ".rename-file", function () {
            var a = e(this), t = a.parent().parent().parent(), n = t.find("h4"), i = e.trim(n.text());
            bootbox.prompt(e("#rename").val(), e("#cancel").val(), e("#ok").val(), function (e) {
                null !== e && (e = y(e), e != i && w("rename_file", a.attr("data-path"), e, t, "apply_file_rename"))
            }, i)
        }), t.on("click", ".rename-folder", function () {
            var a = e(this), t = a.parent().parent().parent(), n = t.find("h4"), i = e.trim(n.text());
            bootbox.prompt(e("#rename").val(), e("#cancel").val(), e("#ok").val(), function (e) {
                null !== e && (e = y(e).replace(".", ""), e != i && w("rename_folder", a.attr("data-path"), e, t, "apply_folder_rename"))
            }, i)
        }), t.on("click", ".delete-file", function () {
            var a = e(this);
            bootbox.confirm(a.attr("data-confirm"), e("#cancel").val(), e("#ok").val(), function (t) {
                if (1 == t) {
                    w("delete_file", a.attr("data-path"), "", "", "");
                    var n = e("#files_number");
                    n.text(parseInt(n.text()) - 1), a.parent().parent().parent().parent().remove()
                }
            })
        }), t.on("click", ".delete-folder", function () {
            var a = e(this);
            bootbox.confirm(a.attr("data-confirm"), e("#cancel").val(), e("#ok").val(), function (t) {
                if (1 == t) {
                    w("delete_folder", a.attr("data-path"), "", "", "");
                    var n = e("#folders_number");
                    n.text(parseInt(n.text()) - 1), a.parent().parent().parent().remove()
                }
            })
        }), e("ul.grid").on("click", ".link", function () {
            a(e(this))
        }), e("ul.grid").on("click", "div.box", function (t) {
            var n = e(this).find(".link");
            if (0 !== n.length)a(n); else {
                var i = e(this).find(".folder-link");
                0 !== i.length && (document.location = e(i).prop("href"))
            }
        })
    }, makeFilters: function (a) {
        e("#filter-input").on("keyup",function () {
            e(".filters label").removeClass("btn-inverse"), e(".filters label").find("i").removeClass("icon-white"), e("#ff-item-type-all").addClass("btn-inverse"), e("#ff-item-type-all").find("i").addClass("icon-white");
            var t = y(e(this).val()).toLowerCase();
            e(this).val(t), a && O(function () {
                e("li", "ul.grid ").each(function () {
                    var a = e(this);
                    "" != t && -1 == a.attr("data-name").toLowerCase().indexOf(t) ? a.hide(100) : a.show(100)
                }), e.ajax({url: "ajax_calls.php?action=filter&type=" + t}).done(function (e) {
                    "" != e && bootbox.alert(e)
                }), O(function () {
                    var a = 0 != e("#descending").val() ? !0 : !1;
                    x(a, "." + e("#sort_by").val()), C()
                }, 500)
            }, 300)
        }).keypress(function (a) {
            13 == a.which && e("#filter").trigger("click")
        }), e("#filter").on("click", function () {
            var a = y(e("#filter-input").val());
            window.location.href = e("#current_url").val() + "&filter=" + a
        })
    }, makeUploader: function () {
        e("#uploader-btn").on("click", function () {
            var a = e("#sub_folder").val() + e("#fldr_value").val() + "/";
            a = a.substring(0, a.length - 1), e("#iframe-container").html(e("<iframe />", {name: "JUpload", id: "uploader_frame", src: "uploader/index.php?path=" + a, frameborder: 0, width: "100%", height: 360}))
        }), e(".upload-btn").on("click", function () {
            e(".uploader").show(500)
        }), e(".close-uploader").on("click", function () {
            e(".uploader").hide(500), setTimeout(function () {
                window.location.href = e("#refresh").attr("href") + "&" + (new Date).getTime()
            }, 420)
        })
    }, makeSort: function (a) {
        e("input[name=radio-sort]").on("click", function () {
            var n = e(this).attr("data-item"), i = e("#" + n), r = e(".filters label");
            r.removeClass("btn-inverse"), r.find("i").removeClass("icon-white"), e("#filter-input").val(""), i.addClass("btn-inverse"), i.find("i").addClass("icon-white"), "ff-item-type-all" == n ? a ? e(".grid li").show(300) : window.location.href = e("#current_url").val() + "&sort_by=" + e("#sort_by").val() + "&descending=" + (t ? 1 : 0) : e(this).is(":checked") && (e(".grid li").not("." + n).hide(300), e(".grid li." + n).show(300)), C()
        });
        var t = e("#descending").val();
        e(".sorter").on("click", function () {
            var n = e(this);
            t = e("#sort_by").val() === n.attr("data-sort") ? 0 == t ? !0 : !1 : !0, a ? (e.ajax({url: "ajax_calls.php?action=sort&sort_by=" + n.attr("data-sort") + "&descending=" + (t ? 1 : 0)}), x(t, "." + n.attr("data-sort")), e(" a.sorter").removeClass("descending").removeClass("ascending"), e(".sort-" + n.attr("data-sort")).addClass(t ? "descending" : "ascending"), e("#sort_by").val(n.attr("data-sort")), e("#descending").val(t ? 1 : 0), C()) : window.location.href = e("#current_url").val() + "&sort_by=" + n.attr("data-sort") + "&descending=" + (t ? 1 : 0)
        })
    }};
    e(document).ready(function () {
        if (e("#rfmDropzone").on("click", ".dz-success .dz-detail", function () {
            var a = e(this);
            alert(a.find(".dz-filename span").tex())
        }), T && U.makeContextMenu(), e("#full-img").on("click", function () {
            e("#previewLightbox").lightbox("hide")
        }), e("body").on("click", function () {
            e(".tip-right").tooltip("hide")
        }), U.bindGridEvents(), parseInt(e("#file_number").val()) > parseInt(e("#file_number_limit_js").val()))var t = !1; else var t = !0;
        if (U.makeSort(t), U.makeFilters(t), e("#info").on("click", function () {
            bootbox.alert('<div class="text-center"><br/><img src="img/logo.png" alt="responsive filemanager"/><br/><br/><p><strong>RESPONSIVE filemanager v.' + j + '</strong><br/><a href="http://www.responsivefilemanager.com">responsivefilemanager.com</a></p><br/><p>Copyright © <a href="http://www.tecrail.com" alt="tecrail">Tecrail</a> - Alberto Peripolli. All rights reserved.</p><br/><p>License<br/><small><img alt="Creative Commons License" style="border-width:0" src="http://responsivefilemanager.com/license.php" /><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/">Creative Commons Attribution-NonCommercial 3.0 Unported License</a>.</small></p></div>')
        }), e("#change_lang_btn").on("click", function () {
            o()
        }), U.makeUploader(), e("body").on("keypress", function (e) {
            var a = String.fromCharCode(e.which);
            return"'" == a || '"' == a || "\\" == a || "/" == a ? !1 : void 0
        }), e("ul.grid li figcaption").on("click", 'a[data-toggle="lightbox"]', function () {
            n(decodeURIComponent(e(this).attr("data-url")))
        }), e(".create-file-btn").on("click", function () {
            i()
        }), e(".new-folder").on("click", function () {
            bootbox.prompt(e("#insert_folder_name").val(), e("#cancel").val(), e("#ok").val(), function (a) {
                if (null !== a) {
                    a = y(a).replace(".", "");
                    var t = e("#sub_folder").val() + e("#fldr_value").val();
                    e.ajax({type: "POST", url: "execute.php?action=create_folder", data: {path: t, name: a}}).done(function (a) {
                        setTimeout(function () {
                            window.location.href = e("#refresh").attr("href") + "&" + (new Date).getTime()
                        }, 300)
                    })
                }
            })
        }), e(".view-controller button").on("click", function () {
            var a = e(this);
            e(".view-controller button").removeClass("btn-inverse"), e(".view-controller i").removeClass("icon-white"), a.addClass("btn-inverse"), a.find("i").addClass("icon-white"), e.ajax({url: "ajax_calls.php?action=view&type=" + a.attr("data-value")}).done(function (e) {
                "" != e && bootbox.alert(e)
            }), "undefined" != typeof e("ul.grid")[0] && e("ul.grid")[0] && (e("ul.grid")[0].className = e("ul.grid")[0].className.replace(/\blist-view.*?\b/g, "")), "undefined" != typeof e(".sorter-container")[0] && e(".sorter-container")[0] && (e(".sorter-container")[0].className = e(".sorter-container")[0].className.replace(/\blist-view.*?\b/g, ""));
            var t = a.attr("data-value");
            e("#view").val(t), e("ul.grid").addClass("list-view" + t), e(".sorter-container").addClass("list-view" + t), a.attr("data-value") >= 1 ? m(14) : (e("ul.grid li").css("width", 126), e("ul.grid figure").css("width", 122)), C()
        }), a.touch ? (e("#help").show(), e(".box:not(.no-effect)").swipe({swipeLeft: h, swipeRight: h, threshold: 30})) : (e(".tip").tooltip({placement: "bottom"}), e(".tip-top").tooltip({placement: "top"}), e(".tip-left").tooltip({placement: "left"}), e(".tip-right").tooltip({placement: "right"}), e("body").addClass("no-touch")), e(".paste-here-btn").on("click", function () {
            0 == e(this).hasClass("disabled") && f()
        }), e(".clear-clipboard-btn").on("click", function () {
            0 == e(this).hasClass("disabled") && d()
        }), !a.csstransforms) {
            var r = e("figure");
            r.on("mouseover", function () {
                0 == e("#view").val() && e("#main-item-container").hasClass("no-effect-slide") === !1 && e(this).find(".box:not(.no-effect)").animate({top: "-26px"}, {queue: !1, duration: 300})
            }), r.on("mouseout", function () {
                0 == e("#view").val() && e(this).find(".box:not(.no-effect)").animate({top: "0px"}, {queue: !1, duration: 300})
            })
        }
        e(window).resize(function () {
            m(28)
        }), m(14), v(1 == e("#clipboard").val() ? !0 : !1), e("li.dir, li.file").draggable({distance: 20, cursor: "move", helper: function () {
            e(this).find("figure").find(".box").css("top", "0px");
            var a = e(this).clone().css("z-index", 1e3).find(".box").css("box-shadow", "none").css("-webkit-box-shadow", "none").parent().parent();
            return e(this).addClass("selected"), a
        }, start: function () {
            0 == e("#view").val() && e("#main-item-container").addClass("no-effect-slide")
        }, stop: function () {
            e(this).removeClass("selected"), 0 == e("#view").val() && e("#main-item-container").removeClass("no-effect-slide")
        }}), e("li.dir,li.back").droppable({accept: "ul.grid li", activeClass: "ui-state-highlight", hoverClass: "ui-state-hover", drop: function (a, t) {
            u(t.draggable.find("figure"), e(this).find("figure"))
        }}), e(document).on("keyup", "#chmod_form #chmod_value", function () {
            c(!0)
        }), e(document).on("change", "#chmod_form input", function () {
            c(!1)
        }), e(document).on("focusout", "#chmod_form #chmod_value", function () {
            var a = e("#chmod_form #chmod_value");
            null == a.val().match(/^[0-7]{3}$/) && (a.val(a.attr("data-def-value")), c(!0))
        })
    }), encodeURL = function (e) {
        for (var a = e.split("/"), t = 3; t < a.length; t++)a[t] = encodeURIComponent(a[t]);
        return a.join("/")
    }, apply = function (a, t) {
        var n;
        n = 1 == e("#popup").val() ? window.opener : window.parent;
        var i = e("#cur_dir").val(), r = e("#subdir").val(), o = e("#base_url").val(), l = a.substr(0, a.lastIndexOf(".")), c = a.split(".").pop();
        c = c.toLowerCase();
        var s = "", d = ["ogg", "mp3", "wav"], p = ["mp4", "ogg", "webm"], f = e("#return_relative_url").val(), u = encodeURL((1 == f ? r : o + i) + a);
        if ("" != t)if (1 == e("#crossdomain").val())n.postMessage({sender: "responsivefilemanager", url: u, field_id: t}, "*"); else {
            var v = e("#" + t, n.document);
            v.val(u).trigger("change"), "function" == typeof n.responsive_filemanager_callback && n.responsive_filemanager_callback(t), g()
        } else e.inArray(c, ext_img) > -1 ? s = '<img src="' + u + '" alt="' + l + '" />' : e.inArray(c, p) > -1 ? s = '<video controls source src="' + u + '" type="video/' + c + '">' + l + "</video>" : e.inArray(c, d) > -1 ? ("mp3" == c && (c = "mpeg"), s = '<audio controls src="' + u + '" type="audio/' + c + '">' + l + "</audio>") : s = '<a href="' + u + '" title="' + l + '">' + l + "</a>", 1 == e("#crossdomain").val() ? n.postMessage({sender: "responsivefilemanager", url: u, field_id: null, html: s}, "*") : parent.tinymce.majorVersion < 4 ? (parent.tinymce.activeEditor.execCommand("mceInsertContent", !1, s), parent.tinymce.activeEditor.windowManager.close(parent.tinymce.activeEditor.windowManager.params.mce_window_id)) : (parent.tinymce.activeEditor.insertContent(s), parent.tinymce.activeEditor.windowManager.close())
    }, apply_link = function (a, t) {
        if (1 == e("#popup").val())var n = window.opener; else var n = window.parent;
        var i = e("#cur_dir").val();
        i = i.replace("\\", "/");
        var r = e("#subdir").val();
        r = r.replace("\\", "/");
        var o = e("#base_url").val(), l = e("#return_relative_url").val(), c = encodeURL((1 == l ? r : o + i) + a);
        if ("" != t)if (1 == e("#crossdomain").val())n.postMessage({sender: "responsivefilemanager", url: c, field_id: t}, "*"); else {
            var s = e("#" + t, n.document);
            s.val(c).trigger("change"), "function" == typeof n.responsive_filemanager_callback && n.responsive_filemanager_callback(t), g()
        } else apply_any(c)
    }, apply_img = function (a, t) {
        var n;
        n = 1 == e("#popup").val() ? window.opener : window.parent;
        var i = e("#cur_dir").val();
        i = i.replace("\\", "/");
        var r = e("#subdir").val();
        r = r.replace("\\", "/");
        var o = e("#base_url").val(), l = e("#return_relative_url").val(), c = encodeURL((1 == l ? r : o + i) + a);
        if ("" != t)if (1 == e("#crossdomain").val())n.postMessage({sender: "responsivefilemanager", url: c, field_id: t}, "*"); else {
            var s = e("#" + t, n.document);
            s.val(c).trigger("change"), "function" == typeof n.responsive_filemanager_callback && n.responsive_filemanager_callback(t), g()
        } else apply_any(c)
    }, apply_video = function (a, t) {
        var n;
        n = 1 == e("#popup").val() ? window.opener : window.parent;
        var i = e("#cur_dir").val();
        i = i.replace("\\", "/");
        var r = e("#subdir").val();
        r = r.replace("\\", "/");
        var o = e("#base_url").val(), l = e("#return_relative_url").val(), c = encodeURL((1 == l ? r : o + i) + a);
        if ("" != t)if (1 == e("#crossdomain").val())n.postMessage({sender: "responsivefilemanager", url: c, field_id: t}, "*"); else {
            var s = e("#" + t, n.document);
            s.val(c).trigger("change"), "function" == typeof n.responsive_filemanager_callback && n.responsive_filemanager_callback(t), g()
        } else apply_any(c)
    }, apply_none = function (a) {
        var t = e("ul.grid").find('li[data-name="' + a + '"] figcaption a');
        t[1].click(), e(".tip-right").tooltip("hide")
    }, apply_any = function (a) {
        if (1 == e("#crossdomain").val())window.parent.postMessage({sender: "responsivefilemanager", url: a, field_id: null}, "*"); else {
            var t = e("#editor").val();
            if ("ckeditor" == t) {
                var n = _("CKEditorFuncNum");
                window.opener.CKEDITOR.tools.callFunction(n, a), window.close()
            } else parent.tinymce.majorVersion < 4 ? (parent.tinymce.activeEditor.windowManager.params.setUrl(a), parent.tinymce.activeEditor.windowManager.close(parent.tinymce.activeEditor.windowManager.params.mce_window_id)) : (parent.tinymce.activeEditor.windowManager.getParams().setUrl(a), parent.tinymce.activeEditor.windowManager.close())
        }
    }, apply_file_duplicate = function (e, a) {
        var t = e.parent().parent().parent().parent();
        t.after("<li class='" + t.attr("class") + "' data-name='" + t.attr("data-name") + "'>" + t.html() + "</li>");
        var n = t.next();
        apply_file_rename(n.find("figure"), a);
        var i = n.find(".download-form"), r = "form" + (new Date).getTime();
        i.attr("id", r), i.find(".tip-right").attr("onclick", "$('#" + r + "').submit();")
    }, apply_file_rename = function (a, t) {
        var n;
        a.attr("data-name", t), a.parent().attr("data-name", t), a.find("h4").find("a").text(t);
        var i = a.find("a.link");
        n = i.attr("data-file");
        var r = n.substring(n.lastIndexOf("/") + 1), o = n.substring(n.lastIndexOf(".") + 1);
        i.each(function () {
            e(this).attr("data-file", encodeURIComponent(t + "." + o))
        }), a.find("img").each(function () {
            var a = e(this).attr("src");
            e(this).attr("src", a.replace(r, t + "." + o) + "?time=" + (new Date).getTime()), e(this).attr("alt", t + " thumbnails")
        });
        var l = a.find("a.preview");
        n = l.attr("data-url"), "undefined" != typeof n && n && l.attr("data-url", n.replace(encodeURIComponent(r), encodeURIComponent(t + "." + o))), a.parent().attr("data-name", t + "." + o), a.attr("data-name", t + "." + o), a.find(".name_download").val(t + "." + o);
        var c = a.find("a.rename-file"), s = a.find("a.delete-file"), d = c.attr("data-path"), p = d.replace(r, t + "." + o);
        c.attr("data-path", p), s.attr("data-path", p)
    }, apply_folder_rename = function (a, t) {
        a.attr("data-name", t), a.find("figure").attr("data-name", t);
        var n = a.find("h4").find("a").text();
        a.find("h4 > a").text(t);
        var i = a.find(".folder-link"), r = i.attr("href"), o = e("#fldr_value").val(), l = r.replace("fldr=" + o + encodeURIComponent(n), "fldr=" + o + encodeURIComponent(t));
        i.each(function () {
            e(this).attr("href", l)
        });
        var c = a.find("a.delete-folder"), s = a.find("a.rename-folder"), d = s.attr("data-path"), p = d.lastIndexOf("/"), f = d.substr(0, p + 1) + t;
        c.attr("data-path", f), s.attr("data-path", f)
    }, show_animation = function () {
        e("#loading_container").css("display", "block"), e("#loading").css("opacity", ".7")
    }, hide_animation = function () {
        e("#loading_container").fadeOut()
    }
}(jQuery, Modernizr, image_editor);