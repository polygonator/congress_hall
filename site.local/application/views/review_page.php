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
        <?php
            if ($total > 1)
            {
                echo '<div class="controls">';
                
                if(($p-2)>0)
                {
                    $ptwoleft = "<a href='review?p=".($p-2)."'>".($p-2)."</a>";
                }
                else
                {
                    $ptwoleft = null;
                }
                
                if(($p-1)>0)
                {
                    $poneleft = "<a href='review?p=".($p-1)."'>".($p-1)."</a>";
                    $ptemp = ($p-1);
                }
                else
                {
                    $poneleft = null;
                    $ptemp = null;
                }
                
                if(($p+2)<=$total)
                {
                    $ptworight = "<a href='review?p=".($p+2)."'>".($p+2)."</a>";
                }
                else
                {
                    $ptworight = null;
                }
                
                if(($p+1)<=$total)
                {
                    $poneright = "<a href='review?p=".($p+1)."'>".($p+1)."</a>";
                    $ptemp2 = ($p+1);
                }
                else
                {
                    $poneright = null;
                    $ptemp2 = null;
                }
                
                if($p > 1)
                {
                    $lcontroller = "<a href='review?p=".($p-1)."'><</a>";
                    
                }
                else
                {
                    $lcontroller = null;
                }
                
                if($p < $total)
                {
                    $rcontroller = "<a href='review?p=".($p+1)."'>></a>";
                    
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
                
            for ($i = 0; $i < $que->num_rows; $i++)
            {
                    echo '<tr>
                             <th width="360">
                                <form class="picture_form " action="'.site_url('review"'). 'method="get">
                                    <h2 align="left">Автор: '.$que->row($i)->author.'</h2>';
                                   if ($que->row($i)->product_name != NULL) echo '<img src="uploaded/'.$que->row($i)->product_name.'">';
                       echo            '<p align="left" class="textStyle1">'.$que->row($i)->text.'</p>
                                </form>
                            </th>
                            </tr>
                            <tr height="20"></tr>';

            }
        ?>
    </table>
       <br>
       
    <?php 
    if ($this->session->userdata('is_logged_in'))
    {   
        echo '<form class="search" action="'.site_url('leave_review').'" method="post">
           <input name="leave_rev" class="btn2" type="submit" value="Оставить отзыв">
       </form>';
    }
        else
        {
            echo '<h2 align="center">Только зарегистрированные пользователи могут оставлять отзыв!</h2>';
        }
    ?>
       
   <?php
            if ($total > 1)
            {
                echo '<div class="controls">';
                
                if(($p-2)>0)
                {
                    $ptwoleft = "<a href='review?p=".($p-2)."'>".($p-2)."</a>";
                }
                else
                {
                    $ptwoleft = null;
                }
                
                if(($p-1)>0)
                {
                    $poneleft = "<a href='review?p=".($p-1)."'>".($p-1)."</a>";
                    $ptemp = ($p-1);
                }
                else
                {
                    $poneleft = null;
                    $ptemp = null;
                }
                
                if(($p+2)<=$total)
                {
                    $ptworight = "<a href='review?p=".($p+2)."'>".($p+2)."</a>";
                }
                else
                {
                    $ptworight = null;
                }
                
                if(($p+1)<=$total)
                {
                    $poneright = "<a href='review?p=".($p+1)."'>".($p+1)."</a>";
                    $ptemp2 = ($p+1);
                }
                else
                {
                    $poneright = null;
                    $ptemp2 = null;
                }
                
                if($p > 1)
                {
                    $lcontroller = "<a href='review?p=".($p-1)."'><</a>";
                    
                }
                else
                {
                    $lcontroller = null;
                }
                
                if($p < $total)
                {
                    $rcontroller = "<a href='review?p=".($p+1)."'>></a>";
                    
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