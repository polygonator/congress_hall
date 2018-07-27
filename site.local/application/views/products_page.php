<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Продукция</title>
	<link rel="stylesheet" href="<?php echo site_url('Style.css') ?>" media="screen" type="text/css" />
	<link rel="icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
</head>

<body link="#eafffe" vlink="#eafffe" alink="#eafffe">

    
   <div class="formplace"> &nbsp;
       <form action="<?php echo site_url('#')?>" method="post">
           
           <table style="margin-left: 103px;" cellspacing="0" cellpadding="0" border="0" align="left">
           <tr>
               <th valign="top"><input name="searcher" class="searchField" type="text" placeholder="поиск" value="<?php echo $input; ?>"></th>
               <th valign="top"><button  class="searchButton" name="search" class="btn"><img src="img/search_pic.png"></button></th>
           </tr>
           </table>
       </form>
       <p></p>
        <?php
            if ($total > 1)
            {
                echo '<div class="controls">';
                
                if(($p-2)>0)
                {
                    $ptwoleft = "<a href='products?p=".($p-2)."&filter=".$input."'>".($p-2)."</a>";
                }
                else
                {
                    $ptwoleft = null;
                }
                
                if(($p-1)>0)
                {
                    $poneleft = "<a href='products?p=".($p-1)."&filter=".$input."'>".($p-1)."</a>";
                    $ptemp = ($p-1);
                }
                else
                {
                    $poneleft = null;
                    $ptemp = null;
                }
                
                if(($p+2)<=$total)
                {
                    $ptworight = "<a href='products?p=".($p+2)."&filter=".$input."'>".($p+2)."</a>";
                }
                else
                {
                    $ptworight = null;
                }
                
                if(($p+1)<=$total)
                {
                    $poneright = "<a href='products?p=".($p+1)."&filter=".$input."'>".($p+1)."</a>";
                    $ptemp2 = ($p+1);
                }
                else
                {
                    $poneright = null;
                    $ptemp2 = null;
                }
                
                if($p > 1)
                {
                    $lcontroller = "<a href='products?p=".($p-1)."&filter=".$input."'><</a>";
                    
                }
                else
                {
                    $lcontroller = null;
                }
                
                if($p < $total)
                {
                    $rcontroller = "<a href='products?p=".($p+1)."&filter=".$input."'>></a>";
                    
                }
                else
                {
                    $rcontroller = null;
                }
                
                echo '<br>' . $lcontroller . $ptwoleft . $poneleft . '<span><b>' . $p . '</span>' . $poneright . $ptworight . $rcontroller;
                echo '</div><br>';
            }
       ?>
       
    <table cellspacing="0" cellspadding="0" border="0" align="center">   
       
        <?php
                
            for ($i = 0; $i < $que->num_rows; $i+=2)
            {
                    echo '<tr>
                             <th>
                                <form class="picture_form " action="'.site_url('product_demo"'). 'method="get">
                                    <h2>'.$que->row($i)->name.'. '.$que->row($i)->price.' рублей</h2>
                                    <img src="'.$que->row($i)->image.'">
                                    <p><button name="ident" value="'.$que->row($i)->id.'" class="buttStyle1" type="submit">Подробнее</button></p>
                                    <p></p>
                                </form>
                            </th>
                        <th width="20">&nbsp;</th>';
                if (($i + 1) < $que->num_rows)
                {
                    echo    '<th>
                                <form class="picture_form " action="'.site_url('product_demo"'). 'method="get">
                                    <h2>'.$que->row($i + 1)->name.'. '.$que->row($i + 1)->price.' рублей</h2>
                                    <img src="'.$que->row($i + 1)->image.'">
                                    <p><button name="ident" value="'.$que->row($i + 1)->id.'" class="buttStyle1" type="submit">Подробнее</button></p>
                                    <p></p>
                                </form>
                            </th>
                        
                        </tr>
                        <tr height="20">&nbsp;</tr>';
                }
            }
        ?>
        
          
    </table>
       
       <form class="search" action="<?php echo site_url('products')?>" method="post">
           <p><input name="searcher" class="pass1" type="text" placeholder="Поиск по названию" value="<?php echo $input; ?>"> </p>
           <input name="search" class="btn" type="submit" value="Поиск">
  
       </form>

       
    <?php
            if ($total > 1)
            {
                echo '<div class="controls">';
                
                if(($p-2)>0)
                {
                    $ptwoleft = "<a href='products?p=".($p-2)."&filter=".$input."'>".($p-2)."</a>";
                }
                else
                {
                    $ptwoleft = null;
                }
                
                if(($p-1)>0)
                {
                    $poneleft = "<a href='products?p=".($p-1)."&filter=".$input."'>".($p-1)."</a>";
                    $ptemp = ($p-1);
                }
                else
                {
                    $poneleft = null;
                    $ptemp = null;
                }
                
                if(($p+2)<=$total)
                {
                    $ptworight = "<a href='products?p=".($p+2)."&filter=".$input."'>".($p+2)."</a>";
                }
                else
                {
                    $ptworight = null;
                }
                
                if(($p+1)<=$total)
                {
                    $poneright = "<a href='products?p=".($p+1)."&filter=".$input."'>".($p+1)."</a>";
                    $ptemp2 = ($p+1);
                }
                else
                {
                    $poneright = null;
                    $ptemp2 = null;
                }
                
                if($p > 1)
                {
                    $lcontroller = "<a href='products?p=".($p-1)."&filter=".$input."'><</a>";
                    
                }
                else
                {
                    $lcontroller = null;
                }
                
                if($p < $total)
                {
                    $rcontroller = "<a href='products?p=".($p+1)."&filter=".$input."'>></a>";
                    
                }
                else
                {
                    $rcontroller = null;
                }
                
                echo '<br>' . $lcontroller . $ptwoleft . $poneleft . '<span><b>' . $p . '</span>' . $poneright . $ptworight . $rcontroller;
                echo '</div><br>';
            }
       ?>
    </div>
    
</body>
</html>