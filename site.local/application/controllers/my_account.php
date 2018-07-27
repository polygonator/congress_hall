<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class My_account extends CI_Controller {
    
    function my_acc()
    {  
        $this->load->view('cap_page');
        $this->load->library('form_validation');
        $this->load->model('my_account_model');
        $data_output = $this->my_account_model->show_data();
        $this->load->view('my_account_page', $data_output);
        $this->load->view('basement_page');
    }
    
    function update()
    {    
        $this->load->library('form_validation');
        $this->load->model('my_account_model');
                
                    $data_input = array(
                                            'login'=>$this->input->post('nickname'),
                                            'username'=>$this->input->post('name'),
                                            'surname'=>$this->input->post('surname'),
                                            'email'=>$this->input->post('email'),
                                            'adress'=>$this->input->post('adress'),
                                            'zip_code'=>$this->input->post('zip_code'),
                                            'password'=>$this->input->post('pass1'),
                                            'repeat1'=>$this->input->post('repeat1'),
                                            'error'=>FALSE
                                        );
        
                 $session_data_update = array(
                                                'email'=> $this->input->post('email'),
                                                'nickname'=>$this->input->post('nickname'),
                                                'is_logged_in' => 1
                                            );
            
        if ($this->my_account_model->is_pass_or_email_changed())
        {
            $this->load->view('cap_page');
            $this->load->view('pass_check_page', $data_input);
            $this->load->view('basement_page');
        }
        else
        {
            $this->apply(FALSE);
        }
    }
    
    function apply($key)
    {       
        $this->load->model('my_account_model');
        $this->load->library('form_validation');
                        $data_input = array(
                                                'login'=>$this->input->post('nickname'),
                                                'username'=>$this->input->post('name'),
                                                'surname'=>$this->input->post('surname'),
                                                'email'=>$this->input->post('email'),
                                                'adress'=>$this->input->post('adress'),
                                                'zip_code'=>$this->input->post('zip_code'),
                                                'password'=>$this->input->post('pass1'),
                                                'repeat1'=>$this->input->post('repeat1'),
                                                'error'=>TRUE
                                            );
        if($key)
        {
            if (($this->my_account_model->pe_check()) != TRUE)
            {
                $this->load->view('cap_page');
                $this->load->view('pass_check_page', $data_input);
                $this->load->view('basement_page');
                return;
            }
        }

        if ($this->my_account_model->validation($data_input))
        {
            $session_data_update = array(
                                            'email'=> $this->input->post('email'),
                                            'nickname'=>$this->input->post('nickname'),
                                            'is_logged_in' => 1
                                        );
            $flag = $this->my_account_model->put_data($data_input);
            $this ->session->set_userdata($session_data_update);
            
            if ($flag)
            {
                redirect('authorization/logout');
            }
            else
            {
                redirect('my_account');   
            }
        }
        else
        {
            $this->load->view('cap_page');
            $this->load->view('my_account_page', $data_input);
            $this->load->view('basement_page');
        }
    }
    
    function repass()
    {
        $this->apply('TRUE');
    }
}