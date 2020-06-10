class Car{    
    constructor(id, brand, category, model) {
        if(id)
            this.id = id;

        
        this.brand = brand;
        this.category = category;
        this.model = model;

    }
}

module.exports = Car;