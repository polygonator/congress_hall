<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Корзина</title>
	<link rel="stylesheet" href="<?php echo site_url('Style.css') ?>" media="screen" type="text/css" />
	<link rel="icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
</head>

<body link="#eafffe" vlink="#eafffe" alink="#eafffe">
    


   <div class="formplace"> &nbsp;
        <?php
            if ($total > 1)
            {
                echo '<div class="controls">';
                
                if(($p-2)>0)
                {
                    $ptwoleft = "<a href='cart?p=".($p-2)."&filter=".$input."'>".($p-2)."</a>";
                }
                else
                {
                    $ptwoleft = null;
                }
                
                if(($p-1)>0)
                {
                    $poneleft = "<a href='cart?p=".($p-1)."&filter=".$input."'>".($p-1)."</a>";
                    $ptemp = ($p-1);
                }
                else
                {
                    $poneleft = null;
                    $ptemp = null;
                }
                
                if(($p+2)<=$total)
                {
                    $ptworight = "<a href='cart?p=".($p+2)."&filter=".$input."'>".($p+2)."</a>";
                }
                else
                {
                    $ptworight = null;
                }
                
                if(($p+1)<=$total)
                {
                    $poneright = "<a href='cart?p=".($p+1)."&filter=".$input."'>".($p+1)."</a>";
                    $ptemp2 = ($p+1);
                }
                else
                {
                    $poneright = null;
                    $ptemp2 = null;
                }
                
                if($p > 1)
                {
                    $lcontroller = "<a href='cart?p=".($p-1)."&filter=".$input."'><</a>";
                    
                }
                else
                {
                    $lcontroller = null;
                }
                
                if($p < $total)
                {
                    $rcontroller = "<a href='cart?p=".($p+1)."&filter=".$input."'>></a>";
                    
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
              
            for ($i = 0; $i < $num_rows; $i+=2)
            {        
                if ($query != NULL)
                {
                    echo '<tr>
                             <th>
                                <form class="picture_form">
                                    <h2>'.$que1->row($i)->name.'. '.$que1->row($i)->price.' рублей. '.$que1->row($i)->quantity_cart.' шт.</h2>
                                    <img src="'.$que1->row($i)->image.'">
                                    <form class="picture_form " action="'.site_url('cart"'). 'method="get">
                                        <p><button name="ident" value="'.$que1->row($i)->product_id.'" class="buttStyle1" type="submit">Подробнее</button></p>
                                    </form>
                                    <form class="picture_form " action="'.site_url('cart/drop_item"'). 'method="get">
                                        <p><button name="p_id" value="'.$que1->row($i)->product_id.'" class="buttStyle1" type="submit">Удалить</button></p>
                                    </form>
                                    <p></p>
                                </form>
                            </th>
                        <th width="20">&nbsp;</th>';
                }
                if ((($i + 1) < $num_rows) && $query != NULL)
                {    
                    echo    '<th>
                                <form class="picture_form">
                                    <h2>'.$que1->row($i + 1)->name.'. '.$que1->row($i + 1)->price.' рублей. '.$que1->row($i + 1)->quantity_cart.' шт.</h2>
                                    <img src="'.$que1->row($i + 1)->image.'">
                                    <form class="picture_form " action="'.site_url('cart"'). 'method="get">
                                        <p><button name="ident" value="'.$que1->row($i + 1)->product_id.'" class="buttStyle1" type="submit">Подробнее</button></p>
                                    </form>
                                     <form class="picture_form " action="'.site_url('cart/drop_item"'). 'method="get">
                                        <p><button name="p_id" value="'.$que1->row($i + 1)->product_id.'" class="buttStyle1" type="submit">Удалить</button></p>
                                    </form>
                                    <p></p>
                                </form>
                            </th>
                        
                        </tr>
                        <tr height="20">&nbsp;</tr>';
                }
            }
        ?>
        
          
    </table>
       
       <form class="search" action="<?php echo site_url('cart')?>" method="post">
           <p><input name="searcher" class="pass1" type="text" placeholder="Поиск по названию" value="<?php echo $input; ?>"> </p>
           <input name="search" class="btn" type="submit" value="Поиск">
  
       </form>

       
    <?php
            if ($total > 1)
            {
                echo '<div class="controls">';
                
                if(($p-2)>0)
                {
                    $ptwoleft = "<a href='cart?p=".($p-2)."&filter=".$input."'>".($p-2)."</a>";
                }
                else
                {
                    $ptwoleft = null;
                }
                
                if(($p-1)>0)
                {
                    $poneleft = "<a href='cart?p=".($p-1)."&filter=".$input."'>".($p-1)."</a>";
                    $ptemp = ($p-1);
                }
                else
                {
                    $poneleft = null;
                    $ptemp = null;
                }
                
                if(($p+2)<=$total)
                {
                    $ptworight = "<a href='cart?p=".($p+2)."&filter=".$input."'>".($p+2)."</a>";
                }
                else
                {
                    $ptworight = null;
                }
                
                if(($p+1)<=$total)
                {
                    $poneright = "<a href='cart?p=".($p+1)."&filter=".$input."'>".($p+1)."</a>";
                    $ptemp2 = ($p+1);
                }
                else
                {
                    $poneright = null;
                    $ptemp2 = null;
                }
                
                if($p > 1)
                {
                    $lcontroller = "<a href='cart?p=".($p-1)."&filter=".$input."'><</a>";
                    
                }
                else
                {
                    $lcontroller = null;
                }
                
                if($p < $total)
                {
                    $rcontroller = "<a href='cart?p=".($p+1)."&filter=".$input."'>></a>";
                    
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