// ./exportEventAsCSV.js
// Export one event OR an array of events to CSV and trigger a client-side download.

const csvEscape = (val) => {
    const s = String(val ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const slugify = (s) =>
    String(s ?? "event")
        .toLowerCase()
        .trim()
        .replace(/[^\w-]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

const yyyymmdd = (d) => {
    try {
        const dt = d ? new Date(d) : new Date();
        const pad = (n) => String(n).padStart(2, "0");
        return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
    } catch {
        return "date";
    }
};

// Calculates the same derived metrics the card shows, guarding for divide-by-zero/undefined
const computeDerived = (evt) => {
    const expectedAttendees = Number(evt?.expectedAttendees ?? 0);
    const clickCount = Number(evt?.clickCount ?? 0);
    const postEventClickCount = Number(evt?.postEventClickCount ?? 0);

    const engagementRate = expectedAttendees > 0
        ? ((clickCount / expectedAttendees) * 100).toFixed(2)
        : "0.00";

    const postEventEngagementRate = expectedAttendees > 0
        ? ((postEventClickCount / expectedAttendees) * 100).toFixed(2)
        : "0.00";

    const postClickRate = clickCount > 0
        ? ((postEventClickCount / clickCount) * 100).toFixed(2)
        : "0.00";

    return { engagementRate, postEventEngagementRate, postClickRate };
};

export const exportEventAsCSV = (eventOrArray) => {
    const events = Array.isArray(eventOrArray) ? eventOrArray : [eventOrArray];

    // Choose/adjust columns as you like
    const headers = [
        "id",
        "eventName",
        "status",
        "eventStartDate",
        "location",
        "expectedAttendees",
        "clickCount",
        "engagementRate(%)",
        "postEventClickCount",
        "postEventRetention(%)",
        "postClickRate(%)",
        "baseUrl",
        "destinationUrl"
    ];

    const rows = events.map((evt) => {
        const {
            _id,
            eventName,
            status,
            eventStartDate,
            location,
            expectedAttendees,
            clickCount,
            postEventClickCount,
            baseUrl,
            destinationUrl,
        } = evt ?? {};

        const {
            engagementRate,
            postEventEngagementRate,
            postClickRate
        } = computeDerived(evt);

        return [
            _id ?? "",
            eventName ?? "Platform Configuration",
            status ?? "",
            eventStartDate ?? "TBD",
            location ?? "Location TBD",
            Number(expectedAttendees ?? 0),
            Number(clickCount ?? 0),
            engagementRate,                 // %
            Number(postEventClickCount ?? 0),
            postEventEngagementRate,        // %
            postClickRate,                  // %
            baseUrl ?? "",
            destinationUrl ?? ""
        ];
    });

    const headerLine = headers.map(csvEscape).join(",");
    const body = rows.map((r) => r.map(csvEscape).join(",")).join("\n");

    // BOM + sep=, help Excel open with correct encoding and delimiter
    const csvContent = `\uFEFFsep=,\n${headerLine}\n${body}\n`;

    const first = events[0] ?? {};
    const namePart = slugify(first?.title || "event");
    const datePart = yyyymmdd(first?.date);
    const fileName = `${namePart}_${datePart}.csv`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
