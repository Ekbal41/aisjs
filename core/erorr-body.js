// function ErorrBody(err, msg) {
//   const formattedStack = err.stack.replace(/\n/g, "<br>");

//   return `
//   <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title> ☠️ Erorr</title>
//     <style>
//       .container {
//         font-family: monospace;
//         background-color: rgb(237, 224, 224);
//         border-radius: 10px;
//         margin: 100px;
//         box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
//           rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
//       }
//       .erorr-btn {
//         background-color: #ff0000;
//         color: white;
//         border: none;
//         border-radius: 5px;
//         padding: 5px 10px;
//         cursor: pointer;
//         font-weight: bold;
//       }
//       .doc-btn {
//         text-decoration: none;
//         color: black;
//         transition: all 0.3s ease-in-out;
//       }
//       .doc-btn:hover {
//         text-decoration: underline;
//       }
//       .body {
//         padding: 20px 30px;
//         height: 300px;
//         overflow-y: scroll;
//         line-height: 25px;
//       }
//       .title {
//         color: #ff0000;
//       }
//       .header {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         padding: 0px 30px;
//         border-bottom: 1px solid #ff0000;
//       }
//       .footer {
//         padding: 1px 30px;
//         display: flex;
//         justify-content: end;
//         align-items: center;
//         border-top: 1px solid #ff0000;
//       }
//       /* width */
//       ::-webkit-scrollbar {
//         width: 5px;
//       }

//       /* Track */
//       ::-webkit-scrollbar-track {
//         box-shadow: inset 0 0 5px rgb(237, 224, 224);
//       }

//       /* Handle */
//       ::-webkit-scrollbar-thumb {
//         background: #ff0000;
//       }

//       /* Handle on hover */
//       ::-webkit-scrollbar-thumb:hover {
//         box-shadow: inset 0 0 5px #ff0000;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="header">
//         <h3 class="title">☠️ Error</h3>
//         <div>
//           <a href="/" class="doc-btn">Documentation</a>
//           <button id="goback" class="erorr-btn">Go Back</button>
//         </div>
//       </div>
//       <div class="body">
//       <p>${msg || ""}</p>
//        ${formattedStack || ""}

//       </div>
//       <div class="footer">
//         <p>Enova v1.0.10</p>
//       </div>
//     </div>
//     <script>
//       const goback = document.getElementById("#goback");
//       goback.addEventListener("click", () => {
//         window.history.back();
//       });
//     </script>
//   </body>
// </html>

//   `;
// }

// module.exports = ErorrBody;

function ErrorBody(err, msg) {
  const formattedStack = err.stack.replace(/\n/g, "<br>");

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Erorr</title>
      <style>
        .container {
          margin-top: 10%;
          background-color: #f9fafb;
          width: 740px;
          margin-left: auto;
          margin-right: auto;
          padding: 20px 20px 0px 20px;
          border-top: 5px solid #ff0000;
          border-bottom: 2px solid #f3f4f6;
          border-left: 2px solid #f3f4f6;
          border-right: 2px solid #f3f4f6;
          font-family: sans-serif;
        }
        .title {
          margin-top: 0;
          font-size: medium;
        }
        .key {
          font-weight: bold;
          margin-right: 10px;
        }
        .stack{
          line-height: 20px;
          font-size: 14px;

  
        }
        @media only screen and (max-width: 768px) {
          .container {
            width: 350px;
          }
        }
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
          .container {
            width: 550px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="title">${msg}</h1>
       <p class="stack">
       ${formattedStack || ""}</p>
      </div>
    </body>
  </html>
  
  
  `;
}

module.exports = ErrorBody;
