
class RecipesListModel {
  constructor() {
    //Ideally this would be an ajax service call. Lets assume we get bback data from the service here.
    this.recipes= (function() {
        var result;
        $.ajax({
            type:'GET',
            url:'./data/recipes-list.json',
            dataType:'json',
            async:false,
            success:function(data){
                result = data.recipes;
            }
        });
        return result;
    })();
  console.log(Array.isArray( this.recipes));
  }
}
