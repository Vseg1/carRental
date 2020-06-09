class Car{    
    constructor(id, brand, category, model) {
        if(id)
            this.id = id;

        
        this.brand = brand;
        this.category = category;
        this.model = model;

        /*
        if(deadline)
            this.deadline = deadline;
        if(project)
            this.project = project;

        this.completed = completed || false;*/
    }
}

module.exports = Car;

