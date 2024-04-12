http
  .createServer(async (req, res) => {
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      res.writeHead(200);
      res.end(data);
    });
    try {
      const data = await fs.promises.readFile(
        path.join(__dirname, "index,html")
      );
    } catch (error) {
      console.error(error);
    }
  })
  .listen(8000, () => {
    console.log("서버 시작됨");
  });
