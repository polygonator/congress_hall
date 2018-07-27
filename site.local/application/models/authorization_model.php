<?php    
defined('BASEPATH') OR exit('No direct script access allowed');
class Authorization_model extends CI_Model{
    
    public function validation()
    {   
        $this->form_validation->set_rules('email', 'E-mail', 'trim');
        $this->form_validation->set_rules('password', 'Пароль', 'trim');
        
        return ($this->form_validation->run() * $this->validate_credentials());      
    }
    
    public function validate_credentials()
    {
        if ($this->can_log_in() == true)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    public function can_log_in()
    {
     
        $this->db->where('email',($this->input->post('email')));
        
        $query = $this->db->get('users');
        
        if(($query->num_rows() == 1) && ($this->is_pass_true())) 
        {
            return true;
        }

        else
        {
            return false;
        }
    }
    
    public function is_pass_true()
    {
        $email = $this->input->post('email');
        $pass = $this->input->post('password');
        $sql = $this->db->query("SELECT password FROM `users` WHERE `email`='$email'"); 
        $row = $sql->row();
        $hash = $row->password;
        
        return password_verify($pass, $hash);
    }
    
    public function out()
    {
        $this->session->sess_destroy();
        redirect('authorization');
    }

}       
?>