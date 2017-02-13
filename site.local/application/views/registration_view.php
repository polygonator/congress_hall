<?php
public function reg()
{
    echo 'Your datas: <br>';
    echo 'Login: ' . $_POST['login'];
    echo 'E-mail: ' . $_POST['email'];
    echo 'Password: ' . $_POST['password'];
    
    $this->load->database();
    $data = array('nickname'=>$_POST['login'], 'email'=>$_POST['email'], 'password'=>$_POST['password']);
    $this->db->insert('users', $data);
}

?>