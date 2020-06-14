class SingleRecipeModel {

  constructor(id) {
    //Ideally this would be an ajax service call. Lets assume we get back data from the service here.
    this.recipe= (function() {
        const names = ['black-bean-and-rice-enchiladas.json', 'basil-and-pesto-hummus.json','banana-oatmeal-cookie.json','worlds-best-lasagna.json','vegetarian-korma.json','vegetable-fried-rice.json','marinated-grilled-shrimp.json','homemade-chicken-enchiladas.json','homemade-black-bean-veggie-burgers.json','four-cheese-margherita-pizza.json','divine-hard-boiled-eggs.json'];
        var result;
        $.ajax({
            type:'GET',
            url:'./data/'+names[id-1],
            dataType:'json',
            async:false,
            success:function(data){
                result = data;
            }
        });
        return result;
    })();
  //console.log(this.recipe);
  }

  //Notify when recipe data changes
  bindRecipeChanged(callback) {
    this.onRecipeChanged = callback
  }

  // Calculate the new ingredient Quantities. Example Ingredient object : {qty:1/2, unit: (16 ounce can), item: tomato puree}
  adjustServing(newServing){
    let oldServing = parseInt(this.recipe.servings);
    if(!isNaN(parseInt(newServing))){
      this.recipe.ingredients.forEach(ingredient => {

      let newQty = (eval(ingredient.qty.replace(' ','+')) * (newServing/oldServing).toFixed(2));
      ingredient.qty = "" +(isNaN(newQty) ? "" : (Number.isInteger(newQty) ? newQty : getFraction(newQty)));
    })
    this.recipe.servings = newServing;
    }//else no need to do anything
    this.onRecipeChanged(this.recipe)

  }
}
