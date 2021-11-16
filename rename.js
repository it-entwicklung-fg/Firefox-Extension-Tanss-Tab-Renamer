const title = document.querySelector('title');
let observer = new MutationObserver(function(mutations) {
    changeTitle();
});
const config = { subtree: true, characterData: true, childList: true };

observer.observe(title, config);
window.addEventListener ("load", changeTitle, false);

function changeTitle() {
    var args = window.location.search.replace("?","").split("&");
    var ticket, ticket_vorhanden = false, section, sub;
    args.forEach(element => {
        var arg = element.split("=");
        if (arg[0] == "bugID") {
            ticket = arg[1];
            ticket_vorhanden = true;
        } else if (arg[0] == "section") {
            section = arg[1];
        } else if (arg[0] == "sub") {
            sub = arg[1];
        }
    });
    observer.disconnect();
    if (section == "bug" && ticket_vorhanden) {
        document.title = "Ticket #" + ticket;
    } else if (section == "bug" && !ticket_vorhanden) {
        document.title = "Neues Ticket";
    } else if (section == "leistungen" && ticket_vorhanden) {
        document.title = "Neue Leistung | Ticket #" + ticket;
    } else if (section == "leistungen" && !ticket_vorhanden) {
        document.title = "Neue Leistung";
    } else if (section == "garantie" && sub == "new") {
        document.title = "PC/Server erstellen";
    } else if (section == "garantie" && sub == "edit") {
        document.title = "PC/Server bearbeiten";
    } else if (section == "intern") {
        document.title = "Hauptmenü";
    } else if (section == "internFirma") {
        document.title = "Hauptmenü - Firma";
    }
    observer.observe(title, config);
}
