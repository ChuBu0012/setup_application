const fs = require('fs');
const { exec } = require('child_process');

// Function to read a file and return its content as HTML links
function readLinks(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }

        const links = data.split('\n').map(link => {
            const trimmedLink = link.trim();
            return trimmedLink ? `<a href="${trimmedLink}" target="_blank" class="styled-link">${trimmedLink}</a><br>` : '';
        }).join('\n');

        callback(null, links);
    });
}

// Read both files
readLinks('D:/ย้ายเครื่อง/source_links/require_links.txt', (err, requireLinks) => {
    if (err) {
        console.error('Error reading the require_links.txt file:', err);
        return;
    }

    readLinks('D:/ย้ายเครื่อง/source_links/optional_links.txt', (err, optionalLinks) => {
        if (err) {
            console.error('Error reading the optional_links.txt file:', err);
            return;
        }

        // HTML content with separate sections for required and optional links
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Link Display</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
            color: #333;
        }
        h1 {
            font-size: 24px;
            color: #444;
        }
        #require-links-container, #optional-links-container {
            background-color: #fff;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        a.styled-link {
            display: inline-block;
            background-color: #1a73e8;
            color: white;
            text-decoration: none;
            padding: 10px 15px;
            margin: 5px 0;
            border-radius: 5px;
            border: 1px solid #1a73e8;
            transition: background-color 0.3s, color 0.3s;
        }
        a.styled-link:hover {
            background-color: #1558b0;
            border-color: #1558b0;
            color: #e2e2e2;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
        hr {
            border: none;
            height: 1px;
            background-color: #ddd;
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <h1>Required Links</h1>
    <div id="require-links-container">
        ${requireLinks}
    </div>
    <button type="button" onClick="openRequireLinks()">Open Required Links</button>

    <hr/>

    <h1>Optional Links</h1>
    <div id="optional-links-container">
        ${optionalLinks}
    </div>
    <button type="button" onClick="openOptionalLinks()">Open Optional Links</button>

    <hr/>

    <button type="button" onClick="openAllLinks()">Open All Links</button>

    <script>
        const openRequireLinks = () => {
            const links = document.querySelectorAll('#require-links-container a');
            links.forEach(link => {
                window.open(link.href, '_blank');
            });
        }

        const openOptionalLinks = () => {
            const links = document.querySelectorAll('#optional-links-container a');
            links.forEach(link => {
                window.open(link.href, '_blank');
            });
        }

        const openAllLinks = () => {
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                window.open(link.href, '_blank');
            });
        }
    </script>
</body>
</html>
        `;

        // Write HTML content to index.html
        fs.writeFile('index.html', htmlContent, (err) => {
            if (err) {
                console.error('Error writing the file:', err);
                return;
            }
            console.log('HTML file has been generated successfully.');

            // Open the generated index.html with the default browser
            exec('start index.html', (err) => {
                if (err) {
                    console.error('Error opening the HTML file:', err);
                }
            });
        });
    });
});
