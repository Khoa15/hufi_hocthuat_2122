const getDate = () => {
    let date = new Date();
    return ("0" + date.getDay()).slice(-2) + "-" + ("0" + date.getMonth()).slice(-2) + "-" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
}

module.exports = {getDate}