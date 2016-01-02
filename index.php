<!DOCTYPE html>
<html lang="en">
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Admin panel">
    <meta name="author" content="ulight Vlad">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link href="css/reset.css" rel="stylesheet" type="text/css"/>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <script src="js/libs/jquery-2.1.0.min.js"> </script>
    <script src="js/libs/require.js"> </script>
    <script>
        requirejs.config({
            baseUrl: 'js',
            paths:{
                'easel' :'libs/tweenjs-0.6.1.min',
                'tween':'libs/easeljs-0.8.1.min'
            }
        });



        $(document).ready(function(){

           function onHashChanged(){
               var hash = window.location.hash.split('-');
               switch(hash[0]){
                   case '#Puzzle':
                       $('#Content').load('js/videopuzzle/videopuzzle.php');
                       break
               }
           }

            window.onhashchange =onHashChanged;

        });
    </script>
</head>
<body>
<nav>
    <a class="btn" href="#">Home</a>
    <a class="btn" href="#Puzzle">Puzzle</a>

</nav>
<section id="Content">


</section>

</body>

</html>