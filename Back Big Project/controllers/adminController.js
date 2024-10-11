const fs = require("fs");
const path = require("path");
const parseRequestBody = require("../utils/parser");
const loadEjs = require("../utils/load-ejs");
const getRootPath = require("../utils/root-path");
const generateUniqueId = require("../utils/generateUniqueId");
const { getAdminPage } = require("../services/admin-service");

const dbFilePath = path.join(getRootPath(), "database/db.json");

const getAdmin = (req, res) => {
  loadEjs("admin", req, res);
};

const getPost = async (req, res) => {
  const data = await getAdminPage();
  const datas = {
    menu: data,
  };
  loadEjs("post", req, res, datas);
};

const postAdmin = async (req, res) => {
  const parsedBody = await parseRequestBody(req);
  const { fullname, priceSmall , priceBig , img } = parsedBody;

  fs.readFile(dbFilePath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }

    let MenuData = JSON.parse(data);
    const newId = generateUniqueId(MenuData.menu);

    if (fullname.length === 0 || priceSmall.length === 0 || priceBig.length === 0 || img.length === 0) {
      res.writeHead(201, { "Content-Type": "text/html" });
      res.end(
        "<script>alert('Input must not be empty '); window.location.href = '/admin';</script>"
      );
      return;
    } else {
      const newPost = { id: newId, fullname, priceSmall , priceBig , img };

      MenuData.menu.push(newPost);

      fs.writeFile(dbFilePath, JSON.stringify(MenuData, null, 2), (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }

        res.writeHead(201, { "Content-Type": "text/html" });
        res.end(
          "<script>alert('Data Added Successfully'); window.location.href = '/post';</script>"
        );
      });
    }
  });
};

const deleteAdmin = async (req, res) => {
  fs.readFile(dbFilePath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }

    let MenuData = JSON.parse(data);

    const { url } = req;
    const id = url.split("/")[2];

    MenuData.menu = MenuData.menu.filter((post) => post.id !== id);

    fs.writeFile(dbFilePath, JSON.stringify(MenuData, null, 2), (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<script>alert('Data Deleted Successfully'); window.location.href = '/post';</script>"
      );
    });
  });
};

const getEdit = async (req, res) => {
    const { url } = req;
    const id = url.split("/")[2];
  
    fs.readFile(dbFilePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
  
      let MenuData = JSON.parse(data);
      const menu = MenuData.menu.find(item => item.id === id);
  
      if (!menu) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(
          "<script>alert('Item not found'); window.location.href = '/admin';</script>"
        );
        return;
      }
  
      loadEjs("edit", req, res, { menu });
    });
  };


const editAdmin = async (req, res) => {

  const parsedBody = await parseRequestBody(req);
  const { fullname, priceSmall , priceBig , img } = parsedBody;

//   if (!id || fullname.length === 0 || desc.length === 0 || img.length === 0) {
//     res.writeHead(400, { "Content-Type": "text/html" });
//     res.end(
//       "<script>alert('Input must not be empty or invalid ID'); window.location.href = '/post';</script>"
//     );
//     return;
//   }

  fs.readFile(dbFilePath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }
    let MenuData = JSON.parse(data);

    const { url } = req;
    const id = url.split("/")[3];
    const itemIndex = MenuData.menu.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(
        "<script>alert('Item not found'); window.location.href = '/post';</script>"
      );
      return;
    }

    // Update the user details
    MenuData.menu[itemIndex].fullname = fullname;
    MenuData.menu[itemIndex].priceSmall = priceSmall;
    MenuData.menu[itemIndex].priceBig = priceBig;
    MenuData.menu[itemIndex].img = img;

    fs.writeFile(dbFilePath, JSON.stringify(MenuData, null, 2), (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<script>alert('Data Updated Successfully'); window.location.href = '/post';</script>"
      );
    });
  });
};

const dataToFront = (req,res) => {

  fs.readFile(dbFilePath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    } 
    let menuData = JSON.parse(data);
    
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(menuData.menu));

  })
 
}

module.exports = {
  getAdmin,
  getPost,
  postAdmin,
  deleteAdmin,
  editAdmin,
  getEdit,
  dataToFront
};
