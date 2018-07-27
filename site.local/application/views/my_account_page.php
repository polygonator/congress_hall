<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Личный кабинет</title>
	 <link rel="stylesheet" href="<?php echo site_url('Style.css') ?>" media="screen" type="text/css" />
	<link rel="icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
</head>

<body link="#eafffe" vlink="#eafffe" alink="#eafffe">
      
   <div class="formplace"> &nbsp;
    <form class="f4" action="<?php echo site_url('pass_check') ?>" method="post">
    <h6>Личный кабинет</h6>
    <h2>Здесь вы можете просмотреть и изменить свои личные данные</h2>
       
    <input name="nickname" class="nickname" type="text" value="<?php echo $login; ?>" placeholder="Логин" required/>
    <div class="error_form"> <?php echo form_error('nickname'); ?> </div>
      
    <input name="name" class="name" type="text" value="<?php echo $username; ?>" placeholder="Имя"/>
            <div class="error_form">&nbsp;</div>
    <input name="surname" class="pass1" type="text" value="<?php echo $surname; ?>" placeholder="Фамилия"/>
        <div class="error_form">&nbsp;</div>
    
    <input name="email" class="pass1" type="text" value="<?php echo $email; ?>" placeholder="E-mail" required/>
    <div class="error_form"><?php echo form_error('email'); ?> </div>
    
    <input name="adress" class="pass1" type="text" value="<?php echo $adress; ?>" placeholder="Адрес"/>
        <div class="error_form">&nbsp;</div>
    <input name="zip_code" class="pass1" type="text" value="<?php echo $zip_code; ?>" placeholder="Почтовый индекс"/>
        <div class="error_form">&nbsp;</div>
    
    <input name="pass1" class="pass1" type="password" placeholder="Пароль" />
        <div class="error_form"><?php echo form_error('pass1'); ?> </div>
    
    <input name="repeat1" class="repeat1" type="password" placeholder="Повторите пароль" />
        <div class="error_form"><?php echo form_error('repeat1'); ?> </div>
    <input class="btn"  type="submit" value="Сохранить изменения" />
    <hr style="background-color : #bebebe;"/>
    <hr style="background-color : #FFF; "/>
     </form>
    </div>
    
</body>
</html>