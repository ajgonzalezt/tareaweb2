
const fs = require("fs");

const http = require("http");

const axios = require("axios");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    let url = req.url;

    if (url == "/api/proveedores") {
      axios
        .get(
          "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
        )
        .then((resp) => {
          let respuesta = JSON.stringify(resp.data, null, 2);
          fs.writeFile("proveedores.json", respuesta, "utf8", () => {
            console.log("Json de proveedores escrito correctamente");
          });

          $.getScript("createTableClientes.js", () => {
            console.log("Exito cambiando build.html");
          });
        })
        .catch((err) => {
          // Manejo de error
          console.error(err);
        });

      const html = fs.readFileSync(__dirname + "/build.html", "utf8");
      res.end(html);
    } else if (url == "/api/cliente") {
      const html = fs.readFileSync(__dirname + "/build.html", "utf8");
      res.end(html);
    }

    const html = fs.readFileSync(__dirname + "/build.html", "utf8");

     fs.readFile("build.html", (err, data) => {
       if (err) {
         throw err;
       }
       console.log(data.toString());
       res.end(data);
     });
  })
  .listen(8081);
