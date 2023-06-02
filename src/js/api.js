async function api(end_url, method, data) {
    const response = await fetch('http://localhost:8081/' + end_url, {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        method: method,
        body: JSON.stringify(data)
    });

    return await response.json();
}