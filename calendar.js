(function () {
  "use strict";

  function escapeText(value) {
    return String(value || "")
      .replace(/\\/g, "\\\\")
      .replace(/\r\n|\r|\n/g, "\\n")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,");
  }

  function fold(line) {
    var result = "";
    var size = 0;
    var i;
    for (i = 0; i < line.length; i += 1) {
      var character = line.charAt(i);
      var bytes = unescape(encodeURIComponent(character)).length;
      if (size + bytes > 75) {
        result += "\r\n ";
        size = 1;
      }
      result += character;
      size += bytes;
    }
    return result;
  }

  window.downloadInviteCalendar = function (event) {
    var start = String(event.start || "").replace(/[-:]/g, "");
    var end = String(event.end || "").replace(/[-:]/g, "");
    if (!/^\d{8}T\d{6}$/.test(start) || !/^\d{8}T\d{6}$/.test(end)) return;
    var inviteUrl = location.href.split(/[?#]/)[0];
    var stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    var lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//Ruby Hour//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:" + escapeText(inviteUrl),
      "DTSTAMP:" + stamp,
      "DTSTART:" + start,
      "DTEND:" + end,
      "SUMMARY:" + escapeText(event.title),
      "LOCATION:" + escapeText(event.place),
      "DESCRIPTION:" + escapeText(inviteUrl),
      "URL:" + inviteUrl,
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    var blob = new Blob([lines.map(fold).join("\r\n") + "\r\n"], {
      type: "text/calendar;charset=utf-8",
    });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "invitation.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 60000);
  };
})();
