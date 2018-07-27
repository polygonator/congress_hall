<html>
<head>
    <title>Отзывы</title>
    <meta charset="utf-8">
    	<link rel="stylesheet" href="<?php echo site_url('Style.css') ?>" media="screen" type="text/css" />
</head>
<body link="#eafffe" vlink="#eafffe" alink="#eafffe">

    <div class="formplace">
        <br><br>
     <form action="<?php echo site_url('leave_rev_check') ?>" method="post" enctype="multipart/form-data">
     <textarea maxlength="300" align="center" placeholder="Напишите здесь свой отзыв" name="text"></textarea>
        <br>
            <table align="center" border="0" cellpadding="6">
                <tr>
                    <th>
                        <div class="file-upload">
                        <label>
                                <input type="file" name="userfile" accept="image/jpeg,image/png"/>
                                <span>Выберите файл</span>
                        </label>
                        </div>
                    </th>
                    <th><input class="buttStyle3" type="submit" name="leave" value="Отправить отзыв"/></th>
                </tr>  
            </table>
        </form>
        <?php if ($error) {echo '<p class="error_text" align="center">Не удалось отправить отзыв</p>';} ?>
    </div>

</body>
</html>