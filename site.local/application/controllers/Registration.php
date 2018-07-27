<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Registration extends CI_Controller {
    
    function register()
    {   
        $data = array( 
                        'nickname' => $this->input->post('login'), 
                        'email' => $this->input->post('email') 
                     );
        $this->load->library('form_validation');
        $this->load->view('cap_page');
        $this->load->view('registration_page', $data);
        $this->load->view('basement_page');
    }
    
    function reg()
    {
        $this->load->model('registration_model');
        $flag = $this->registration_model->validation();
        
        $password = $this->input->post('password');
        $hash = password_hash($password, PASSWORD_DEFAULT);
        
        $data = array(
                        'nickname' => $this->input->post('login'), 
                        'email' => $this->input->post('email'), 
                        'password' => $hash
                    ); 
        
        if($flag == false)
        {
            $this->register();
        }
        else
        {    
            if ($this->registration_model->send_email())
            {
                $this->registration_model->add_user($data);
                redirect('authorization');
            }
            else
            {
                echo 'Извините, произошёл сбой при регистрации. Попробуйте позднее, когда админ все уладит';
                return;
            }
            
   
            redirect('authorization');
        }
        return;
    }
    
    function verify($key)
    {
        $query = $this->db->query("SELECT is_verified FROM `users` WHERE `ver_key`='$key'"); 
        $row = $query->row();
        $conf = array(
                                'is_verified'=>$row->is_verified
                            );
        if ($conf['is_verified'])
        {
            echo 'Ваш аккаунт уже подтвержден.<br>Перейти на <a href="'.base_url().'main">сайт</a>';
            return;
        }
        
        $this->load->model('registration_model');
        if ($this->registration_model->is_verified($key))
        {
            echo 'Вы успешно активировали свой аккаунт!<br>Теперь вы можете совершать покупки и делать заказы на нашем сайте.';
            echo 'Через 10 секунд вы будете перенаправлены на 3ds-print.ru автоматически.<br>Если не хотите ждать, перейдите по <a href="'.base_url().'main">этой ссылке</a>';
        }
        else
        {
            echo 'Ошибка подтверждения аккаунта: неверный код подтверждения.';
        }
    }
    
}
