define(["require", "jquery", "underscore", "monster"],
function(e) {
    var a = e("jquery"),
    t = e("underscore"),
    n = e("monster"),
    i = {
        requests: {},
        subscribe: {
            "voip.callLogs.render": "callLogsRender"
        },
        callLogsRender: function(e) {
            var a = this;
            a.callLogsRenderContent(e.parent, e.fromDate, e.toDate, e.type, e.callback)
        },
        callLogsRenderContent: function(e, t, i, o, r) {
            var l, s = this,
            c = 1,
            d = 31;
            if (!i && !t) {
                var g = n.util.getDefaultRangeDates(c);
                t = g.from,
                i = g.to
            }
            var u = {
                timezone: "GMT" + jstz.determine_timezone().offset(),
                type: o || "today",
                fromDate: t,
                toDate: i,
                showFilteredDates: ["thisMonth", "thisWeek"].indexOf(o) >= 0,
                showReport: n.config.whitelabel.callReportEmail ? !0 : !1
            };
            delete s.lastALeg,
            delete s.loneBLegs,
            s.callLogsGetCdrs(t, i,
            function(o, c) {
                if (o = s.callLogsFormatCdrs(o), u.cdrs = o, l = a(n.template(s, "callLogs-layout", u)), o && o.length) {
                    var g = a(n.template(s, "callLogs-cdrsList", {
                        cdrs: o,
                        showReport: n.config.whitelabel.callReportEmail ? !0 : !1
                    }));
                    l.find(".call-logs-grid .grid-row-container").append(g)
                }
                var _ = {
                    container: l,
                    range: d
                };
                n.ui.initRangeDatepicker(_),
                l.find("#startDate").datepicker("setDate", t),
                l.find("#endDate").datepicker("setDate", i),
                c || l.find(".call-logs-loader").hide(),
                s.callLogsBindEvents({
                    template: l,
                    cdrs: o,
                    fromDate: t,
                    toDate: i,
                    nextStartKey: c
                }),
                n.ui.tooltips(l),
                e.empty().append(l),
                r && r()
            })
        },
        callLogsBindEvents: function(e) {
            function i() {
                var e = r.find(".call-logs-loader");
                d ? (e.toggleClass("loading"), e.find(".loading-message > i").toggleClass("fa-spin"), o.callLogsGetCdrs(s, c,
                function(t, i) {
                    t = o.callLogsFormatCdrs(t),
                    cdrsTemplate = a(n.template(o, "callLogs-cdrsList", {
                        cdrs: t,
                        showReport: n.config.whitelabel.callReportEmail ? !0 : !1
                    })),
                    d = i,
                    d || r.find(".call-logs-loader").hide(),
                    r.find(".call-logs-grid .grid-row-container").append(cdrsTemplate),
                    l = l.concat(t);
                    var s = r.find(".search-div input.search-query");
                    s.val() && s.keyup(),
                    e.toggleClass("loading"),
                    e.find(".loading-message > i").toggleClass("fa-spin")
                },
                d)) : e.hide()
            }
            var o = this,
            r = e.template,
            l = e.cdrs,
            s = e.fromDate,
            c = e.toDate,
            d = e.nextStartKey;
            setTimeout(function() {
                r.find(".search-query").focus()
            }),
            r.find(".apply-filter").on("click",
            function(e) {
                var a = r.find("input.filter-from").datepicker("getDate"),
                t = r.find("input.filter-to").datepicker("getDate");
                o.callLogsRenderContent(r.parents(".right-content"), a, t, "custom")
            }),
            r.find(".fixed-ranges button").on("click",
            function(e) {
                var t = a(this),
                n = t.data("type");
                if (r.find(".fixed-ranges button").removeClass("active"), t.addClass("active"), "custom" !== n) {
                    r.find(".call-logs-content").empty();
                    var i = o.callLogsGetFixedDatesFromType(n);
                    o.callLogsRenderContent(r.parents(".right-content"), i.from, i.to, n)
                } else r.find(".fixed-ranges-date").hide(),
                r.find(".custom-range").addClass("active")
            }),
            r.find(".download-csv").on("click",
            function(e) {
                var a = n.util.dateToBeginningOfGregorianDay(s),
                t = n.util.dateToEndOfGregorianDay(c);
                window.location.href = o.apiUrl + "accounts/" + o.accountId + "/cdrs?created_from=" + a + "&created_to=" + t + "&accept=text/csv&auth_token=" + o.authToken
            }),
            r.find(".search-div input.search-query").on("keyup",
            function(e) {
                if (r.find(".grid-row-container .grid-row").length > 0) {
                    var n = a(this).val().replace(/\|/g, "").toLowerCase(),
                    i = !1;
                    n.length <= 0 ? (r.find(".grid-row-group").show(), i = !0) : t.each(l,
                    function(e) {
                        var o = (e.callId || e.id) + (e.bLegs.length > 0 ? "|" + a.map(e.bLegs,
                        function(e) {
                            return e.callId || e.id
                        }).join("|") : ""),
                        l = (e.date + "|" + e.fromName + "|" + e.fromNumber + "|" + e.toName + "|" + e.toNumber + "|" + e.hangupCause + "|" + o).toLowerCase(),
                        s = r.find('.grid-row.a-leg[data-id="' + e.id + '"]').parents(".grid-row-group");
                        if (l.indexOf(n) >= 0) i = !0,
                        s.show();
                        else {
                            var c = t.find(e.bLegs,
                            function(e) {
                                var a = (e.date + "|" + e.fromName + "|" + e.fromNumber + "|" + e.toName + "|" + e.toNumber + "|" + e.hangupCause).toLowerCase();
                                return a.indexOf(n) >= 0
                            });
                            c ? (i = !0, s.show()) : s.hide()
                        }
                    }),
                    i ? r.find(".grid-row.no-match").hide() : r.find(".grid-row.no-match").show()
                }
            }),
            r.on("click", ".a-leg.has-b-legs",
            function(e) {
                var t = a(this).parents(".grid-row-group");
                t.hasClass("open") ? (t.removeClass("open"), t.find(".b-leg").slideUp()) : (r.find(".grid-row-group").removeClass("open"), r.find(".b-leg").slideUp(), t.addClass("open"), t.find(".b-leg").slideDown())
            }),
            r.on("click", ".grid-cell.details i",
            function(e) {
                e.stopPropagation();
                var t = a(this).parents(".grid-row").data("id");
                o.callLogsShowDetailsPopup(t)
            }),
            r.on("click", ".grid-cell.report a",
            function(e) {
                e.stopPropagation()
            }),
            r.find(".call-logs-grid").on("scroll",
            function(e) {
                var t = a(this);
                t.scrollTop() === t[0].scrollHeight - t.innerHeight() && i()
            }),
            r.find(".call-logs-loader:not(.loading) .loader-message").on("click",
            function(e) {
                i()
            })
        },
        callLogsGetFixedDatesFromType: function(e) {
            var a = new Date,
            t = new Date;
            switch (e) {
            case "today":
                break;
            case "thisWeek":
                var n = a.getDay(),
                i = (n || 7) - 1;
                a.setDate(a.getDate() - i);
                break;
            case "thisMonth":
                a.setDate(1)
            }
            return {
                from:
                a,
                to: t
            }
        },
        callLogsGetCdrs: function(e, a, i, o) {
            var r = this,
            l = n.util.dateToBeginningOfGregorianDay(e),
            s = n.util.dateToEndOfGregorianDay(a),
            c = {
                created_from: l,
                created_to: s,
                page_size: 50
            };
            o && (c.start_key = o),
            r.callApi({
                resource: "cdrs.list",
                data: {
                    accountId: r.accountId,
                    filters: c
                },
                success: function(e, a) {
                    var n = {},
                    o = t.groupBy(e.data,
                    function(e) {
                        return "inbound" !== e.direction && e.bridge_id ? "bLegs": "aLegs"
                    });
                    r.lastALeg && o.aLegs.splice(0, 0, r.lastALeg),
                    e.next_start_key && (r.lastALeg = o.aLegs.pop()),
                    t.each(o.aLegs,
                    function(e) {
                        var a = e.call_id || e.id;
                        n[a] = {
                            aLeg: e,
                            bLegs: {}
                        }
                    }),
                    r.loneBLegs && r.loneBLegs.length > 0 && t.each(r.loneBLegs,
                    function(e) {
                        "other_leg_call_id" in e && e.other_leg_call_id in n && (n[e.other_leg_call_id].bLegs[e.id] = e)
                    }),
                    r.loneBLegs = [],
                    t.each(o.bLegs,
                    function(e) {
                        "other_leg_call_id" in e && (e.other_leg_call_id in n ? n[e.other_leg_call_id].bLegs[e.id] = e: r.loneBLegs.push(e))
                    }),
                    i(n, e.next_start_key)
                }
            })
        },
        callLogsFormatCdrs: function(e) {
            var i = this,
            o = [],
            r = function(e) {
                var a = n.util.gregorianToDate(e.timestamp),
                t = n.util.toFriendlyDate(a, "shortDate"),
                o = n.util.toFriendlyDate(a, "time"),
                r = parseInt(e.duration_seconds / 60).toString(),
                l = (e.duration_seconds % 60 < 10 ? "0": "") + e.duration_seconds % 60,
                s = i.i18n.active().hangupCauses,
                c = "",
               
                d = "authorizing_id" in e && e.authorizing_id.length > 0;
                 var rurl = e.recording_url;
                var listen = '';
                if (rurl) {
                	rurl = rurl.replace(/\/recordings\//, "");
                	rurl = "https://s3-us-west-1.amazonaws.com/kazoorecordings/" + rurl;
                	listen = 'Download';
                }
                return s.hasOwnProperty(e.hangup_cause) && (d && s[e.hangup_cause].hasOwnProperty("outbound") ? c += s[e.hangup_cause].outbound: !d && s[e.hangup_cause].hasOwnProperty("inbound") && (c += s[e.hangup_cause].inbound)),
                {
                    id: e.id,
                    callId: e.call_id,
                    timestamp: e.timestamp,
                    date: t,
                    time: o,
                    fromName: e.caller_id_name,
                    fromNumber: e.caller_id_number || e.from.replace(/@.*/, ""),
                    toName: e.callee_id_name,
                    toNumber: e.callee_id_number || "request" in e ? e.request.replace(/@.*/, "") : e.to.replace(/@.*/, ""),
                    duration: r + ":" + l,
                    hangupCause: e.hangup_cause,
                    hangupHelp: c,
                    isOutboundCall: d,
                    mailtoLink: "mailto:" + n.config.whitelabel.callReportEmail + "?subject=Call Report: " + e.call_id + "&body=Please describe the details of the issue:%0D%0A%0D%0A%0D%0A____________________________________________________________%0D%0A%0D%0AAccount ID: " + i.accountId + "%0D%0AFrom (Name): " + (e.caller_id_name || "") + "%0D%0AFrom (Number): " + (e.caller_id_number || e.from.replace(/@.*/, "")) + "%0D%0ATo (Name): " + (e.callee_id_name || "") + "%0D%0ATo (Number): " + (e.callee_id_number || "request" in e ? e.request.replace(/@.*/, "") : e.to.replace(/@.*/, "")) + "%0D%0ADate: " + t + "%0D%0ADuration: " + r + ":" + l + "%0D%0AHangup Cause: " + (e.hangup_cause || "") + "%0D%0ACall ID: " + e.call_id + "%0D%0AOther Leg Call ID: " + (e.other_leg_call_id || "") + "%0D%0AHandling Server: " + (e.handling_server || ""),
                    recordingUrl: rurl,
                    listen: listen
                }
            };
            return t.each(e,
            function(e, n) {
                if ("aLeg" in e) {
                    var i = r(e.aLeg);
                    i.bLegs = [],
                    t.each(e.bLegs,
                    function(e, a) {
                        i.bLegs.push(r(e))
                    }),
                    o.push(i)
                } else t.each(e.bLegs,
                function(e, t) {
                    o.push(a.extend({
                        bLegs: []
                    },
                    r(e)))
                })
            }),
            o.sort(function(e, a) {
                return a.timestamp - e.timestamp
            }),
            o
        },
        callLogsShowDetailsPopup: function(e) {
            var t = this;
            t.callApi({
                resource: "cdrs.get",
                data: {
                    accountId: t.accountId,
                    cdrId: e
                },
                success: function(e, i) {
                    var o = a(n.template(t, "callLogs-detailsPopup"));
                    n.ui.renderJSON(e.data, o.find("#jsoneditor")),
                    n.ui.dialog(o, {
                        title: t.i18n.active().callLogs.detailsPopupTitle
                    })
                },
                error: function(e, a) {
                    n.ui.alert("error", t.i18n.active().callLogs.alertMessages.getDetailsError)
                }
            })
        }
    };
    return i
});