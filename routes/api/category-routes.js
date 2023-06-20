const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// This route should find all categories & include its associate Products 
router.get('/', (req, res) => {

  Category.findAll()
  .then((category_data) => {
    res.json(category_data)
  }) 
  
});

// Goal:  Find one category by its id value & include associated Products
router.get('/:id', async (req, res) => {
  
  try {
    const category_data = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if (category_data === false) {
      res.status(404).json({message: 'NADA found with that ID!'});
      return;
    }  {
    res.status(200).json(category_data);  } } 
    
    catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ____________________________________________________________________

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
