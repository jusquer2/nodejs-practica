const faker = require('faker');
const boom = require('@hapi/boom');


class ProductService{

  constructor(){
    this.products = [];
    this.generate();
  }

  generate (){
    const limit = 100
    for (let index = 0; index < limit; index++) {

      this.products.push({
        id:faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        isBlock:faker.datatype.boolean()
      })
    }
  }

  async create(product){
    this.products.push({id:this.products.length,...product});
  }
  async find(){
    return new Promise((resolve,reject)=>{
      resolve(this.products);
      /* setTimeout(() => {
        resolve(this.products);
      }, 5000); */
    })

  }
  async findOne(id){
    const product = this.products.find(item=> item.id==id);
    if(!product){
      throw boom.notFound("Product not found");
    }
    if(product.isBlock){
      throw boom.conflict("Product is block");
    }
    return product;
  }
  async delete(id){
    const index = this.products.findIndex(item=> item.id==id);
    if(index===-1){
      throw boom.notFound("Product not found");
    }
    this.products.splice(index,1);
  }
  async update(id,change){
    const index = this.products.findIndex(item=> item.id==id);
    if(index===-1){
      throw boom.notFound("Product not found");
    }
    const product = this.products[index]
    this.products[index] = {...product,...change};
    return this.products[index];
  }
}

module.exports = ProductService;
