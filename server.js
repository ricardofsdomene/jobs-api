const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
fs = require('fs');

const sharp = require("sharp");

const authRoutes = require("./routes/Auth");
const vagaRoutes = require("./routes/Vaga");
const userRoutes = require("./routes/User");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = "ricardo";
const password = "Azd202020";
const database = "dbOne";
const server = `mongodb+srv://${user}:${password}@cluster0.94tuo.mongodb.net/${database}?retryWrites=true&w=majority`;
const config = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(server, config).then(() => {
  console.log("Database connection successfully!");
});

const port = 5556;
const version = 0;

app.use(`/auth`, authRoutes);
app.use(`/core`, vagaRoutes);
app.use(`/user`, userRoutes);


const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  fileFilter: multerFilter
});

app.post('/image', upload.array(), function(req, res) {
    const { key, base64 } = req.body;

    let imgBuffer = Buffer.from(base64, 'base64');
    sharp(imgBuffer)
    .resize(400, 400)
    .toBuffer()
    .then((data) => {
      console.log('Imagem adicionada com sucesso');
      fs.writeFile(__dirname + `/upload/${key}.jpeg`, data, function (err, data) {
        if (err) {
          console.log('err', err)
        }
        var stats = fs.statSync(__dirname + `/upload/${key}.jpeg`);
        var fileSizeInBytes = stats.size;
        var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
        console.log('tamanho da imagem', fileSizeInMegabytes + 'Mb');
      })
    })
    .catch((error) => {
      console.log('error', error)
    })

    // console.log('writing file...', base64Data);
    // fs.writeFile(__dirname + "/upload/out.png", base64Data, 'base64', function(err) {
    //     if (err) console.log(err);
    //     fs.readFile(__dirname + "/upload/out.png", function(err, data) {
    //         if (err) throw err;
    //         console.log('reading file...', data.toString('base64'));
    //         res.send(data);
    //     });
    // });
});

// [ POST ] vernagro.com.br/api/v0/auth/login
// [ POST ] vernagro.com.com/api/v0/auth/produtor
// [ POST ] vernagro.com.com/api/v0/auth/consultor
// [ POST ] vernagro.com.com/api/v0/auth/diretor
// [ POST ] vernagro.com.com/api/v0/auth/comercial

// [ POST ] vernagro.com.com/api/v0/core/empresa
// [ GET ] vernagro.com.com/api/v0/core/empresa
// [ DELETE ] vernagro.com.com/api/v0/core/empresa
// [ GET ] vernagro.com.com/api/v0/core/empresas

// [ POST ] vernagro.com.com/api/v0/core/filial
// [ GET ] vernagro.com.com/api/v0/core/filial
// [ DELETE ] vernagro.com.com/api/v0/core/filial
// [ GET ] vernagro.com.com/api/v0/core/filiais

// [ POST ] vernagro.com.com/api/v0/core/pde
// [ GET ] vernagro.com.com/api/v0/core/pde
// [ DELETE ] vernagro.com.com/api/v0/core/pde
// [ GET ] vernagro.com.com/api/v0/core/pdes

app.listen(port, () => {
  console.log("Servidor rodando na porta", port);
});
