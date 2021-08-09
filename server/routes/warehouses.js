const express = require("express");
const router = express.Router();
const warehouses = require("../data/warehouses.json");
const inventory = require("../data/inventories.json");
const fs = require("fs");
const { nanoid } = require('nanoid')

const warehouseData = () => {
  let warehousesInfo = [];

  warehouses.forEach(warehouse => {
    let warehouseData = {
      "id": warehouse.id,
      "name":warehouse.name,
      "address":warehouse.address,
      "city": warehouse.city,
      "country": warehouse.country,
      "contact.name":warehouse.contact.name,
      "contact.position":warehouse.contact.position,
      "contact.phone":warehouse.contact.phone,
      "contact.email":warehouse.contact.email,
    };
    warehousesInfo.push(warehouseData);
  })

  return warehousesInfo;
  }
  
// Helper function to find warehouse by ID
const getWarehouse = (id) => {
  const foundWarehouse = warehouses.find((warehouse) => {
    return id === warehouse.id;
  });
  return foundWarehouse;
};

// Helper function to write warehouse object to json
const addWarehouse = (list) => {
  return new Promise((res, rej) => {
    const stringData = JSON.stringify(list);
    fs.writeFile(__dirname + "/../data/warehouses.json", stringData, (err) => {
      if (err) {
        rej({ err, message: "could not add warehouse" });
      } else {  
        res("warehouse successfully added");
      }
    });
  });
};

// Get single warehouse by ID
router.get("/:id", (req, res) => {
  let { id } = req.params;
  const warehouseFound = getWarehouse(id);
  res.status(200).json(warehouseFound);
});

// Add a new warehouse
router.post('/add', (req, res ) => {
  const data = req.body;
  warehouses.push({
    id: nanoid(),
    name: data.name,
    address: data.address,
    city: data.city,
    country: data.country,
    contact: {
      name: data.contact.name,
      position: data.contact.position,
      phone: data.contact.phone,
      email: data.contact.email,
    }
  });

  addWarehouse(warehouses)
  .then(() => res.status(201).json(warehouses))
  .catch((err) => res.status(500).json(err))
})

// Modify an existing warehouse
router.put('/edit/:id', (req, res ) => {

  const data = req.body;
  const id = req.params.id

  let pathToWarehouseFile = "../server/data/warehouses.json"
  // Constructing a new warehouse object
  const editedWarehouse = {
    "id" : id,
    "name" : data.name,
    "address":data.address,
    "city" : data.city,
    "country": data.country,
    "contact": {
      "name": data.contact.name,
      "position": data.contact.position,
      "phone": data.contact.phone,
      "email": data.contact.email,
    }
  };


  const rawData = fs.readFileSync(pathToWarehouseFile, 'utf8', () => {})
  const warehouses = JSON.parse(rawData);
  //Find and update this warehouse in the array
  const updatedWarehouses = warehouses.map(wh => wh.id !== id ? wh : editedWarehouse);
  const stringifiedWarehouses = JSON.stringify(updatedWarehouses, null, 2);


  //Rewrite warehouse JSON file
  fs.writeFile(pathToWarehouseFile, stringifiedWarehouses, (err) => {
    res.json(editedWarehouse)
    if (err) {
      console.log("Got err: ", err);
      res.status(403).json("error, not found");
    }
  });
})

// Delete a single warehouse, and all the inventories in that warehouse
router.delete("/:id/warehouse", (req, res) => {
  // Removing from warehouse list
  let { id } = req.params;
  const warehouseFound = getWarehouse(id);
  selectedWarehouse = warehouses.indexOf(warehouseFound);
  warehouses.splice(selectedWarehouse, 1);
  res.json(warehouseData(warehouses));
  const newObject = JSON.stringify(warehouses, null, 2);
  fs.writeFileSync("../server/data/warehouses.json", newObject, (err) => {
    if (err) {
      res.status(403).json("error, not found");
    }
  })

  // Removing all inventories associated with that inventory
  const rawInv = inventory.filter((item) => item.warehouseID !== id);
   
  // JSON stringify these arrays back
  const newInv = JSON.stringify(rawInv, null, 2)

  // fs writefiles
  fs.writeFileSync("../server/data/inventories.json", newInv, (err) => {
    console.log("write success!")
    if (err) {
      res.status(403).json("error, not found");
    }
  });
})

// Get inventory for a given warehouse by warehouse ID
router.get("/:id/inventory", (req, res) => {
  let { id } = req.params;
  const warehouseFound = getWarehouse(id);
  const warehouseInventory = inventory.filter((item) => {
    return item.warehouseID === warehouseFound?.id;
  });
  res.status(200).json(warehouseInventory);
});

//edit warehouse based on the id that is being passed
router.get("/:id/edit", (req, res) => {
  let { id } = req.params;
  const warehouseFound = getWarehouse(id);
  res.status(200).json(warehouseFound);
});

// Get list of all warehouses
router.get('/', (req, res) => {
  res.status(200).json(warehouseData(warehouses))
});

module.exports = router;



