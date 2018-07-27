<html> 
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="<?php echo site_url('Style.css') ?>"/>
</head>
<body link="#eafffe" vlink="#eafffe" alink="#eafffe">
    <table border="0" cellpadding="0" cellspacing="0" width="960" align="center" class="style1">
        <tr>
            <th width="255" height="95"><h1><a href="main">3Ds Print</a></h1></th>
            <th width="80"><h2><a href="about_us" class="buttStyle2">О нас</a></h2></th>
            <th width="150"><h2><a href="main" class="buttStyle2">Наши работы</a></h2></th>
            <th width="100"><h2><a href="review" class="buttStyle2">Отзывы</a></h2></th>
            <th width="110"><h2><a href="main" class="buttStyle2">Контакты</a></h2></th>
            <th width="200">
                <?php 
                    if ($this->session->userdata('is_logged_in'))
                    {
                      echo '<h2><a href="my_account" class="buttStyle2">'.$this->session->userdata('nickname').'</a>/<a class="buttStyle2" href="authorization/logout">Выход</a></h2>';
                    }
                    else
                    {
                        echo '<h2><a href="registration" class="buttStyle2">Регистрация</a>/<a href="authorization" class="buttStyle2">Вход</a> </h2>';
                    }
                ?>
             </th>  
        </tr>
    </table>
    
    <table border="0" cellpadding="0" cellspacing="0" align="center" class="style2">
        <tr>
            <th width="261" height="80"></th>
            <th width="160"><h2><a href="products" class="buttStyle2">Продукция</a></h2></th>
            <th width="90"><h2><a href="main" class="buttStyle2">Заказ</a></h2></th>
            <th width="110"><h2><a href="main" class="buttStyle2">Статьи</a></h2></th>
            <th width="125"><h2><a href="cart" class="buttStyle2">Корзина</a></h2></th>
            <th width="214"></th>
        </tr>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" width="960" align="center">
        <tr>
            <th height="1" bgcolor="#d5d5d5"></th>
        </tr>
    </table>
</body>
</html>
