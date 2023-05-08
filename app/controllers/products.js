
const UUID = require('./utils');

//uuid to solve
class Product{
    constructor(title,description,imageUrl,unit,stock,pricePerUnit,category){
        this.uuid = null;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.unit = unit;
        this.stock = stock;
        this.pricePerUnit = pricePerUnit;
        this.category = category;
        console.log("Product created");
    } 
    
    set uuid(value){
        if(value === null)
        {
            console.log("UUID is null");
            this._uuid = UUID.generateUUID();
        }
        else{
            throw new ProductException("Product UUID are auto generated.") 
        } 
    }

    set stock(value){
        if(value < 0){
            throw new ProductException("Stock can't be negative");
        }
        else{
            console.log("Stock is set");
            this._stock = value;
        }
        
    }
    set pricePerUnit(value){
        if(value < 0){
            throw new ProductException("Price can't be negative");
        }
        else{
            console.log("Price is set");
            this._pricePerUnit = value;
        }
    }
     set title(value){
       if(typeof value !== 'string'){
           throw new ProductException("Title must be a string");
       }
       else{
            console.log("Title is set");
            this._title = value;
       }
       
    }
    set description(value){
        if(typeof value !== 'string'){
            throw new ProductException("Description must be a string");
        }
        else{
            console.log("Description is set");
            this._description = value;
        }
    }
    set imageUrl(value){
        if(typeof value !== 'string'){
            throw new ProductException("Image URL must be a string");
        }
        else{
            console.log("Image URL is set");
            this._imageUrl = value;
        }
    } 
    set unit(value){
        if(typeof value !== 'string'){
            console.log("Unit is not a string");
            throw new ProductException("Unit must be a string");
        }
        else{ 
            console.log("Unit is set");
            this._unit = value;
        }
    }
    set category(value){
        if(typeof value !== 'string'){
            throw new ProductException("Category must be a string");
        }
        else{
            console.log("Category is set");
            this._category = value;
        }
    }

    static createFromJson(jsonValue){
        let objectbyjson = JSON.parse(jsonValue);
        return new Product(objectbyjson.title,objectbyjson.description,objectbyjson.imageUrl,objectbyjson.unit,objectbyjson.stock,objectbyjson.pricePerUnit,objectbyjson.category);
    }
    static createFromObject(obj){
        return new Product(obj.title,obj.description,obj.imageUrl,obj.unit,obj.stock,obj.pricePerUnit,obj.category);
    }
    static cleanObject(obj){
        return {
            _uuid: generateUUID(),
            _title: obj.title,
            _description: obj.description,
            _imageUrl: obj.imageUrl,
            _unit: obj.unit,
            _stock: obj.stock,
            _pricePerUnit: obj.pricePerUnit,
            _category: obj.category,
        }
    }
    
    
}

class ProductException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    } 
} 

class TEST{
    constructor(prueba)
    {
        this.test = prueba;
    }
}


module.exports = {Product,ProductException,TEST};

