/**
 * @class SingleRecipeView
 *
 * Display the details of the Single recipe selected by the user
 */
class SingleRecipeView {
    constructor() {
        this.recipeDiv = this.getElement('#recipeDiv')
    }

    //Creates a new element in DOM
    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)
        return element
    }

    //Gets the element specified by selector
    getElement(selector) {
        const element = document.querySelector(selector)
        return element
    }

    //Display the new Ingredients for adjusted servings
    displayChangedIngredients(recipe) {
        const servingsVal = this.getElement('#servingsVal');
        servingsVal.innerHTML = recipe.servings
        const col = this.getElement('#ingredientCol')
        col.innerHTML = '';
        const ingLbl = this.createElement('h4')
        ingLbl.innerHTML = 'Ingredients'
        const ingLst = this.createElement('ul')
        ingLst.id = "ingredientList";
        recipe.ingredients.forEach(ingredient => {
            const item = this.createElement('li')
            item.innerHTML = ingredient.qty + ' ' + ingredient.unit + ' ' + ingredient.item
            ingLst.append(item)
        })
        col.append(ingLbl, ingLst)
    }

    //Paint the header of the recipe
    addHeaderSection(recipe){
      const seperator = this.createElement('br')
      const title = this.createElement('h3')
      title.innerHTML = recipe.title
      const author = this.createElement('p')
      author.innerHTML = 'by ' + recipe.author.name
      const desc = this.createElement('h5')
      desc.innerHTML = recipe.description
      this.recipeDiv.append(seperator, title, author, desc);
      recipe.tags.forEach(tag => {
          const tagSpan = this.createElement('span', 'lead')
          const span = this.createElement('span', 'badge')
          span.classList.add('badge-warning');
          span.innerHTML = tag
          tagSpan.append(span);
          this.recipeDiv.append(tagSpan)
      })

    }

    //Paint the image column
    addImageColumn(recipe){
      const seperator1 = this.createElement('br')
      const seperator2 = this.createElement('br')
      this.recipeDiv.append(seperator1, seperator2)

      const col1 = this.createElement('div', 'col-lg-4')
      const img = this.createElement('img')
      img.src = recipe.image_url
      img.width = "300";
      img.height = "300"
      col1.append(img)
      return col1
    }

    //Add recipe details
    addDetailColum(recipe){
      const col2 = this.createElement('div', 'col-lg-4')
      if (recipe.cook_time_min != undefined) {
          const cookTimeLbl = this.createElement('h4')
          cookTimeLbl.innerHTML = "Cooking time"
          const cookTimeVal = this.createElement('p', 'font-italic')
          cookTimeVal.innerHTML = recipe.cook_time_min + ' minutes'
          cookTimeLbl.append(cookTimeVal)
          col2.append(cookTimeLbl)
      }
      if (recipe.prep_time_min != undefined) {
          const prepTimeLbl = this.createElement('h4')
          prepTimeLbl.innerHTML = "Preparation time"
          const prepTimeVal = this.createElement('p', 'font-italic')
          prepTimeVal.innerHTML = recipe.prep_time_min + ' minutes'
          prepTimeLbl.append(prepTimeVal)
          col2.append(prepTimeLbl)
      }
      if (recipe.servings != undefined) {
          const servingsLbl = this.createElement('h4')
          servingsLbl.id = 'servingsLabel';
          servingsLbl.innerHTML = "Servings"
          const servingsVal = this.createElement('p', 'font-italic')
          servingsVal.innerHTML = recipe.servings
          servingsVal.id = 'servingsVal';
          servingsLbl.append(servingsVal)
          col2.append(servingsLbl)
          const adjInput = this.createElement('input')
          adjInput.type = 'number'
          adjInput.min = 1;
          adjInput.max = 100;
          adjInput.id = "inpServings";
          const adjButton = this.createElement('button','btn-info')
          adjButton.id = 'buttonServings'
          adjButton.innerHTML = 'Adjust Servings'
          const origButton = this.createElement('button','btn-dark')
          origButton.innerHTML = 'See Original Servings'
          origButton.addEventListener('click', event => {
            window.location.reload();

          })
          col2.append(adjInput,adjButton)
          col2.append(this.createElement('br'),this.createElement('br'),origButton)

      }
      return col2
    }

    //add ingredient addHeaderSection
    addIngredientSection(recipe){
      const col3 = this.createElement('div', 'col-lg-4')
      col3.id = 'ingredientCol';
      const ingLbl = this.createElement('h4')
      ingLbl.innerHTML = 'Ingredients'
      const ingLst = this.createElement('ul')
      ingLst.id = "ingredientList";
      recipe.ingredients.forEach(ingredient => {
          const item = this.createElement('li')
          item.innerHTML = ingredient.qty + ' ' + ingredient.unit + ' ' + ingredient.item
          ingLst.append(item)
      })
      col3.append(ingLbl, ingLst)
      return col3

    }
    //add Directiosnsection
    addDirectionsSection(recipe){
      const rowDtl = this.createElement('div', 'row')
      const colDtl = this.createElement('div', 'col-lg-12')
      const colLbl = this.createElement('h4')
      colLbl.innerHTML = "Directions"
      const colDirTxt = this.createElement('p')
      recipe.directions.forEach(direction => {
          colDirTxt.innerHTML += direction
          colDirTxt.innerHTML += '<br />'
      })
      colDtl.append(colLbl, colDirTxt);
      rowDtl.append(colDtl)
      return rowDtl;
    }

    //Display the recipe details
    displaySingleRecipe(recipe) {
        this.addHeaderSection(recipe)
        const row = this.createElement('div', 'row')
        row.append( this.addImageColumn(recipe), this.addDetailColum(recipe),  this.addIngredientSection(recipe))

        const rowDtl = this.addDirectionsSection(recipe)

        const backButton = this.createElement('button','btn-warning')
        backButton.innerHTML = "Go Back"
        backButton.addEventListener('click', event => {
          window.location.href ='./all-recipes.html';
        })

        this.recipeDiv.append(row, this.createElement('br'), rowDtl)
        this.recipeDiv.append(backButton)
    }

    //Add the event handler for the click of buton
    bindAdjustServing(handler) {
        let button = document.getElementById("buttonServings")
        button.addEventListener('click', event => {
            const newServing = this.getElement("#inpServings").value
            //Since the quantities involve lots of fractions I have added few basic validations as an indicator.
            //Generally I prefer handling user inputs smartly in the code, instead of showing the user too many errors.
            if(parseInt(newServing) <= 0 || parseInt(newServing) > 100 || !Number.isInteger(eval(newServing)) ){
              alert('Please add valid number between 1 to 100');
              this.getElement("#inpServings").value=''
              return;
            }
            handler(parseInt(newServing))

        })
    }

    /*General Comments : About the things I would have done differently in case of real life scenarios
    1. Get all constant names for buttons / labels  etc from localized JS file
    2. Handle validations in a validator framework
    3. Use of seperate CSS files, instead of inline css
    */

}
