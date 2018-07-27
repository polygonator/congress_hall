<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Регистрация</title>
	<link  href="<?php echo site_url('Style.css') ?>" media="screen" type="text/css" />
</head>

<body link="#eafffe" vlink="#eafffe" alink="#eafffe">
  
   <div class="formplace"> &nbsp;
       <form class="f1" action="<?php echo site_url('reg')?>" method="post">

        <h6>Регистрация</h6>
        <input name="login" class="user" type="text" placeholder="Логин" value="<?php echo $nickname; ?>"  required/>
        <div class="error_form"> <?php echo form_error('login'); ?> </div>
    
        <input name="email" class="email" type="text" placeholder="E-mail" value="<?php echo $email; ?>" required/>
        <div class="error_form"> <?php echo form_error('email'); ?> </div>

        <input name="password" class="pass" type="password" placeholder="Пароль" required />
        <div class="error_form"> <?php echo form_error('password'); ?> </div>
    
        <input name="repeat" class="repeat" type="password" placeholder="Повторите пароль" required />
        <div class="error_form"> <?php echo form_error('repeat'); ?> </div>
    
        <input class="btn" type="submit" value="Зарегистрироваться" />
    
        <hr style="background-color : #bebebe;"/>
           <hr style="background-color : #FFF; "/>
       </form>
    </div>

</body>
</html>