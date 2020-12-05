class Food{
    constructor() {
        this.FoodStock = 0
        this.lastFed
        this.image = loadImage("Milk.png")
    }
    display() {
        
    }
    getFoodStock() {
        return this.FoodStock
    }
    updateFoodStock(food) {
        this.FoodStock = food
    }
    deductFood() {
        if (this.FoodStock > 0) {
            this.FoodStock = this.FoodStock - 1
        }
    }
    getFedTime(lastFed) {
        this.lastFed = lastFed
    } 
}