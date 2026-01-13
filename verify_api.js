const http = require('http');

const options = (method, path, data) => ({
    hostname: 'localhost',
    port: 5000,
    path: `/api/tasks${path}`,
    method: method,
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data ? Buffer.byteLength(data) : 0
    }
});

const request = (method, path, data) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options(method, path, data), (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    // Verify status code is 2xx
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(body ? JSON.parse(body) : {});
                    } else {
                        reject(`Status ${res.statusCode}: ${body}`);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(data);
        req.end();
    });
};

(async () => {
    try {
        console.log("1. Creating Task...");
        const task = await request('POST', '/', JSON.stringify({ title: 'Test Task', description: 'Testing' }));
        console.log("Created:", task._id);

        console.log("2. Fetching Tasks...");
        const tasks = await request('GET', '', null);
        if (!tasks.find(t => t._id === task._id)) throw new Error('Task not found in list');
        console.log("Task found in list.");

        console.log("3. Updating Task...");
        const updated = await request('PUT', `/${task._id}`, JSON.stringify({ isCompleted: true }));
        if (!updated.isCompleted) throw new Error('Task not updated');
        console.log("Task updated (completed).");

        console.log("4. Deleting Task...");
        await request('DELETE', `/${task._id}`, null);
        console.log("Task deleted.");

        console.log("5. Verifying Deletion...");
        const tasksAfter = await request('GET', '', null);
        if (tasksAfter.find(t => t._id === task._id)) throw new Error('Task still exists');
        console.log("Deletion verified.");

        console.log("API VERIFICATION SUCCESSFUL");
    } catch (err) {
        console.error("VERIFICATION FAILED:", err);
        process.exit(1);
    }
})();
