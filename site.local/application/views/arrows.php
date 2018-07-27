<?php
       
      if ($total > 1)
            {
                echo '<div class="controls">';
                
                if(($p-2)>0)
                {
                    $ptwoleft = "<a href='products?p=".($p-2)."'>".($p-2)."</a>";
                }
                else
                {
                    $ptwoleft = null;
                }
                
                if(($p-1)>0)
                {
                    $poneleft = "<a href='products?p=".($p-1)."'>".($p-1)."</a>";
                    $ptemp = ($p-1);
                }
                else
                {
                    $poneleft = null;
                    $ptemp = null;
                }
                
                if(($p+2)<=$total)
                {
                    $ptworight = "<a href='products?p=".($p+2)."'>".($p+2)."</a>";
                }
                else
                {
                    $ptworight = null;
                }
                
                if(($p+1)<=$total)
                {
                    $poneright = "<a href='products?p=".($p+1)."'>".($p+1)."</a>";
                    $ptemp2 = ($p+1);
                }
                else
                {
                    $poneright = null;
                    $ptemp2 = null;
                }
                
                if($p > 1)
                {
                    $lcontroller = "<a href='products?p=".($p-1)."'><</a>";
                    
                }
                else
                {
                    $lcontroller = null;
                }
                
                if($p < $total)
                {
                    $rcontroller = "<a href='products?p=".($p+1)."'>></a>";
                    
                }
                else
                {
                    $rcontroller = null;
                }
                
                echo '<br>' . $lcontroller . $ptwoleft . $poneleft . '<span><b>' . $p . '</span>' . $poneright . $ptworight . $rcontroller;
                echo '</div><br>';
            }
    ?>