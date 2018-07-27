<html>
<head>
    <title>Домашняя страница</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="<?php echo site_url('Style.css') ?>" media="screen" type="text/css" />
</head>
<body link="#eafffe" vlink="#eafffe" alink="#eafffe">
    
    <div class="formplace">


        
        <div class="slideShow-container">
            <div class="mySlides fade">
                <div class="numberText">&nbsp;</div>
                <img src="<?php echo site_url('img/slider/pic1.png')?>">
                <div class="Text" align="center">Воплощайте свои идеи в жизнь</div>
            </div>
            <div class="mySlides fade">
                <div class="numberText">&nbsp;</div>
                <img src="<?php echo site_url('img/slider/sl2.png')?>">
                <div class="Text" align="center">Следующее измерение печати</div>
            </div>
            <div class="mySlides fade">
                <div class="numberText">&nbsp;</div>
                <img src="<?php echo site_url('img/slider/sl3.png')?>">
                <div class="Text" align="center">Придайте форму материи</div>
            </div>
            <a class="prev" onclick="plusSlides(-1)" align="center">&#10094</a>
            <a class="next" onclick="plusSlides(1)" align="center">&#10095</a>
        </div>
        
        <br>
        
        <div style="text-align: center;">
            <span class="dot" onclick="currentSlide(1)"></span>
            <span class="dot" onclick="currentSlide(2)"></span>
            <span class="dot" onclick="currentSlide(3)"></span> 
        </div>
        
        <br>
        
        <form  action="<?php echo site_url('product_demo')?>" method="get">  
        <table border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
            <th height="320" width="80"></th>
            <th valign="top"><img src="img/pic2.png"><button name="ident" value="<?php echo 2;?>" class="buttStyle1" type="submit">Подробнее</button></th>
            <th width="80"></th>
            <th valign="top"><img src="img/pic3.png"><button name="ident" value="<?php echo 3;?>" class="buttStyle1" type="submit">Подробнее</button></th>
            <th width="80"></th>
        </tr>
        <tr>
            <th height="320" width="80"></th>
            <th valign="top"><img src="img/pic4.png"><button name="ident" value="<?php echo 1;?>" class="buttStyle1" type="submit">Подробнее</button></th>
            <th width="80"></th>
            <th valign="top"><a href="main"><img src="img/pic5.png"><button class="buttStyle1" type="submit">Подробнее</button></a></th>
            <th width="80"></th>
        </tr>
        <tr>
            <th height="320" width="80"></th>
            <th valign="top"><a href="main"><img src="img/pic6.png"><button class="buttStyle1" type="submit">Подробнее</button></a></th>
            <th width="80"></th>
            <th valign="top"><a href="main"><img src="img/pic7.png"><button class="buttStyle1" type="submit">Подробнее</button></a></th>
            <th width="80" ></th>
        </tr>
    </table>
    </form>
    </div>
    
    <script src="<?php echo site_url('slider.js') ?>"></script>
</body>
</html>

