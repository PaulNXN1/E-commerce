const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll()
  .then((tag_data) => {
    res.json(tag_data)
  }) 

});

// find a single tag by its `id`
// be sure to include its associated Product data

router.get('/:id', async(req, res) => {

  try {
    const tag_data = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if (!tag_data) {
      res.status(404).json({message: 'Oh no! No tag found :('});
      return;}

    res.status(200).json(tag_data);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
});

// Creates a new tag. 

router.post('/', async (req, res) => {
  

  try {
    const tag_data = await Tag.create(req.body);
    res.status(200).json(tag_data);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

});


//Updating a tag's name by its `id` value

router.put('/:id', async (req, res) => {

  try {
    const tag_data = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tag_data[0]) {
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }

    res.status(200).json(tag_data);
    

  } catch (err) {

    console.log(err);
    res.status(500).json(err);

  }
  
});

// Deleting a tag by its `id` value

router.delete('/:id', async (req, res) => {

  try {
    const tag_data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tag_data) {
      res.status(404).json({message: 'Darn!  No tag found!'});
      return;
    }
    res.status(200).json(tag_data);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
});

// Exporting router 
module.exports = router;
