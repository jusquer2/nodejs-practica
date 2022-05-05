const express = require('express');
const ProductService = require('../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (request,response)=>{
  try {
    const products = await service.find();
    response.json(products);
  } catch (error) {
    response.status(500).send(error)
  }

});
router.get('/:id', validatorHandler(getProductSchema,'params'), async (req,res, next)=>{
  try {
    const { id }  = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error)
  }


})

router.post('/', validatorHandler(createProductSchema,'body'),async (req,res)=>{
  const body = req.body;
  await service.create(body);
  res.status(201).json({
    message:"created",
    data:body
  })
});
router.patch('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
async (req,res)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    await service.update(id,body);
    res.sendStatus(204)
  } catch (error) {
    res.status(404).json({message:error.message});
  }

});
router.put('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'), async (req,res)=>{
  const { id } = req.params;
  const body = req.body;
  await service.update(id,body);
  res.sendStatus(204);
});
router.delete('/:id',
validatorHandler(getProductSchema,'params'),
async (req,res)=>{
  const { id } = req.params;
  await service.delete(id);
  res.sendStatus(202);
});

module.exports = router;
/**
 * Aqui estamos separando la responsabilidad
 *
 *
 */
