<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Authorization extends CI_Controller {
    
    function authorize()
    {  
        $error = array('error' => false);
        $this->load->view('cap_page');
        $this->load->view('authorization_page', $error);
        $this->load->view('basement_page');
       
    }
    
    public function processing()
    {
        $this->load->library('form_validation');
        $this->load->database('shop');
        $this->load->model('authorization_model');
        $is_valid = $this->authorization_model->validation();
        
        if ($is_valid)
        {   
            $email = $this->input->post('email');
            $query = $this->db->query("SELECT * FROM `users` WHERE `email`='$email'"); 
            $row = $query->row();
            $data = array(
                            'email'=> $this->input->post('email'),
                            'nickname'=>$row->nickname,
                            'id'=>$row->id,
                            'is_logged_in' => 1
                            );
            $this ->session->set_userdata($data);
            redirect('main');
        }
        else
        {
            $error = array('error' => true);
            $this->load->view('cap_page');
            $this->load->view('authorization_page', $error);
            $this->load->view('basement_page');
        }
        
    }
    
    public function logout()
    {
        $this->load->model('authorization_model');
        $this->authorization_model->out();
        redirect('main');
    }
}
