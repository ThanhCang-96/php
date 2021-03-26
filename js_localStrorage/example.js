$(document).ready(function(){
  var obj = new Object()
  var click = 1
  var user = $("label.username").text()
  var email = $("label.email").text()
  $("form").submit(function(){
    var getUser = $("input.username").val()
    var getEmail = $("input.email").val()
    // var nameObj = "baovic" + click
    obj["baovic"+ click++] = {
      "username":getUser,
      "email":getEmail
    }
    // localStorage.setItem("")

    // test ket qua
    // Object.keys(obj).map(function(keys,index){
    //   console.log(obj[keys])
    // })
  })
})