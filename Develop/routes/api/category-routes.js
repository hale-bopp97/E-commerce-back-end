const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryInfo = await Category.findAll({
    include: [{
      model: Product, 
      as: 'products'}]
  });

  res.status(200).json(categoryInfo);

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryInfo = await Category.findByPk(req.params.id, {
    include: [{
      model: Product, 
      as: 'products'}]
  });

  if (!categoryInfo) {
    res.status(404).json({message: 'category not found'});
    return;
  }

  res.status(200).json(categoryInfo);

});

router.post('/', async (req, res) => {
  // create a new category
  const categoryInfo = await Category.create(req.body);
  res.status(200).json(categoryInfo);

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryInfo = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  });

  if (!categoryInfo) {
    res.status(404).json({message: 'category not found'});
    return;
  }

  res.status(200).json(categoryInfo);

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryInfo = await Category.destroy({
    where: {
      id: req.params.id
    }
  });

  if (!categoryInfo) {
    res.status(404).json({message: 'category not found'});
    return;
  }

  res.status(200).json(categoryInfo);
  
});

module.exports = router;
