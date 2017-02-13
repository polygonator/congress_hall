<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Show hello</title>
    </head>
<body>

    <?php foreach($articles as $item)
    echo $item['title'];
    echo $item['subject'];
    echo $item['text_length'];
    echo $item['date'];
    echo $item['id'];
    endforeach
    ?>

</body>
</html>