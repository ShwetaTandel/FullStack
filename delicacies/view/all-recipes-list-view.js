/**
* @class RecipesListView
*
* This class builds the List of recipes page using the appr model.
*/
class RecipesListView {
  constructor() {
    this.list = this.getElement('#list')
    this.recipes = this.createElement('div','card-columns')
    this.list.append(this.recipes)
  }

  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)
    return element
  }
  getElement(selector) {
    const element = document.querySelector(selector)
    return element
  }
  //Display all the recipes
  displayRecipes(recipes) {
    recipes.forEach(recipe => {
      const a = this.createElement('a')
      //Uniquely identifies recipe
      a.href = "./recipe.html#"+recipe.id;
      const card = this.createElement('div', 'card')
      const img = this.createElement('img', 'card-img-top')
      //this has to be server address when goes live
      img.src = recipe.src
      const  cardBody= this.createElement('div', 'card-body')
      const title = this.createElement('h3', 'card-title')
      title.innerHTML  = recipe.title
      cardBody.append(title)
      card.append( img,cardBody)
      a.append(card)
      this.recipes.append(a)
    })
  }
}
