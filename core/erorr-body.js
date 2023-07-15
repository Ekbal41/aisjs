function ErorrBody(body) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Erorr</title>
      <style>
        .container {
          font-family: monospace;
          background-color: rgb(237, 224, 224);
          border-radius: 10px;
          margin: 100px;
          padding: 20px;
        }
        .erorr-button {
          background-color: red;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="flex">
          <h3 style="margin-top: 0px;margin-bottom: 10px; color: red">Error:</h3>
          <button id="goback" class="erorr-button">Go Back</button>
        </div>
        <div style="line-height: normal">
        ${body}
        </div>
      </div>
      <script>
        const goback = document.getElementById("#goback");
        goback.addEventListener("click", () => {
          window.history.back();
        });
      </script>
    </body>
  </html>
  
  `;
}

module.exports = ErorrBody;
