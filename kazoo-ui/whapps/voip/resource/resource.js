winkstart.module("voip", "resource", {
    css: ["css/resource.css"],
    templates: {
        resource: "tmpl/resource.html",
        edit: "tmpl/edit.html",
        gateway: "tmpl/gateway.html",
        landing_resource: "tmpl/landing_resource.html",
        account_carrier_callflow: "tmpl/account_carrier_callflow.html"
    },
    subscribe: {
        "resource.activate": "activate",
        "resource.edit": "edit_resource",
        "callflow.define_callflow_nodes": "define_callflow_nodes"
    },
    validation: [{
        name: "#name",
        regex: /^.+$/
    }, {
        name: "#weight_cost",
        regex: /^[0-9]+$/
    }, {
        name: "#rules",
        regex: /^.*$/
    }, {
        name: "#caller_id_options_type",
        regex: /^\w*$/
    }, {
        name: "#gateways_username",
        regex: /^.*$/
    }, {
        name: "#gateways_password",
        regex: /^[^\s]*$/
    }, {
        name: "#gateways_prefix",
        regex: /^[\+]?[\#0-9]*$/
    }, {
        name: "#gateways_suffix",
        regex: /^[0-9]*$/
    }, {
        name: "#gateways_progress_timeout",
        regex: /^[0-9]*$/
    }],
    resources: {
        "local_resource.list": {
            url: "{api_url}/accounts/{account_id}/local_resources",
            contentType: "application/json",
            verb: "GET"
        },
        "local_resource.get": {
            url: "{api_url}/accounts/{account_id}/local_resources/{resource_id}",
            contentType: "application/json",
            verb: "GET"
        },
        "local_resource.create": {
            url: "{api_url}/accounts/{account_id}/local_resources",
            contentType: "application/json",
            verb: "PUT"
        },
        "local_resource.update": {
            url: "{api_url}/accounts/{account_id}/local_resources/{resource_id}",
            contentType: "application/json",
            verb: "POST"
        },
        "local_resource.delete": {
            url: "{api_url}/accounts/{account_id}/local_resources/{resource_id}",
            contentType: "application/json",
            verb: "DELETE"
        },
        "global_resource.list": {
            url: "{api_url}/accounts/{account_id}/global_resources",
            contentType: "application/json",
            verb: "GET"
        },
        "global_resource.get": {
            url: "{api_url}/accounts/{account_id}/global_resources/{resource_id}",
            contentType: "application/json",
            verb: "GET"
        },
        "global_resource.create": {
            url: "{api_url}/accounts/{account_id}/global_resources",
            contentType: "application/json",
            verb: "PUT"
        },
        "global_resource.update": {
            url: "{api_url}/accounts/{account_id}/global_resources/{resource_id}",
            contentType: "application/json",
            verb: "POST"
        },
        "global_resource.delete": {
            url: "{api_url}/accounts/{account_id}/global_resources/{resource_id}",
            contentType: "application/json",
            verb: "DELETE"
        },
        "account.get": {
            url: "{api_url}/accounts/{account_id}",
            contentType: "application/json",
            verb: "GET"
        }
    }
}, function (e) {
    var t = this;
    winkstart.registerResources(t.__whapp, t.config.resources), winkstart.publish("whappnav.subnav.add", {
        whapp: "voip",
        module: t.__module,
        label: _t("resource", "carriers_label"),
        icon: "resource",
        weight: "15",
        category: _t("config", "advanced_menu_cat")
    })
}, {
    fix_array: function (e, t) {
        return $.each(e.gateways, function (e, n) {
            n.codecs = t.gateways[0].codecs
        }), e.flags = t.flags, e
    }, save_resource: function (e, t, n, r) {
        var i = this,
            s = i.fix_array(i.normalize_data($.extend(!0, {}, t.data, e)), e);
        typeof t.data == "object" && t.data.id ? winkstart.request(!0, s.type + "_resource.update", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            resource_id: t.data.id,
            data: s
        }, function (e, t) {
            typeof n == "function" && n(e, t, "update")
        }, function (e, t) {
            typeof r == "function" && r(e, t, "update")
        }) : winkstart.request(!0, s.type + "_resource.create", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            data: s
        }, function (e, t) {
            typeof n == "function" && n(e, t, "create")
        }, function (e, t) {
            typeof r == "function" && r(e, t, "create")
        })
    }, edit_resource: function (e, t, n, r, i) {
        var s = this,
            o = t || $("#resource-content"),
            u = n || $("#resource-view", o),
            r = r || {},
            a = {
                save_success: r.save_success || function (e) {
                    s.render_list(o), s.edit_resource({
                        id: e.data.id,
                        type: e.data.type
                    }, o, u, a)
                }, save_error: r.save_error,
                delete_success: r.delete_success || function () {
                    u.empty(), s.render_list(o)
                }, delete_error: r.delete_error,
                after_render: r.after_render
            },
            f = {
                data: $.extend(!0, {
                    weight_cost: 50,
                    enabled: !0,
                    gateways: [{
                        prefix: "+1",
                        codecs: ["PCMU", "PCMA"],
                        progress_timeout: "6",
                        accountcode: 88888888,
                        custom_sip_headers: {"X-accountcode": 1234},
                        
                    }],
                    rules: ["^\\+{0,1}1{0,1}(\\d{10})$"],
                    caller_id_options: {
                        type: "external"
                    },
                    flags: []
                }, i || {}),
                field_data: {
                    caller_id_options: {
                        type: {
                            external: "external",
                            internal: "internal",
                            emergency: "emergency"
                        }
                    },
                    gateways: {
                        codecs: {
                            OPUS: "OPUS",
                            "CELT@32000h": "Siren @ 32Khz",
                            "G7221@32000h": "G722.1 @ 32khz",
                            "G7221@16000h": "G722.1 @ 16khz",
                            G722: "G722",
                            "speex@32000h": "Speex @ 32khz",
                            "speex@16000h": "Speex @ 16khz",
                            PCMU: "G711u / PCMU - 64kbps (North America)",
                            PCMA: "G711a / PCMA - 64kbps (Elsewhere)",
                            G729: "G729 - 8kbps (Requires License)",
                            GSM: "GSM",
                            "CELT@48000h": "Siren (HD) @ 48kHz",
                            "CELT@64000h": "Siren (HD) @ 64kHz"
                        }
                    },
                    rules: {
                        "^\\+{0,1}1{0,1}(\\d{10})$": "US - 10 digits",
                        "^(\\d{7})$": "US - 7 digits",
                        ".*": _t("resource", "match_all"),
                        custom: _t("resource", "custom")
                    }
                },
                functions: {
                    inArray: function (e, t) {
                        return $.inArray(e, t) == -1 ? !1 : !0
                    }
                }
            };
        if (typeof e == "object" && e.id && e.type) winkstart.request(!0, e.type + "_resource.get", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            resource_id: e.id
        }, function (t, n) {
        		f.data.gateways[0].custom_sip_headers["X-accountcode"] = f.data.gateways[0].accountcode;
            //t.data.type = e.type, t.data.gateways[0].codecs && (f.data.gateways[0].codecs = t.data.gateways[0].codecs);
            
            var r = $.extend(!0, f, t);
            r.data.gateways[0].custom_sip_headers["X-accountcode"] = r.data.gateways[0].accountcode;
            s.migrate_data(r), s.render_resource(r, u, a), typeof a.after_render == "function" && a.after_render()
        });
        else {
            if (!("admin" in winkstart.apps.voip) || !winkstart.apps.voip.admin) f.data.type = "local";
            s.render_resource(f, u, a), typeof a.after_render == "function" && a.after_render()
        }
    }, migrate_data: function (e) {
        var t = this;
        if (e.hasOwnProperty("gateways") && e.gateways[0].hasOwnProperty("codecs")) {
            var n = {
                    Speex: "speex@16000h",
                    G722_16: "G7221@16000h",
                    G722_32: "G7221@32000h",
                    CELT_48: "CELT@48000h",
                    CELT_64: "CELT@64000h"
                },
                r = [];
            _.each(e.gateways[0].codecs, function (e) {
                n.hasOwnProperty(e) ? r.push(n[e]) : r.push(e)
            }), e.gateways[0].codecs = r
        }
        return e
    }, delete_resource: function (e, t, n) {
        var r = this;
        e.data.id && winkstart.request(!0, e.data.type + "_resource.delete", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            resource_id: e.data.id
        }, function (e, n) {
            typeof t == "function" && t(e, n)
        }, function (e, t) {
            typeof n == "function" && n(e, t)
        })
    }, render_resource: function (e, t, n) {
        e._t = function (e) {
            return window.translate.resource[e]
        };
        var r = this,
            i = r.templates.edit.tmpl(e),
            s = function () {
                var e = $("#rules_dropdown", i).val();
                e != "custom" ? $("#rules", i).val("").hide() : $("#rules", i).val("").show()
            },
            o;
        winkstart.validate.set(r.config.validation, i), $("*[rel=popover]", i).popover({
            trigger: "focus"
        }), winkstart.tabs($(".view-buttons", i), $(".tabs", i), !0), $(".resource-save", i).click(function (t) {
            t.preventDefault(), winkstart.validate.is_valid(r.config.validation, i, function () {
                var t = form2object("resource-form");
                r.clean_form_data(t), "field_data" in e && delete e.field_data, r.save_resource(t, e, n.save_success, winkstart.error_message.process_error(n.save_error))
            }, function () {
                winkstart.alert(_t("resource", "there_were_errors_on_the_form"))
            })
        }), $(".resource-delete", i).click(function (t) {
            t.preventDefault(), winkstart.confirm(_t("resource", "are_you_sure_you_want_to_delete"), function () {
                r.delete_resource(e, n.delete_success, n.delete_error)
            })
        }), $("#gateways_server", i).bind("keyup change blur", function () {
            var e = $(this).val(),
                t = $(this).dataset("prev_value");
            t == $("#gateways_realm", i).val() && $("#gateways_realm", i).val(e), $(this).dataset("prev_value", e)
        }), $("#rules_dropdown", i).change(function () {
            s()
        }), e.data.rules[0] in e.field_data.rules ? $("#rules", i).hide() : $("#rules_dropdown", i).val("custom"), o = n.after_render, n.after_render = function () {
            typeof o == "function" && o(), $("#weight_cost", i).slider({
                from: 0,
                to: 100,
                step: 1,
                scale: [_t("resource", "highest"), _t("resource", "high"), _t("resource", "normal"), _t("resource", "low"), _t("resource", "lowest")],
                limits: !1
            })
        }, t.empty().append(i)
    }, normalize_data: function (e) {
        return e
    }, list_local_resources: function (e) {
        winkstart.getJSON("local_resource.list", {
            crossbar: !0,
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function (t, n) {
            typeof e == "function" && e(t)
        })
    }, list_global_resources: function (e) {
        winkstart.getJSON("global_resource.list", {
            crossbar: !0,
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function (t, n) {
            typeof e == "function" && e(t)
        })
    }, render_list: function (e, t) {
        var n = this,
            r = function (n, r) {
                function s(e, t) {
                    var n = [];
                    return e.length > 0 && _.each(e, function (e) {
                        n.push({
                            id: e.id,
                            title: e.name,
                            type: t
                        })
                    }), n
                }
                var i, o = {};
                o.label = _t("resource", "carriers_module_label"), o.identifier = "resource-listview", o.new_entity_label = _t("resource", "add_carrier_label"), i = [].concat(s(n, "local"), s(r, "global")), i.sort(function (e, t) {
                    var n;
                    return e.title.toLowerCase() < t.title.toLowerCase() ? n = -1 : n = 1, n
                }), o.data = i, o.publisher = winkstart.publish, o.notifyMethod = "resource.edit", o.notifyCreateMethod = "resource.edit", $("#resource-listpanel", e).empty(), $("#resource-listpanel", e).listpanel(o), typeof t == "function" && t()
            };
        "admin" in winkstart.apps.voip && winkstart.apps.voip.admin === !0 ? n.list_global_resources(function (e) {
            n.list_local_resources(function (t) {
                r(t.data, e.data)
            })
        }) : n.list_local_resources(function (e) {
            r(e.data, [])
        })
    }, clean_form_data: function (e) {
        return e.rules_dropdown != "custom" && (e.rules[0] = e.rules_dropdown), delete e.rules_dropdown, $.each(e.gateways, function (t, n) {
            var r = [];
            $.each(n.codecs, function (e, t) {
                t && r.push(t)
            }), e.gateways[t].codecs = r
        }), e.extra.flags && (e.flags = e.extra.flags.replace(/\s/g, "").split(",").filter(function (e) {
            return e != ""
        })), delete e.extra, e
    }, delete_nomatch_route: function (e, t) {
        winkstart.request("callflow.get_no_match", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function (t, n) {
            t.data.length > 0 ? winkstart.request("callflow.delete", {
                account_id: winkstart.apps.voip.account_id,
                api_url: winkstart.apps.voip.api_url,
                callflow_id: t.data[0].id
            }, function (t, n) {
                e(t, n)
            }) : e(t, n)
        }, function (e, n) {
            t(e, n)
        })
    }, update_nomatch_route: function (e, t) {
        var n = this;
        n.delete_nomatch_route(function () {
            winkstart.request("callflow.create", {
                account_id: winkstart.apps.voip.account_id,
                api_url: winkstart.apps.voip.api_url,
                data: {
                    featurecode: {},
                    numbers: ["no_match"],
                    flow: {
                        children: {},
                        data: {},
                        module: t
                    }
                }
            }, function (r) {
                n.render_landing_resource(e, t)
            }, function (e, t) {
                winkstart.alert(_t("resource", "error") + t)
            })
        })
    }, render_landing_resource: function (e, t) {
        var n = this,
            t = t || "none",
            r, i = function () {
                $(".resource_btn", resource_html).click(function () {
                    $(this).hasClass("pressed") ? n.delete_nomatch_route(function () {
                        r = "none", n.render_landing_resource(e, r), $(".resource_btn", resource_html).removeClass("pressed")
                    }) : $(this).hasClass("hosted_btn") ? (r = "offnet", n.update_nomatch_route(e, r)) : winkstart.confirm(_t("resource", "are_you_sure_you_want_to_use"), function () {
                        r = "resources", n.update_nomatch_route(e, r)
                    })
                })
            },
            s = function () {
                resource_html = n.templates.landing_resource.tmpl({
                    company_name: winkstart.config.company_name || !1,
                    resource_type: t,
                    _t: function (e) {
                        return window.translate.resource[e]
                    }
                }), i();
                if (t === "resources") {
                    var r = n.templates.resource.tmpl();
                    (e || $("#ws-content")).empty().append(r), n.render_list(e, function () {
                        $("#resource-view", e).append(resource_html)
                    })
                } else(e || $("#ws-content")).empty().append(resource_html)
            };
        t === "none" ? winkstart.request("callflow.get_no_match", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function (e, n) {
            e.data.length > 0 ? winkstart.request("callflow.get", {
                account_id: winkstart.apps.voip.account_id,
                api_url: winkstart.apps.voip.api_url,
                callflow_id: e.data[0].id
            }, function (e, n) {
                t = e.data.flow.module, s()
            }) : s()
        }) : s()
    }, activate: function (e) {
        var t = this;
        t.render_landing_resource(e)
    }, define_callflow_nodes: function (e) {
        var t = this;
        $.extend(e, {
            "offnet[]": {
                name: _t("resource", "global_carrier"),
                icon: "offnet",
                category: _t("config", "advanced_cat"),
                module: "offnet",
                tip: _t("resource", "global_carrier_tip"),
                data: {},
                rules: [{
                    type: "quantity",
                    maxSize: "0"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return ""
                }, edit: function (e, t) {
                    typeof t == "function" && t()
                }
            },
            "resources[]": {
                name: _t("resource", "account_carrier"),
                icon: "resource",
                category: _t("config", "advanced_cat"),
                module: "resources",
                tip: _t("resource", "account_carrier_tip"),
                data: {},
                rules: [{
                    type: "quantity",
                    maxSize: "0"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return ""
                }, edit: function (e, n) {
                    var r, i;
                    i = t.templates.account_carrier_callflow.tmpl({
                        _t: function (e) {
                            return window.translate.resource[e]
                        }, data_resource: {
                            hunt_account_id: e.getMetadata("hunt_account_id") || ""
                        }
                    }), $("#add", i).click(function () {
                        var t = $("#hunt_account_id", i).val();
                        t && e.setMetadata("hunt_account_id", t), r.dialog("close")
                    }), r = winkstart.dialog(i, {
                        title: _t("resource", "account_carrier_title"),
                        minHeight: "0",
                        beforeClose: function () {
                            typeof n == "function" && n()
                        }
                    })
                }
            }
        })
    }
});