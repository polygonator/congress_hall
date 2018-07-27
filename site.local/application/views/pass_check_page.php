<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Подтверждение пароля</title>
	 <link rel="stylesheet" href="<?php echo site_url('Style.css') ?>" media="screen" type="text/css" />
	<link rel="icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
</head>

<body link="#eafffe" vlink="#eafffe" alink="#eafffe">
      
   <div class="formplace"> &nbsp;
    <form class="f4" action="<?php echo site_url('repass')?>" method="post">
    <h6>Подтверждение пароля</h6>
    <h2>При изменении почтового адреса или пароля, необходимо ввести старый пароль</h2>
    
    <input name="pass_ver" class="pass1" type="password" placeholder="Пароль" />
    <div class="error_form">&nbsp;</div>
    <input class="btn"  type="submit" value="Сохранить изменения" />
    <input type="hidden" name="email" value="<?php echo $email; ?>" />
    <input type="hidden" name="nickname" value="<?php echo $login; ?>" />
    <input type="hidden" name="name" value="<?php echo $username; ?>" />
    <input type="hidden" name="surname" value="<?php echo $surname; ?>" />
    <input type="hidden" name="adress" value="<?php echo $adress; ?>" />
    <input type="hidden" name="zip_code" value="<?php echo $zip_code; ?>" />
    <input type="hidden" name="pass1" value="<?php echo $password; ?>" />
    <input type="hidden" name="repeat1" value="<?php echo $repeat1; ?>" />
    <div class="error_form"><?php if ($error) { echo 'Введен неверный пароль!'; } ?> </div>
    
    <hr style="background-color : #bebebe;"/>
    <hr style="background-color : #FFF; "/>
    </form>
    </div>
    
</body>
</html>