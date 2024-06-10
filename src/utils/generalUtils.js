export function idCreator() {
    let sybmols = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789"
    let sessionID = ""
    for (let i = 0; i < 20; i++) {
        sessionID += sybmols.charAt(Math.random() * sybmols.length)
    }
    return sessionID
}