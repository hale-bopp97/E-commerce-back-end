const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagInfo = await Tag.findAll({
    include: [{
      model: Product,
      as: 'products'
    }]
  });

  res.status(200).json(tagInfo);

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagInfo = await Tag.findByPk(req.params.id, {
    include: [{
      model: Product,
      as: 'products'
    }]
  });
  
  if(!tagInfo) {

    res.status(404).json({message: 'no tag found'});
    return;

  }

  res.status(200).json(tagInfo);

});

router.post('/', async (req, res) => {
  // create a new tag
  const tagInfo = await Tag.create(req.body);
  res.status(200).json(tagInfo);

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagInfo = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  });

  if(!tagInfo) {

    res.status(404).json({message: 'no tag found'});
    return;

  }

  res.status(200).json(tagInfo);

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagInfo = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });

  if(!tagInfo) {

    res.status(404).json({message: 'no tag found'});
    return;

  }

  res.status(200).json(tagInfo);
  
});

module.exports = router;
