<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Товар: "<?php echo $name; ?>"</title>
	<link rel="stylesheet" href="<?php echo site_url('Style.css') ?>" media="screen" type="text/css" />
</head>

<body link="#eafffe" vlink="#eafffe" alink="#eafffe">
    
   <div class="formplace"> &nbsp;
       <form class="">
       <table cellspacing="0" cellspadding="0" border="1" align="center">
            <tr>
                <th rowspan="7"> <img src="<?php echo $image; ?>"></th>
                <th align="left"><?php echo 'Наименование: '. $name; ?></th>     
           </tr>
            <tr>
                <th align="left"><?php echo 'Материал: '. $material; ?></th>
           </tr>
            <tr>
                <th align="left"><?php echo 'Пропорции: '. $proportions; ?></th>
           </tr>
            <tr>
                <th align="left"><?php echo 'Толщина граней: '. $face_thickness . ' мм'; ?></th>
           </tr>
            <tr>
                <th align="left"><?php echo 'Цена: '. $price . ' рублей';  ?></th>
           </tr>
            <tr>
                <th align="left"><?php echo 'Количество: '. $quantity; ?></th>
           </tr>
            <tr>
                <th align="left"><?php echo 'Описание: '. $description; ?></th>
           </tr>
       </table>
        </form>
       
        <form action="<?php echo site_url('product_demo/order_create/'.$product_id.'')?>" class="search" method="post">
            <table cellspacing="0" cellspadding="0" border="1" align="center">
           <p><input class="btn" type="submit" value="Добавить в корзину"></p> 
                
            <select required name="quantity">
                <option disabled>Количество товара</option>
                <option selected value="1">1</option>
                <?php 
                    for($i = 2; $i <= $list_size; $i++) 
                    {
                        echo '<option value="'.$i.'">'.$i.'</option>';
                    }
                ?>
            </select> 
            </table>
       </form>
    </div>
    
</body>
</html>