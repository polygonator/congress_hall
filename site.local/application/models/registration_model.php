<?php    
defined('BASEPATH') OR exit('No direct script access allowed');
class Registration_model extends CI_Model{
    
    function validation()
    {
        $this->load->library('form_validation');
        
        $this->form_validation->set_rules('login', 'Логин', 'trim|min_length[3]|max_length[12]|is_unique[users.nickname]',
                                         array(
                                                'min_length'=>'Минимальная длина логина 3 символа',
                                                'max_length'=>'Максимальная длина логина 12 символов',
                                                'is_unique'=>'Этот логин занят, выберите другой'
                                                )
                                         );
        $this->form_validation->set_rules('email', 'Email', 'trim|valid_email|is_unique[users.email]',
                                            array(
                                                'valid_email'=>'Введите правильный адрес почты',
                                                'is_unique'=>'Этот адрес уже зарегистрирован в системе'
                                                 )
                                         );
        $this->form_validation->set_rules('password', 'Пароль', 'trim|min_length[8]',
                                            array(
                                                'min_length'=>'Минимальная длина пароля 8 символов'
                                                 )
                                         );
        $this->form_validation->set_rules('repeat', 'Password Confirmation', 'trim|matches[password]',
                                            array(
                                                'matches'=>'Введенные пароли не совпадают',
                                                 )
                                         );
        
        return $this->form_validation->run();
             
    }
    
    function add_user($data)
    {
        $this->db->insert('users', $data);
    }
    
    function send_email()
    {
        $this->load->library('form_validation');
        
        require('PHPMailer/PHPMailerAutoload.php');
        
        $mail = new PHPMailer; 
        
        $mail->isSMTP();
        
        $mail->Host = 'smtp.yandex.ru';
        $mail->SMTPAuth = TRUE;
        $mail->Username = 'mralexwrj';
        $mail->Password = '89604610158qaz';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = '465';
        $mail->CharSet = 'UTF-8';
        
        $mail->From = 'mralexwrj@yandex.ru';
        $mail->FromName = 'Alexander';
        $mail->AddAddress($this->input->post('email'), $this->input->post('login'));
        $mail->isHTML(TRUE);
        
        $key = md5(uniqid());
        
        $mail->Subject = 'Регистрация на сайте 3ds-print.ru';
        
        $message = "<p>Благодарима Вас за регистрацию на 3ds-print.ru!</p>";
        $message .="<p>Перейдите по <a href='".base_url()."registration/verify/$key'>этой ссылке</a>, чтобы подтвердить Ваш аккаунт на сайте.</p>";
        $mail->Body = $message;
               
        $email = $this->input->post('email');
        $this->db->set('ver_key', $key);
        $this->db->where('email', $email);
        
        return $mail->send();
    }
    
    function is_verified($key)
    {   
        $this->db->where('ver_key', $key);
        
        $query = $this->db->get('users');
        
        if($query->num_rows() == 1) 
        {
            $this->db->query('UPDATE `users` SET `is_verified` = 1 WHERE `ver_key` = \''.$key.'\'');
            return TRUE;
        }

        else
        {
            return FALSE;
        }
        
    }
}       
?>