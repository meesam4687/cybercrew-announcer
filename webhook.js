const fetch = require("node-fetch-commonjs");

function send(q, webhookUrls) {
    const messageData = {
        text: q,
    };

    webhookUrls.forEach(url => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(messageData),
        })
        .then((response) => {
            if (response.ok) {
                console.log("Message sent successfully");
            } else {
                console.error(
                    `Failed to send message. Error: ${response.status} ${response.statusText}`
                );
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });
}

module.exports = send;