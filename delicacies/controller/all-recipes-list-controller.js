/**
 * @class AllRecipesListController
 *
 * This class controls the display of all recipes
 *
 * @param RecipesListModel
 * @param RecipesListView
 */
class AllRecipesListController {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.view.displayRecipes(this.model.recipes)
  }
}
