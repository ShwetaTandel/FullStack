/**
 * @class SingleRecipeController
 *
 * Controller for recipe view page
 *
 * @param model
 * @param view
 */
class SingleRecipeController {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.displaySingleRecipe(this.model.recipe)
    // Explicit binding of the model and view in case of events
    // This is when recipe changes
    this.model.bindRecipeChanged(this.onRecipeChanged)
    // this is when the serving is changed
    this.view.bindAdjustServing(this.handleAdjustServing)
  }

  //Handle change in recipe data -
  onRecipeChanged = recipe => {
    //This method can be used to handle different type of inputs from the user, based on conditional checks
    this.view.displayChangedIngredients(recipe)
  }

  handleAdjustServing = serving => {
    this.model.adjustServing(serving)
  }
}
