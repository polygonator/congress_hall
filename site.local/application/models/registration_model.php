<?php    
defined('BASEPATH') OR exit('No direct script access allowed');
class Registration_model extends CI_MODEL{
    
    function put_data()
    {
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');
        
        $this->form_validation->set_rules('login', 'Nickname', 'trim|required|min_length[3]|max_length[12]|is_unique[users.nickname]');
        $this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email|is_unique[users.email]');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|min_length[8]');
        $this->form_validation->set_rules('repeat', 'Password Confirmation', 'trim|required|matches[password]');

            
        if ($this->form_validation->run() == false)
        {
            $this->load->view('registration_page');
            echo "Shit!";
        }
        else
        {
            $data = array('nickname'=>$_POST['login'], 'email'=>$_POST['email'], 'password'=>$_POST['password']);
            $this->db->insert('users', $data); 
            $this->load->view('formsuccess');
        }

            
    }
}       
?>