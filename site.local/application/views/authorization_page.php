<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Вход</title>
	<link rel="stylesheet" href="<?php echo site_url('Style.css') ?>" media="screen" type="text/css" />
</head>

<body link="#315857" vlink="#315857" alink="#315857">

   <div class="formplace"> &nbsp;
    <form class="f2" action="<?php echo site_url('auth_check')?>" method="post">

    <h6>Вход</h6>
    <input name="email" class="pass1" type="text" placeholder="E-mail" required />
    <div class="error_form"> <?php if ($error) {echo 'Неправильный E-mail или пароль';} ?> </div>
    <input name="password" class="pass1" type="password" placeholder="Пароль" required />
    <div class="error_form"></div>
    <input class="btn"  type="submit" value="Вход" />
    <a href="reset" style="color: #315857"><h3>Забыли пароль?</h3></a>

    <hr style="background-color : #bebebe;"/>
    <hr style="background-color : #FFF; "/>
     </form>
    </div>

</body>
</html>