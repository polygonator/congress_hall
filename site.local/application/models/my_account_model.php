<?php    
defined('BASEPATH') OR exit('No direct script access allowed');
class My_account_model extends CI_Model{
    
    function show_data()
    {   
        $email = $this->session->userdata('email');
        $query = $this->db->query("SELECT nickname, name, surname, email, adress, zip_code FROM `users` WHERE `email`='$email'"); 
        $row = $query->row();
        $data_output = array(
                                'login'=>$row->nickname,
                                'username'=>$row->name,
                                'surname'=>$row->surname,
                                'email'=>$row->email,
                                'adress'=>$row->adress,
                                'zip_code'=>$row->zip_code
                            );
        return $data_output;
    }
    
    function validation($data_input)
    {   
        $this->load->library('form_validation');
        
        $email = $this->session->userdata('email');
        $query = $this->db->query("SELECT nickname, name, surname, email, adress, zip_code FROM `users` WHERE `email`='$email'"); 
        $row = $query->row();
        
        if ($row->nickname == $data_input['login'])
        {
            $this->form_validation->set_rules('nickname', 'Логин', 'trim|min_length[3]|max_length[12]',
                                         array(
                                                'min_length'=>'Минимальная длина логина 3 символа',
                                                'max_length'=>'Максимальная длина логина 12 символов'
                                                )
                                         );
        }
        else
        {
            $this->form_validation->set_rules('nickname', 'Логин', 'trim|min_length[3]|max_length[12]|is_unique[users.nickname]',
                                         array(
                                                'min_length'=>'Минимальная длина логина 3 символа',
                                                'max_length'=>'Максимальная длина логина 12 символов',
                                                'is_unique'=>'Этот логин занят, выберите другой'
                                                )
                                         );
        }
        
        if ($row->email == $data_input['email'])
        {
            $this->form_validation->set_rules('email', 'Email', 'trim|valid_email',
                                            array(
                                                'valid_email'=>'Введите правильный адрес почты',
                                                'is_unique'=>'Этот адрес уже зарегистрирован в системе'
                                                 )
                                         );

        }
        else
        {
            $this->form_validation->set_rules('email', 'Email', 'trim|valid_email|is_unique[users.email]',
                                            array(
                                                'valid_email'=>'Введите правильный адрес почты',
                                                'is_unique'=>'Этот адрес уже зарегистрирован в системе'
                                                 )
                                         );
        }
        
        if ($this->input->post('pass1') != NULL)
        {
                $this->form_validation->set_rules('pass1', 'Пароль', 'trim|min_length[8]',
                                                    array(
                                                            'min_length'=>'Минимальная длина пароля 8 символов'
                                                        )
                                                 );
                $this->form_validation->set_rules('repeat1', 'Password Confirmation', 'trim|matches[pass1]',
                                                    array(
                                                            'matches'=>'Введенные пароли не совпадают',
                                                            )
                                                  );
        }
        
        return $this->form_validation->run();
    }
    
    
    function put_data($data_input)
    {    
        $email = $this->session->userdata('email');
        
            $this->db->set('nickname', $data_input['login']);
            $this->db->set('name', $data_input['username']);
            $this->db->set('surname', $data_input['surname']);
            $this->db->set('adress', $data_input['adress']);
            $this->db->set('zip_code', $data_input['zip_code']);
            $this->db->where('email', $email);
            
            $this->db->update('users');
        
            $flag = false;
        
        if ($this->input->post('pass1') != NULL)
        {
            $password = $this->input->post('pass1');
            $hash = password_hash($password, PASSWORD_DEFAULT);
            
            $this->db->set('password', $hash);
            $this->db->where('email', $email);
            
            $this->db->update('users'); 
            
            $flag = true;
        }
        
        if ($email != $data_input['email'])
        {

            $this->db->set('email', $data_input['email']);
            $this->db->where('email', $email);
            
            $this->db->update('users');
            
            $flag = true;
        } 
        
        return $flag;
    }   
    
    function is_pass_or_email_changed()
    {
        $data_output = $this->show_data();
        if (($data_output['email'] != $this->input->post('email')) || ($this->input->post('pass1')!= NULL))
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }

    function pe_check()
    {
        $this->load->library('form_validation');
        $email = $this->session->userdata('email');
        $pass = $this->input->post('pass_ver');
        $sql = $this->db->query("SELECT password FROM `users` WHERE `email`='$email'"); 
        $row = $sql->row();
        $hash = $row->password;
        
        return password_verify($pass, $hash);
    }
}
?>
