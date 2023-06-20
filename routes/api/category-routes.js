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

router.post('/', async (req, res) => {
  // creates a new category

  try {
    const category_data = await Category.create(req.body);
    res.status(200).json(category_data);
  } catch (err) {
    
    res.status(400).send(err);
  }

});



// This will update a category by its "id" value

router.put('/:id', async (req, res) => {
  try {
    const category_data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }});

      // if false
    if (!category_data[0]) {
      res.status(400).json({message: 'Category undefined / not found with that id.'});
      return;
    }

    res.json(category_data);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Deleting a category by its `id` value

router.delete('/:id', async (req, res) => {
  try {
    const category_data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // if (!category_data) {
    //   res.status(404).json({message: 'Sorry, no category found!'});
    //   return;
    // }

    res.status(200).json(category_data);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Exporting 
module.exports = router;
