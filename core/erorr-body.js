function ErorrBody(body) {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title> ☠️ Erorr</title>
    <style>
      .container {
        font-family: monospace;
        background-color: rgb(237, 224, 224);
        border-radius: 10px;
        margin: 100px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
          rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
      }
      .erorr-btn {
        background-color: #ff0000;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        font-weight: bold;
      }
      .doc-btn {
        text-decoration: none;
        color: black;
        transition: all 0.3s ease-in-out;
      }
      .doc-btn:hover {
        text-decoration: underline;
      }
      .body {
        padding: 20px 30px;
        height: 300px;
        overflow-y: scroll;
        line-height: 25px;
      }
      .title {
        color: #ff0000;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 30px;
        border-bottom: 1px solid #ff0000;
      }
      .footer {
        padding: 1px 30px;
        display: flex;
        justify-content: end;
        align-items: center;
        border-top: 1px solid #ff0000;
      }
      /* width */
      ::-webkit-scrollbar {
        width: 5px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgb(237, 224, 224);
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #ff0000;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        box-shadow: inset 0 0 5px #ff0000;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h3 class="title">☠️ Error</h3>
        <div>
          <a href="/" class="doc-btn">Documentation</a>
          <button id="goback" class="erorr-btn">Go Back</button>
        </div>
      </div>
      <div class="body">
       ${body}
      </div>
      <div class="footer">
        <p>Enova v1.0.10</p>
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
