
    <body>
     <SCRIPT type="text/javascript">
           
            document.getElementById('back').style.visibility = 'visible';
            $(document).ready(function(){
                $('#back').click(function(){
                    $('#contenido').load("dashboard.php");
                });
            });
            </SCRIPT>
       category 1
       <?php
       if(isset($_GET['title'])){ $user = $_GET['title']; echo $user; } 
       ?>
    </body>

